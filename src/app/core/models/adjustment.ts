import {PaymentType} from './payment-type';
import { User } from './user';

export class Adjustment {
  sId: number;
  date: Date;
  totalPrice: number;
  user: User;
  // paymentType: PaymentType;


  constructor(totalPrice: number) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    // this.paymentType = paymentType;
  }
}
