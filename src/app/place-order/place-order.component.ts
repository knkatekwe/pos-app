import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Items } from '../core/models/items';
import { PaymentType } from '../core/models/payment-type';
import { OrdersDetail } from '../core/models/orders-detail';
import { OrdersDetailPK } from '../core/models/orders-detail-pk';
import { PlaceOrder } from '../core/models/place-order';
import { Orders } from '../core/models/orders';
import { FormControl, NgForm } from '@angular/forms';
import { PlaceOrderServiceService } from '../core/services/place-order-service.service';
import { PaymentTypeService } from '../core/services/payment-type.service';
import { ItemService } from '../core/services/item.service';
import { ConfirmationModalService } from '../shared/confirmation-modal/confirmation-modal.service';

@Component({
	selector: 'app-place-order',
	templateUrl: './place-order.component.html',
	styleUrls: [ './place-order.component.css' ]
})
export class PlaceOrderComponent implements OnInit {
	model: Items = new Items();
	products: Array<Items> = [];
	paymentTypes: Array<PaymentType> = [];
	selectedItems: Array<OrdersDetail> = [];
	FullTotal = 0;
	searchedItems: Items = new Items();
	searchedPaymentTypes: PaymentType = new PaymentType();
	orderDetail_PKDto: OrdersDetailPK;
	orderDetail: OrdersDetail;
	items: any = [];
	placeOrder: PlaceOrder;
	orders: Orders;
	Total = 0;

	itemz: Observable<Items[] | Observable<Items[]>>;
	itemCode = new FormControl();
	codeF = new FormControl();
	description = new FormControl();
	unitPrice = new FormControl();
	retailPrice = new FormControl();
	qtyF = new FormControl();
	qtyOHF = new FormControl();
	rate = new FormControl();
	saleType = new FormControl('RETAIL');

	itemzLoading = false;
	paymentStatus = false;
	saleTypeStatus: boolean;
	// @ViewChild('frmItems') frmItems: NgForm;
	@ViewChild('frmItems', { static: false })
	frmItems: NgForm;
	@ViewChild('frmItem', { static: false })
	frmItem: NgForm;
	@ViewChild('code', { static: false })
	nameField: ElementRef;
	@ViewChild('qty', { static: false })
	qtyField: ElementRef;

	constructor(
		private placeOrderService: PlaceOrderServiceService,
		private paymentTypeService: PaymentTypeService,
		private itemService: ItemService,
		private confirmationModalService: ConfirmationModalService,
		private route: Router,
		private elem: ElementRef
	) {}

