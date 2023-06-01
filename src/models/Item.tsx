import { ItemElement } from "./ItemElement";

export class Item{
    name: string;
    level: number;
    type: string;
    set: string;
    img: string;
    description: string;
    elements: Array<ItemElement>;

    constructor(data: any,lang: string){
        this.name = data.slug[lang];
        this.level = data.level;
        this.type = data.type.name[lang];
        this.set = data.itemSetId;
        this.img = data.img;
        this.description = data.description[lang];
        data.effects.forEach((element: any) => {
            this.elements.push(new ItemElement(element))
        })
    }
}