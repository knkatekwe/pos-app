import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orders } from 'src/app/core/models/orders';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-receipt-print',
  templateUrl: './receipt-print.component.html',
  styleUrls: ['./receipt-print.component.css']
})
export class ReceiptPrintComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private printService: PrintService) { }

  order: Orders

  ngOnInit() {
    // Retreive the prefetched order
		this.route.data.subscribe((data: { order: Orders }) => {
      this.order = data.order;
      console.log(this.order)
    });
    this.printService.onDataReady()
  }

}
