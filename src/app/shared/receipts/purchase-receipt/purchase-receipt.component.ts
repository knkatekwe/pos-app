import { Component, OnInit, Input } from '@angular/core';
import { Orders } from 'src/app/core/models/orders';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.css']
})
export class PurchaseReceiptComponent implements OnInit {

  @Input() order: Orders;

  constructor() { }

  ngOnInit() {
  }

}
