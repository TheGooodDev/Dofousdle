import { CapitalizeAll } from "../utils/capitalize";
import { ItemElement } from "./ItemElement";

export class Item {
    name: string = "";
    level: string = "";
    type: string = "";
    set: string = "";
    img: string = "";
    description: string = "";
    elements: Array<ItemElement> = new Array<ItemElement>();

    constructor(data: any, lang: string) {
        if (data) {
            this.name = CapitalizeAll(data.slug[lang]);
            this.level = data.level;
            this.type = data.type.name[lang];
            this.set = data.itemSetId;
            this.img = data.img;
            this.description = data.description[lang];
            this.elements = new Array<ItemElement>();
            data.effects.forEach((element: any) => {
                this.elements.push(new ItemElement(element))
            })
        }
    }


}