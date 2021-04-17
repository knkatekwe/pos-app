import {PaymentType} from './payment-type';
import { User } from './user';
import { OrdersDetail } from './orders-detail';

export class Orders {
  oId: number;
  date: Date;
  totalPrice: number;
  tenderedAmount: number;
  changeAmount: number;
  paymentType: PaymentType;
  saleType: string;
  user: User;
  orderDetails: OrdersDetail;

  constructor(totalPrice: number, tenderedAmount: number, changeAmount: number, paymentType: PaymentType, saleType: string) {
    this.tenderedAmount = tenderedAmount;
    this.changeAmount = changeAmount;
    this.saleType = saleType
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
  }
}
