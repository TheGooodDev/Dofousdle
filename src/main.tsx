import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { Item } from './models/Item.tsx'
import json from './data/items.json'

export let Data: any
export let SearchItem: Item
  Data = json
  SearchItem = new Item(json[Math.floor(Math.random() * json.length)], "fr")

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)