import {Items} from './items';
import {Stock} from './stock';
import {StockDetailPK} from './stock-detail-pk';

export class StockDetail {

  quantity: number;
  unitprice: number;
  retailprice: number;
  purchasePrice: number;
  item: Items;
  stock: Stock;
  stockDetail_PKDto: StockDetailPK;

}
