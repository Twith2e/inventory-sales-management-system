export type Sales = {
  product: {
    _id: string;
    itemName: string;
    itemPrice: string;
  };
  quantity: string;
  salesDate: string;
  totalPrice: string;
  _id: string;
  __v: string;
};

export type SalesArray = Sales[];
