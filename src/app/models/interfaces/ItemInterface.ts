export interface ItemInterface {
    $key?: string;
    id?:string;
    isPurchased?:boolean;
    name?:string;
    prices?: {
      date?: number,
      value?: number
    };
    unit?: string;
  }