import { useState } from 'react'
import './styles/index.css'
import { Item } from './models/Item';
import SearchItemComponent from './components/SearchItemComponent';
import { CapitalizeAll } from './utils/capitalize';
import TryComponent from './components/tryComponent';
import Popup from 'reactjs-popup';

export let Data: any
export let SearchItem: Item

fetch("./src/data/items.json")
  .then(response => response.json())
  .then(data => {
    Data = data
    SearchItem = new Item(data[Math.floor(Math.random() * data.length)], "fr")
  })
  .catch(error => {
    console.error(error);
  });

function App() {

  const [searchText, setSearchText] = useState("")
  const [emptyItem, setItem] = useState(new Item(null, "fr"))
  const [allTry, setTry] = useState(new Array<Item>())
  const [autocomplete, setAutocomplet] = useState(new Array())
  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
  }
  return (
    <>
      <div className="App">
        <div className='itemContainer'>
          <SearchItemComponent  {...emptyItem} />
        </div>
        <div className='SearchZone'>
          <h1 className='Titre'>DofousDle</h1>
          <div>
            <button className="hint" onClick={() => {
              emptyItem.description = SearchItem.description
              setItem({ ...emptyItem })
            }}>Indice</button>
            <Popup trigger={<button className="hint"> Regle </button>} modal nested  >                 <p>
              Bienvenue dans DofousDle. <br />
              Votre but est de trouver l'item en proposant d'autre item.
              <br />
              <br />
              Ceci est une version de test, il est possible que vous rencontriez des bugs. Genre Version 0.0.2.
              <br />
              Pour tout retour ou bug, veuillez me contacter par discord : The Good Guy#1716
              <br />
              <br />
              Credit :
              <br />
              Merci a DofusDB pour l'api : <a href="https://dofusdb.fr/fr/">https://dofusdb.fr/fr/</a> <br />
              <br />
              les images utilisées dans DofousDle appartiennent à Dofus. <br /> Tous les droits d'auteur et de propriété
              intellectuelle
              des images appartiennent à Ankama.
            </p> </Popup>
          </div>
          <div className="eventZone" >

            <div className="searchbarContainer">
              <input className="searchbar" type="text" placeholder="Search" onChange={handleSearch} value={searchText} onFocus={(e) => {
                if (e.currentTarget.value == "") {
                  return
                }
                let tab = new Array()
                Data.forEach((element: any) => {
                  let count = 0
                  e.currentTarget.value.toUpperCase().split(" ").forEach((word: string) => {
                    if (element.slug.fr.toUpperCase().includes(word.toUpperCase())) {
                      count++
                    }
                  })
                  if (count == e.currentTarget.value.toUpperCase().split(" ").length) {
                    tab.push(element)
                  }
                })
                setAutocomplet(tab)
              }} onInput={(e) => {
                if (e.currentTarget.value.length > 1) {
                  let tab = new Array()
                  Data.forEach((element: any) => {
                    let count = 0
                    e.currentTarget.value.toUpperCase().split(" ").forEach((word: string) => {
                      if (element.slug.fr.toUpperCase().includes(word.toUpperCase())) {
                        count++
                      }
                    })
                    if (count == e.currentTarget.value.toUpperCase().split(" ").length) {
                      tab.push(element)
                    }
                  })
                  setAutocomplet(tab)
                } else {
                  setAutocomplet(new Array())
                }

              }} />
              <img className="searchbarImg" src="https://upload.wikimedia.org/wikipedia/fr/a/a3/Dofus_emeraude.png" alt="" onClick={() => {
                let item = search(searchText)

                if (item) {
                  for (let i = 0; i < allTry.length; i++) {
                    if (allTry[i].name == item.name) {
                      return
                    }
                  }

                  if (item.name == SearchItem.name) {
                    emptyItem.name = item.name
                    emptyItem.img = item.img
                    alert("GG")
                  }

                  if (item.level == SearchItem.level) {
                    emptyItem.level = item.level
                  }
                  if (item.type == SearchItem.type) {
                    emptyItem.type = item.type
                  }
                  if (item.set == SearchItem.set) {
                    emptyItem.set = item.set
                  }
                  item.elements.forEach((element: any) => {
                    SearchItem.elements.forEach((element2: any) => {
                      if (element2.name == element.name && emptyItem.elements.includes(element2) == false) {
                        emptyItem.elements.push(element2)
                      }
                    })
                  })


                  setItem({ ...emptyItem })
                  setTry([...allTry, item])
                }
              }
              } />
            </div>
            <div className="suggestionContainer">
              {autocomplete.map((element: any, index: number) => {
                return <div key={index} className="suggestion" onClick={() => {
                  setSearchText(element.slug.fr)
                  setAutocomplet(new Array())
                }}>
                  <img src={element.img} alt="" />
                  <div className="autoInfo">
                    <div>
                      {CapitalizeAll(element.slug.fr)}</div>
                    <div className="autoLevel">{element.level}</div>
                  </div>
                </div>
              })}

            </div>
            <div className="tryContainer">
              {allTry.reverse().map((element: any, index: number) => {
                return <TryComponent key={index} {...element} />
              })}
            </div>
          </div>
        </div>

      </div >
    </>
  )
}

function search(name: string) {
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].slug.fr == name) {
      return new Item(Data[i], "fr")
    }
  }
}

{/* <button onClick={() => {
  emptyItem.name = "test"
  setItem({ ...emptyItem })
}}>test</button> */}

export default App