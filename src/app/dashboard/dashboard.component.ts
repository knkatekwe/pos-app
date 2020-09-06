import { Component, OnInit } from '@angular/core';
import { PlaceOrderServiceService } from '../core/services/place-order-service.service';
import { ItemService } from '../core/services/item.service';
import { OrderService } from '../core/services/orders.service';
import { HttpClient } from '@angular/common/http';
import { PaymentType } from '../core/models/payment-type';
import { API_ENDPOINT, ApiService } from '../core/services/api.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	// totalPaymentTypes = 20;
	totalItems: number;
	totalOrders: number;
	totalAllRoundAmount: number;
	totalForUsd: number;
	totalForEcoCash: number;
  totalForSwipe: number;
  totalForBond: number;
  totalForRands: number;
  totalForZipitSamrt: number;

  results = [];

	// tslint:disable-next-line: max-line-length
	constructor(
		private placeOrderService: PlaceOrderServiceService,
		private itemService: ItemService,
    private orderService: OrderService,
    private http: HttpClient,
    private apiService: ApiService
	) {}

	ngOnInit() {
		// this.getTotalPaymentTypes();
		this.getTotalItems();
		this.getTotalOrders();
		this.getAllRoundAmountTotal();
		this.getAllAmountForCashTotal();
		this.getAllAmountForEcoCashTotal();
    this.getAllAmountForSwipeTotal();
    this.getAllAmountForRands()
    this.getAllAmountForBondNotes()
    this.getAllAmountForZipitSmart()
    // this.results = this.orderService.getTotalForPaymentTypeToday()
    // console.log('...data...')
    // console.log(this.results)
  }

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
		this.orderService.getTotalAmountForPaymentTypeToday('USD').subscribe((result) => {
			this.totalForUsd = result;
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

  getAllAmountForBondNotes(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('Bond Notes').subscribe((result) => {
			this.totalForBond = result;
			console.log(result);
		});
  }

  getAllAmountForRands(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('Rand').subscribe((result) => {
			this.totalForRands = result;
			console.log(result);
		});
  }

  getAllAmountForZipitSmart(): void {
		this.orderService.getTotalAmountForPaymentTypeToday('ZIPIT-Smart').subscribe((result) => {
			this.totalForZipitSamrt = result;
			console.log(result);
		});
	}
}
