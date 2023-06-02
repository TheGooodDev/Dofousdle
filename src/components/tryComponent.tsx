
import { SearchItem } from "../main";
import { Item } from "../models/Item";

export default function TryComponent(item: Item) {
    return (
        <div className="try">
            <div className="tryInfo">

                <img className="tryImg" src={item.img} alt="" />
                <div className={(item.level == SearchItem.level) ? "tryLevel bggreen" : "tryLevel bgred"}>
                    {item.level}<span className="arrow">{(item.level > SearchItem.level ? "↓" : (item.level < SearchItem.level ? "↑" : ""))}</span>
                </div>
                <div className={(item.type == SearchItem.type) ? "tryLevel bggreen" : "tryLevel bgred"}>
                    {item.type}
                </div>
            </div>
            <div className="tryElement">
                {item.elements.map((element) => {
                    if (element.name != "Points de vie" && element.name) {
                        return <div> <img src={element.img} alt="" /></div>
                    }
                })}
            </div>
        </div>
    )
}