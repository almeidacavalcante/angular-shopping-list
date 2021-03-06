import { Item } from "../../models/Item";
import { Price } from "../../models/Price";

export class ItemConverter {
    static setupItem(json: {}): Item {
        let item = new Item(json['_name'], json['_unit']);
        item.isPurchased = json['_isPurchased'];
        item.isPersisted = json['_isPersisted'];
        item.id = json['_id'];
        item.prices = this.extractPrices(json['_prices']);
        return item;
      }
      
      //TODO: permitir inserir uma data completa por fora.
    static extractPrices(json: object[]): Price[]{
        let prices = new Array<Price>();
        json.forEach((price) => {
          prices.push(new Price(price['_value'], price['_date'], price['_marketId']))
        })
        return prices;
      }
}