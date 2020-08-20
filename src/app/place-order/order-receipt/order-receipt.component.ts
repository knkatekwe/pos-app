import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/core/models/orders';
import { OrderService } from 'src/app/core/services/orders.service';
import { Router } from '@angular/router';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-order-receipt',
  templateUrl: './order-receipt.component.html',
  styleUrls: ['./order-receipt.component.css']
})
export class OrderReceiptComponent {

  order: Orders;

  constructor(private orderService: OrderService,
              private router: Router,
              public printService: PrintService) {
                this.orderService.getOrderDetail().subscribe(
                  (result) => {
                    this.order = result;
                    console.log(this.order);
                  }
                );
              }

  back(){
    this.router.navigateByUrl('/main/place-order')
  }

  printPage() {
    window.print();
  }

  onPrintInvoice() {
    this.printService
      .printDocument();

    //this.printService.onDataReady()
    //console.log('...button clicked...')
  }

}
