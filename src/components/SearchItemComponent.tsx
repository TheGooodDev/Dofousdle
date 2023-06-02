import { Item } from "../models/Item";


export default function SearchItemComponent(item: Item) {
    return (
        <>
            <div className="item">
                <div className="info">
                    <div className="ItemHeader">
                        <div>
                            <div className="name">{item.name}</div>
                            <div className="level">Niveau {item.level}</div>
                        </div>
                        <div className="ItemImgContainer"><img className="ItemImg" src={item.img} alt="" /></div>
                    </div>
                    <div className="effets">
                        <h1 className="effetTitle">
                            Effets
                        </h1>
                        {item.elements.map((element) => {
                            if (element.name != "Points de vie" && element.name) {

                                return <div className={(element.min < 0 ? "element red" : "element green")} ><img src={element.img} alt="" /><p> {element.min}{(element.max != 0 ? ` à ${element.max}` : "")} {element.name}</p></div>
                            }
                        })
                        }

                    </div>
                    <div className="catégorie"><span className="infoText"> Catégorie </span> {item.type}</div>

                    <div className="description">{item.description}</div>
                </div>
            </div>
        </>
    )
}