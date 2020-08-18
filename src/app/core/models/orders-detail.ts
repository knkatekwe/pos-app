import {Items} from './items';
import {Orders} from './orders';
import {OrdersDetailPK} from './orders-detail-pk';

export class OrdersDetail {

  quantity: number;
  unitprice: number;
  saleType: string;
  item: Items;
  orders: Orders;
  orderDetail_PKDto: OrdersDetailPK;

}
