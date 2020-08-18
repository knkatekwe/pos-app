import {PaymentType} from './payment-type';
import { User } from './user';
import { OrdersDetail } from './orders-detail';

export class Orders {
  oId: number;
  date: Date;
  totalPrice: number;
  paymentType: PaymentType;
  saleType: string;
  user: User;
  orderDetails: OrdersDetail;

  constructor(totalPrice: number, paymentType: PaymentType, saleType: string) {
    // this.oId = oId;
    // this.date = date;
    this.saleType = saleType
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
  }
}
