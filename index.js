const url = 'https://api.beta.dofusdb.fr/';



let tab = []
let mainContainer = document.querySelector(".containerMain")
let searchInput = document.querySelector("#search")
let searchButton = document.querySelector("#sendSearch")
let sugest = document.querySelector("#sugest")
let searchContainer = document.querySelector("#searchContainer")
let Data

fetch("./items.json")
.then(response => response.json())
.then(data => {
  // Traiter les données de la réponse
  Data = data
  createImage(data[Math.floor(Math.random()*data.length)])
})
.catch(error => {
  // Gérer les erreurs
  console.error(error);
});

// items(0)


function createImage(val){
    let div = document.createElement("div")
    div.classList.toggle("item")
    addText(div, val.slug.fr,"name")
    addImg(div,val.img,"itemImg")
    let caracContainer = document.createElement("div")
    caracContainer.classList.toggle("caracContainer")
    val.effects.forEach(effect=>{

        if (effect.characteristic && effect.img){
            let div2 = document.createElement("div")
            div2.classList.toggle("carac")
            addImg(div2,effect.img,"caracImg")
            addText(div2,effect.characteristic,"caracText")
            caracContainer.appendChild(div2)
        }

    })
    addText(div,val.type.name.fr,"typeText")
    addText(div,val.level,"typeText")
    div.appendChild(caracContainer)
    tab.push(val)

    mainContainer.appendChild(div)
}

function addText(parent,text,classe){
    let div = document.createElement("div")
    div.classList.toggle(classe)
    div.innerText = text
    parent.appendChild(div)
}

function addImg(parent,src,classe){
    let div = document.createElement("img")
    div.src = src
    div.classList.toggle(classe)
    parent.appendChild(div)
}

searchInput.addEventListener("focus",(e)=>{
    console.log("test")
    sugest.hidden = false
})

searchInput.addEventListener("focusout",(e)=>{
    console.log("test2")
    sugest.hidden = true
})
searchInput.addEventListener("input",(e)=>{
    closeList();

    //If the input is empty, exit the function
    if (!searchInput.value || searchInput.value <4)
        return;

    //Create a suggestions <div> and add it to the element containing the input field
    suggestions = document.createElement('div');
    suggestions.setAttribute('id', 'suggestions');
    sugest.appendChild(suggestions);

    //Iterate through all entries in the list and find matches
    for (let i=0; i<Data.length; i++) {
        if (Data[i].slug.fr.toUpperCase().includes(searchInput.value.toUpperCase())) {
            //If a match is foundm create a suggestion <div> and add it to the suggestions <div>
            let div = document.createElement("div")
            div.classList.toggle("suggestionDiv")
            suggestion = document.createElement('div');
            suggestionImg = document.createElement('img');
            suggestionImg.src = Data[i].img
            suggestion.innerHTML = Data[i].slug.fr;
            div.addEventListener('click', function () {
                searchInput.value = this.children[1].innerHTML;
                closeList();
            });
            div.style.cursor = 'pointer';
            div.appendChild(suggestionImg)
            div.appendChild(suggestion)
            suggestions.appendChild(div);
        }
    }
})

function closeList() {
    let suggestions = document.getElementById('suggestions');
    if (suggestions)
        suggestions.parentNode.removeChild(suggestions);
}

searchButton.addEventListener("click",()=>{
    console.log(search(searchInput.value))
    createImage(search(searchInput.value))
})



function search(name){

        for (let i = 0; i< Data.length;i++){
            if (Data[i].slug.fr == name){
                return Data[i]
            }
        }
    
}

