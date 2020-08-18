import { Component, OnInit, Input } from '@angular/core';
import { Orders } from 'src/app/core/models/orders';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.css']
})
export class PurchaseReceiptComponent{

  @Input() order: Orders;

}
