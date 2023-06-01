import { useState} from 'react'
import './styles/style.css'
import { Item } from './models/Item';

let Data: any
let SearchItem: Item

fetch("./data/items.json")
.then(response => response.json())
.then(data => {
  // Traiter les données de la réponse
  Data = data
  SearchItem = new Item(data[Math.floor(Math.random()*data.length)],"fr")
  console.log(SearchItem)
})
.catch(error => {
  // Gérer les erreurs
  console.error(error);
});

function App() {



  const [count, setCount] = useState(0)

  return (
    <>
    <div className="blur"></div>
    </>
  )
}

export default App
