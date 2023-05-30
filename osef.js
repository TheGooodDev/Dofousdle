let max = 0
let best

let tab

fetch("./items.json")
.then(response => response.json())
.then(data => {
  // Traiter les données de la réponse
  data.forEach(element => {
    let count = 0
    for (let i = 0; i < element.effects.length;i++){
      if(element.effects[i].characteristic == "Points de vie"){
        count++
      }
    }
    if (count == element.effects.length){
          console.log(element.slug.fr)
        }
    });
})
.catch(error => {
  // Gérer les erreurs
  console.error(error);
});

