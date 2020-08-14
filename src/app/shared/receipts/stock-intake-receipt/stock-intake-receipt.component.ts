import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/core/models/stock';

@Component({
  selector: 'app-stock-intake-receipt',
  templateUrl: './stock-intake-receipt.component.html',
  styleUrls: ['./stock-intake-receipt.component.css']
})
export class StockIntakeReceiptComponent implements OnInit {

  @Input() stock: Stock;

  constructor() { }

  ngOnInit() {
  }

}