	ngOnInit() {
		this.getPaymentTypeId();
		this.getItemCode();
		this.saleTypeStatus = false;

		this.itemz = this.itemCode.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap(() => (this.itemzLoading = true)),
			switchMap((code) => this.itemService.findProductByCode(code)),
			tap(() => (this.itemzLoading = false))
		);
	}

	setSale(sale) {
		this.saleType.value == sale;
	}

	search = (text$: Observable<string>) => {
		return text$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap(() => (this.itemzLoading = true)),
			// switchMap allows returning an observable rather than maps array
			switchMap((code) => this.itemService.findProductByCode(code)),
			tap(() => (this.itemzLoading = false))
		);
		// catchError(new ErrorInfo().parseObservableResponseError)
	};

	formatter = (x: { code: string }) => x.code;

	//  Used to format the result data from the lookup into the
	//  display and list values. Maps `{name: "band", id:"id" }` into a string

	resultFormatBandListValue(value: any) {
		return value.code;
	}

	// Initially binds the string value and then after selecting
	// an item by checking either for string or key/value object.

	inputFormatBandListValue(value: any) {
		if (value.code) {
			return value.code;
		}
		return value;
	}

	getPaymentTypeId() {
		this.paymentTypeService.getAllPaymentTypes().subscribe((result) => {
			this.paymentTypes = result;
			console.log(this.paymentTypes);
		});
	}

	// retrieve products from api
	searchItems(event: any) {
		this.itemService.searchItem(event.target.value).subscribe((result) => {
			this.searchedItems = result;
			console.log(this.searchedItems);
		});
	}

	getItemCode() {
		this.itemService.getAllItems().subscribe((result) => {
			this.items = result;
		});
	}

	SelectOrderDetails() {
		// const total = this.elem.nativeElement.querySelector('#total').value;
		const qty = this.elem.nativeElement.querySelector('#qty').value;
		// const qtyonhand = this.elem.nativeElement.querySelector('#qtyonhand').value;
		// const rate = this.elem.nativeElement.querySelector('#rate').value;
		console.log(this.rate.value);

		if (this.rate.value == null) {
			this.confirmationModalService.confirm('Sale', 'Select payment type!', 'Ok');
			//alert('Oops, select payment!');
			return;
		}

		if (qty === '') {
			this.confirmationModalService.confirm('Sale', 'Enter quantity!', 'Ok');
			//alert('Oops, you forgot to enter order quantity!');
			this.qtyField.nativeElement.focus();
			return;
		}

		if (this.qtyF.value === 0) {
			this.confirmationModalService.confirm('Sale', 'Enter number greater than 0 for the product!', 'Ok');
			//alert('Oops, enter amount greater than 0!');
			return;
		}

		if (this.codeF.value == null) {
			this.confirmationModalService.confirm('Sale', 'Search and select a product!', 'Ok');
			//alert('Oops, search and select a product!');
			return;
		}

		if (this.qtyOHF.value < this.qtyF.value) {
			this.confirmationModalService.confirm(
				'Sale',
				'Enter quantity that is less than or equal to that in stock!',
				'Ok'
			);
			//alert('Oops, enter quantity that is less than or equal to that in stock!');
			return;
		}

		if (this.saleType.value === 'RETAIL') {
			console.log('this sale is:' + this.saleType.value);
			this.Total = qty * (this.searchedItems.unicPrice * this.rate.value); //total for item
			this.FullTotal = this.FullTotal + this.Total; //grand total for all items
		} else {
			console.log('this sale is:' + this.saleType.value);
			this.Total = qty * (this.searchedItems.retailPrice * this.rate.value); //total for item
			this.FullTotal = this.FullTotal + this.Total; //grand total for all items
		}

		// this.Total = qty * (this.searchedItems.unicPrice * this.rate.value);//total for item
		// this.FullTotal = this.FullTotal + this.Total;//grand total for all items
		const price = this.FullTotal.toFixed(2);
		console.log('Total price is: ' + price);

		this.paymentStatus = true;
		this.saleTypeStatus = true;

		this.orders = new Orders(this.FullTotal, this.searchedPaymentTypes, this.saleType.value);
		console.log(this.orders.totalPrice);
		this.orderDetail_PKDto = new OrdersDetailPK();
		this.orderDetail = new OrdersDetail();
		this.orderDetail.quantity = qty;
		if (this.saleType.value === 'RETAIL') {
			console.log('this sale is:' + this.saleType.value);
			this.orderDetail.unitprice = this.searchedItems.unicPrice * this.rate.value; //
		} else {
			console.log('this sale is:' + this.saleType.value);
			this.orderDetail.unitprice = this.searchedItems.retailPrice * this.rate.value; //
		}
		//this.orderDetail.unitprice = (this.searchedItems.unicPrice * this.rate.value);
		// this.orderDetail.saleType = this.saleType.value;
		this.orderDetail.item = this.searchedItems;
		this.orderDetail.orders = this.orders;
		this.orderDetail.orderDetail_PKDto = this.orderDetail_PKDto;

		this.selectedItems.push(this.orderDetail);

		console.log(this.selectedItems);
		this.qtyF.reset();
		// this.qtyOHF.reset();
		this.codeF.reset();
		// this.description.reset();
		// this.unitPrice.reset();
		this.nameField.nativeElement.focus();
	}

	searchPaymentType(event: any) {
		this.paymentTypeService.searchPaymentType(event.target.value).subscribe((result) => {
			this.searchedPaymentTypes = result;
			console.log(this.searchedItems);
		});
	}

	addOrder() {
		this.placeOrder = new PlaceOrder();
		this.placeOrder.itemsDTO = this.searchedItems;
		this.placeOrder.orderDTO = this.orders;
		this.placeOrder.orderDetailDTOS = this.selectedItems;

		this.placeOrderService.placeOrder(this.placeOrder).subscribe((result) => {
			if (result) {
				//this.confirmationModalService.confirm('Sale', 'Sale completed successfully.', 'Ok');
				//alert('Order has been saved successfully');
				//this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
				// this.route.navigateByUrl('/main/dashboard', { skipLocationChange: true }).then(() => {
				// 	this.route.navigate([ '/main/place-order/receipt' ]);
        // });
        this.route.navigate([ '/main/place-order/receipt' ]);
			} else {
				this.confirmationModalService.confirm('Sale', 'Sale failed!', 'Ok');
				//alert('Failed to save the Order');
				// this.frmItems.reset();
			}
		});
	}
	// delete item from order list
	removeItem(i: number, price: number) {
		console.log(i);
		this.selectedItems.splice(i, 1);
		this.FullTotal = this.FullTotal - price;
	}

	saleTypes: { name: string }[] = [
		{
			name: 'RETAIL'
		},
		{
			name: 'WHOLESALE'
		}
	];
}
