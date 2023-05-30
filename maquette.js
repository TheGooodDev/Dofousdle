let Data
let index
let trycount = 0
let searchItemImage = document.querySelector(".searchItemImg")
let searchItemName = document.querySelector(".searchItemName")
let searchItemType = document.querySelector(".searchItemType")
let searchItemNiveau = document.querySelector(".searchItemNiveau")
let searchItemElements = document.querySelector(".searchItemElements")
let searchbar = document.querySelector(".searchbar")
let searchbarButton = document.querySelector(".searchbarImg")
let suggestionContainer = document.querySelector(".suggestionContainer")
let tryContainer = document.querySelector(".tryContainer")
let elementFind = []


fetch("./items.json")
.then(response => response.json())
.then(data => {
  // Traiter les données de la réponse
  Data = data
  index = Math.floor(Math.random()*data.length)
  SetupSearchItem(data[index])
})
.catch(error => {
  // Gérer les erreurs
  console.error(error);
});


function SetupSearchItem(items){
    searchItemImage.src = ""
}

function createItemElements(element){
    let div = document.createElement("div")
    let info = document.createElement("div")
    info.innerText = element.characteristic
    let divinfo = document.createElement("div")
    info.classList.toggle("infoElement")
    div.classList.toggle("elementsImgContainer")
    let img = document.createElement("img")
    img.src = element.img
    img.classList.toggle("searchElementImg")
    if(element.from < 0){
        img.classList.toggle("red")
    }else{
        img.classList.toggle("green")
    }
    div.appendChild(img)
    div.appendChild(info)
    searchItemElements.appendChild(div)
}

function search(name){
    for (let i = 0; i< Data.length;i++){
        if (Data[i].slug.fr == name){
            return Data[i]
        }
    }
}

searchbarButton.addEventListener("click",(e)=>{
    let res = search(searchbar.value)
    createTry(res)
})


searchbar.addEventListener("input",(e)=>{
    closeList();

    //If the input is empty, exit the function
    if (!searchbar.value || searchbar.value.length <3)
        return;

    //Create a suggestions <div> and add it to the element containing the input field
    suggestions = document.createElement('div');
    suggestions.setAttribute('id', 'suggestions');
    suggestionContainer.appendChild(suggestions);

    //Iterate through all entries in the list and find matches
    for (let i=0; i<Data.length; i++) {
        if (Data[i].slug.fr.toUpperCase().includes(searchbar.value.toUpperCase())) {
            //If a match is foundm create a suggestion <div> and add it to the suggestions <div>
            let div = document.createElement("div")
            div.classList.toggle("suggestion")
            suggestion = document.createElement('div');
            suggestionImg = document.createElement('img');
            suggestionImg.src = Data[i].img
            suggestion.innerHTML = Data[i].slug.fr;
            div.addEventListener('click', function () {
                searchbar.value = this.children[1].innerHTML;
                closeList();
            });
            div.style.cursor = 'pointer';
            div.appendChild(suggestionImg)
            div.appendChild(suggestion)
            suggestions.appendChild(div);
        }
    }
})
searchbar.addEventListener("focus",(e)=>{
    suggestionContainer.hidden = false
})

window.addEventListener('click', function(e){   
    if (!document.querySelector(".eventZone").contains(e.target)){
        suggestionContainer.hidden = true
    } 
  });

function closeList() {
    let suggestions = document.getElementById('suggestions');
    if (suggestions)
        suggestions.parentNode.removeChild(suggestions);
}


function createTry(item){
    trycount += 1
    let div = document.createElement("div")
    div.classList.toggle("try")
    let imgContain = document.createElement("div")
    let tryItemImg =document.createElement("img")
    tryItemImg.classList.toggle("tryItemImg")
    tryItemImg.src = item.img
    imgContain.appendChild(tryItemImg)
    div.appendChild(imgContain)
    let tryInfoContainer = document.createElement("div")
    tryInfoContainer.classList.toggle("tryInfoContainer")
    let tryNiveau = document.createElement("tryNiveau")
    tryNiveau.innerText = item.level
    tryNiveau.classList.toggle("tryNiveau")
    if (Data[index].level > item.level){
        badTry(tryNiveau, "↑")
    }else if(Data[index].level < item.level){
        badTry(tryNiveau, "↓")
    }else{
        revealLevel()
        tryNiveau.classList.toggle("green")
    }
    tryInfoContainer.appendChild(tryNiveau)
    div.appendChild(tryInfoContainer)

    let tryInfoContainer2 = document.createElement("div")
    tryInfoContainer2.classList.toggle("tryInfoContainer")
    let tryType = document.createElement("tryType")
    tryType.innerText = item.type.name.fr
    tryType.classList.toggle("tryType")
    tryInfoContainer2.appendChild(tryType)
    if (Data[index].type.name.fr ==  item.type.name.fr){
        revealType()
        tryType.classList.toggle("green")
    }else{
        badTry(tryType)
    }
    div.appendChild(tryInfoContainer2)

    let tryElementcontainer = document.createElement("div")
    tryElementcontainer.classList.toggle("tryElementContainer")
    item.effects.forEach(effect=>{
        if (effect.characteristic != "Points de vie" && effect.characteristic){
            let img = document.createElement("img")
            img.classList.toggle("tryElementImg")
            img.src = effect.img
            img.alt = effect.characteristic
            let alt = document.createElement("div")
            alt.innerText = effect.characteristic
            img.classList.toggle("red")
            Data[index].effects.forEach(elem=>{
                if (elem.characteristic == effect.characteristic){
                    img.classList.toggle("green")
                    if(!elementFind.includes(effect.characteristic)){

                        createItemElements(elem)
                    }
                    elementFind.push(elem.characteristic)

                }
            })
            alt.classList.toggle("alt")
            img.addEventListener("mouseout",()=>{
                alt.hidden = true
            })
            img.addEventListener("mouseover",()=>{
                alt.hidden = false
            })
            img.appendChild(alt)
            tryElementcontainer.appendChild(img)
        }
    })
    div.appendChild(tryElementcontainer)
    tryContainer.insertBefore(div, tryContainer.firstChild)
    if(item.slug.fr == Data[index].slug.fr){
        endGame()
    }
}


function badTry(div, text){
    div.classList.toggle("red")
    if(text){
        let span = document.createElement("span")
        span.classList.toggle("arrow")
        span.innerHTML = text
        div.appendChild(span)
    }
}


function revealLevel(){
    searchItemNiveau.innerHTML = Data[index].level
}

function revealType(){
    searchItemType.innerHTML = Data[index].type.name.fr
}

function endGame(){
    searchItemImage.src = Data[index].img
    searchItemName.innerText = Data[index].slug.fr
    alert(`Vous avez gagné en ${trycount}`)
}