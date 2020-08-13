import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersDetail } from 'src/app/core/models/orders-detail';
import { Orders } from 'src/app/core/models/orders';
import { OrderService } from 'src/app/core/services/orders.service';

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Orders> = [];
  orderDetails: Array<OrdersDetail> = [];
   // Must be declared as "any", not as "DataTables.Settings"
   dtOptions: any = {};

  @ViewChild('tblSales', {static: false}) table: any;
  dataTable: any;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadAllOrders();

    this.dtOptions = {
      // select: true,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'print',
        'excel',
      ]
    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  loadAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (result) => {
        this.orders = result;
        console.log(this.orders);

      }
    );
  }

  // retrieve order details from api
  loadOrderDetails(oId: number): void {
    this.orderService.getAllOrderDetails(oId).subscribe(
      (result) => {
        this.orderDetails = result;
        console.log(this.orderDetails);
      }
    );

  }

}
