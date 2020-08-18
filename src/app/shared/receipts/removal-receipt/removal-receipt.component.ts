import { Component, OnInit, Input } from '@angular/core';
import { Adjustment } from 'src/app/core/models/adjustment';

@Component({
  selector: 'app-removal-receipt',
  templateUrl: './removal-receipt.component.html',
  styleUrls: ['./removal-receipt.component.css']
})
export class RemovalReceiptComponent implements OnInit {

  @Input() stock: Adjustment;

  constructor() { }

  ngOnInit() {
  }

}
