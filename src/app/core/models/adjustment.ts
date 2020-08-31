import {PaymentType} from './payment-type';
import { User } from './user';

export class Adjustment {
  aId: number;
  date: Date;
  totalPrice: number;
  user: User;
  adjustmentDetails: any
  // paymentType: PaymentType;


  constructor(totalPrice: number) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    // this.paymentType = paymentType;
  }
}
