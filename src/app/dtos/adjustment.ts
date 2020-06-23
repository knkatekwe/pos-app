import {PaymentType} from './payment-type';

export class Adjustment {
  sId: number;
  date: Date;
  totalPrice: number;
  // paymentType: PaymentType;


  constructor(totalPrice: number) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    // this.paymentType = paymentType;
  }
}
