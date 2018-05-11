import { ItemService } from "../services/item/item.service";
import { Item } from "../models/Item";

export class ShoppingController {

    private _service : ItemService;


    constructor(){
        this._service = new ItemService();
    }

    /**
     * insertItem
     */
    public insertItem(item: Item) {
        this._service.insertItem(item);
    }
    
    /**
     * getItems
     */
    public getItems() {
        return this._service.items;

    }


}
