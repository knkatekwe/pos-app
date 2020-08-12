import {Items} from './items';
import {Adjustment} from './adjustment';
import {AdjustmentDetail} from './adjustment-detail';

export class PlaceAdjustment {

  itemsDTO: Items;
  adjustmentDTO: Adjustment;
  adjustmentDetailDTOS: Array<AdjustmentDetail>;

}
