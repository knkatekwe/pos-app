import { Component, OnInit } from '@angular/core';
import { PlaceOrderServiceService } from '../core/services/place-order-service.service';
import { ItemService } from '../core/services/item.service';
import { OrderService } from '../core/services/orders.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	// totalPaymentTypes = 20;
	totalItems: number;
	totalOrders: number;
	totalAllRoundAmount: number;
	totalForCash: number;
	totalForEcoCash: number;
	totalForSwipe: number;

	// tslint:disable-next-line: max-line-length
	constructor(
		private placeOrderService: PlaceOrderServiceService,
		private itemService: ItemService,
		private orderService: OrderService
	) {}

	ngOnInit() {
		// this.getTotalPaymentTypes();
		this.getTotalItems();
		this.getTotalOrders();
		this.getAllRoundAmountTotal();
		this.getAllAmountForCashTotal();
		this.getAllAmountForEcoCashTotal();
		this.getAllAmountForSwipeTotal();
	}

	// getTotalPaymentTypes(): void {
	//   this.paymentTypeService.getTotalPaymentTypes().subscribe(
	//     (count) => {
	//       this.totalPaymentTypes = count;
	//     }
	//   );
	// }

	getTotalItems(): void {
		this.itemService.getTotalItems().subscribe((count) => {
			this.totalItems = count;
		});
	}

	getTotalOrders(): void {
		this.placeOrderService.getTotalOrders().subscribe((result) => {
			this.totalOrders = result;
			console.log(result);
		});
	}

	getAllRoundAmountTotal(): void {
		this.orderService.getTotalAmountForToday().subscribe((result) => {
			this.totalAllRoundAmount = result;
			console.log(result);
		});
	}

	getAllAmountForCashTotal(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('Cash').subscribe((result) => {
			this.totalForCash = result;
			console.log(result);
		});
	}

	getAllAmountForEcoCashTotal(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('EcoCash').subscribe((result) => {
			this.totalForEcoCash = result;
			console.log(result);
		});
	}

	getAllAmountForSwipeTotal(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('Swipe').subscribe((result) => {
			this.totalForSwipe = result;
			console.log(result);
		});
	}
}
