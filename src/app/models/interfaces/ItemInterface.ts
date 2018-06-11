import { Price } from "../Price";

export interface ItemInterface {
    id?:string;
    isPurchased?:boolean;
    name?:string;
    prices?:Array<Price>;
    unit?: string;
  }