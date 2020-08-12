import {Items} from './items';
import {Adjustment} from './adjustment';
import {AdjustmentDetailPK} from './adjustment-detail-pk';

export class AdjustmentDetail {

  quantity: number;
  unitprice: number;
  purchasePrice: number;
  item: Items;
  adjustment: Adjustment;
  adjustmentDetail_PKDto: AdjustmentDetailPK;

}
