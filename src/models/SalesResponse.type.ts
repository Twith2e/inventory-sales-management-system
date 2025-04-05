export type SalesResponse = {
  sales: {
    product: {
      _id: string;
      itemName: string;
      itemPrice: string;
    };
    quantity: string;
    salesDate: string;
    totalPrice: string;
    paymentMode: string;
    balance: string;
    amountPaid: string;
    customer: string;
    _id: string;
    __v: string;
  }[];
  success: boolean;
};
