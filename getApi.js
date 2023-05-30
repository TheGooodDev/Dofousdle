function items(skip){
    const params = {
        'typeId[$ne]': 203,
        '$sort': '-slug.fr',
        '$skip':skip,
        '$limit':50,
        'slug.fr[$search]': '',
        'typeId[$in][]': [1, 9, 2, 3, 4, 5, 6, 7, 8, 19, 21, 22, 271, 114, 11, 82, 17, 10, 16, 23, 151, 217, 18, 121],
        '$select[]': [
          'id', 'name.fr', 'description.fr', 'effects', 'iconId', 'itemSetId', 'level',
          'slug.fr', 'typeId'
        ],
        'lang': 'fr'
      };
    const urlWithParams = new URL(url+"items");
        Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
            params[key].forEach(value => urlWithParams.searchParams.append(key, value));
        } else {
            urlWithParams.searchParams.set(key, params[key]);
        }
        });
    fetch(urlWithParams)
    .then(response => response.json())
    .then(async data => {
      // Traiter les données de la réponse
      await data.data.forEach(async val=>{
          let div = document.createElement("div")
          let img = document.createElement("img")
          let text = document.createElement("div")
          text.innerText = val.slug.fr
          img.src = val.img
          tab.push(val)
          div.appendChild(img)
          div.appendChild(text)
          document.body.appendChild(div)
          await val.effects.forEach(async (v,i) =>{
             let res = await carac(v.characteristic)
             val.effects[i].characteristic = res.name
             val.effects[i]["img"] = `https://dofusdb.fr/icons/characteristics/${res.img}.png`
          })
      })

      if (data.data.length !== 0){
        items(skip+50)
      }else{
        console.log(JSON.stringify(tab))
      }

    })
    .catch(error => {
      // Gérer les erreurs
      console.error(error);
    });
}

async function carac(id){
    const params = {
        '$select[]': [
          'name.fr','asset'
        ],
        'lang': 'fr'
      };
    const urlWithParams = new URL(url+"//"+id);
        Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
            params[key].forEach(value => urlWithParams.searchParams.append(key, value));
        } else {
            urlWithParams.searchParams.set(key, params[key]);
        }
        });
    let res = await fetch(urlWithParams)
    .then(response => response.json())
    .then(data => {
      // Traiter les données de la réponse
      return {
        name : data.name.fr,
        img : data.asset
        }
    })
    .catch(error => {
      // Gérer les erreurs
      console.error(error);
    });
    return res
}