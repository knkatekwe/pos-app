import {PaymentType} from './payment-type';
import { User } from './user';
import { OrdersDetail } from './orders-detail';

export class Orders {
  oId: number;
  date: Date;
  totalPrice: number;
  paymentType: PaymentType;
  user: User;
  orderDetails: OrdersDetail;

  constructor(totalPrice: number, paymentType: PaymentType) {
    // this.oId = oId;
    // this.date = date;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
  }
}
