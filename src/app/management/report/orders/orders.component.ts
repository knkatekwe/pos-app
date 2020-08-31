import { Component, OnInit, ViewChild } from '@angular/core';
import { Orders } from 'src/app/core/models/orders';
import { OrderService } from 'src/app/core/services/orders.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: [ './orders.component.css' ]
})
export class OrdersComponent implements OnInit {
  form: FormGroup;
  searchText: any;
  p: any;
	orders: Array<Orders> = [];
	orderz: Orders;

	constructor(private orderService: OrderService, private fb: FormBuilder) {}

	ngOnInit() {
    this.loadAllOrdersToday();
    this.initForm()
	}

	loadAllOrdersToday() {
		this.orderService.getAllOrdersToday().subscribe((result) => {
			this.orders = result;
			console.log(this.orders);
		});
  }

  loadAllOrders() {
		this.orderService.getAllOrders().subscribe((result) => {
			this.orders = result;
			console.log(this.orders);
		});
	}

	// retrieve order details from api
	loadOrderDetails(oId: number) {
		this.orderService.getAllOrderDetails(oId).subscribe((result) => {
			this.orderz = result;
			console.log(this.orderz);
		});
  }

  search(query){
    console.log(query)
    this.orderService.getAllOrdersByDates(query.startDate, query.endDate).subscribe((result) => {
			this.orders = result;
			console.log(this.orders);
		});
  }

	initForm() {
		this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
	}
}
