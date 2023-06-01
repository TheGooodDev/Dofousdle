export class ItemElement{
    name: string;
    min: number;
    max: number;
    img: string;

    constructor(data: any){
        this.name = data.characteristic;
        this.min = data.from;
        this.max = data.to;
        this.img = data.img;
    }
}