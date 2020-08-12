import {PaymentType} from './payment-type';

export class Orders {
  oId: number;
  date: Date;
  totalPrice: number;
  paymentType: PaymentType;


  constructor(totalPrice: number, paymentType: PaymentType) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
  }
}
