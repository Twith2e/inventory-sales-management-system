export type ProductsResponse = {
  products: {
    _id: string;
    itemCode: string;
    itemName: string;
    itemDescription: string;
    itemPrice: string;
    itemQty: string;
    itemCategory: string;
    __v: number;
  }[];
  success: boolean;
};
