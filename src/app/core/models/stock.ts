import {PaymentType} from './payment-type';
import { User } from './user';
import { StockDetail } from './stock-detail';

export class Stock {
  sId: number;
  date: Date;
  totalPrice: number;
  user: User;
  stockDetails: StockDetail;
  // paymentType: PaymentType;


  constructor(totalPrice: number) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    // this.paymentType = paymentType;
  }
}
