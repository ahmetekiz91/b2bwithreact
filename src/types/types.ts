interface IImage {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: object;
  }
  
  interface Ifields {
    company: string;
    colors: string[];
    featured: boolean;
    price: number;
    name: string;
    description?: string;
    image: IImage[];
  }
  
  export interface IFurnitureItem {
    id: string;
    fields: Ifields;
  }
  
  export interface ICartFurniture {
    productInfo: IFurnitureItem;
    quantity?: number;
  }