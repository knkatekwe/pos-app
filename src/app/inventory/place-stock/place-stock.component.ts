import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Items } from 'src/app/core/models/items';
import { PaymentType } from 'src/app/core/models/payment-type';
import { StockDetail } from 'src/app/core/models/stock-detail';
import { StockDetailPK } from 'src/app/core/models/stock-detail-pk';
import { PlaceStock } from 'src/app/core/models/place-stock';
import { Stock } from 'src/app/core/models/stock';
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PlaceStockServiceService } from 'src/app/core/services/place-stock-service.service';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { ItemService } from 'src/app/core/services/item.service';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Component({
	selector: 'app-place-stock',
	templateUrl: './place-stock.component.html',
})
export class PlaceStockComponent implements OnInit {
	model: Items = new Items();
	paymentTypes: Array<PaymentType> = [];
	selectedItems: Array<StockDetail> = [];
	FullTotal = 0;
	searchedItems: Items = new Items();
	searchedPaymentTypes: PaymentType = new PaymentType();
	stockDetail_PKDto: StockDetailPK;
	stockDetail: StockDetail;
	items: any = [];
	placeStock: PlaceStock;
	stock: Stock;
	Total = 0;
	// @ViewChild('frmItems') frmItems: NgForm;
	@ViewChild('frmItems')
	frmItems: NgForm;
	@ViewChild('code')
	nameField: ElementRef;
	@ViewChild('qty')
  qtyField: ElementRef;

  form: FormGroup;

	itemz: Observable<Items[] | Observable<Items[]>>;
	itemCode = new FormControl();
	codeF = new FormControl();
	description = new FormControl();
  unitPrice = new FormControl();
  retailPrice = new FormControl();
	qtyF = new FormControl();
	qtyOHF = new FormControl();
	purchasePriceF = new FormControl();
  unitPriceF = new FormControl();
  retailPriceF = new FormControl();
  itemzLoading = false;
  isSubmiting: boolean;

	// tslint:disable-next-line: max-line-length
	constructor(
		private placeStockService: PlaceStockServiceService,
		private paymentTypeService: PaymentTypeService,
    private itemService: ItemService,
    private confirmationModalService: ConfirmationModalService,
		private route: Router,
		private elem: ElementRef,
	) {}

	ngOnInit() {
    this.isSubmiting = false
		this.getPaymentTypeId();
		this.getItemCode();
		this.itemz = this.itemCode.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap(() => (this.itemzLoading = true)),
			switchMap((code) => this.itemService.findProductByCode(code)),
			tap(() => (this.itemzLoading = false))
		);
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

	getPaymentTypeId(){
		this.paymentTypeService.getAllPaymentTypes().subscribe((result) => {
			this.paymentTypes = result;
			console.log(this.paymentTypes);
		});
	}

	searchItems(event: any){
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

	SelectStockDetails(){
		const total = this.elem.nativeElement.querySelector('#total').value;
		const qty = this.elem.nativeElement.querySelector('#qty').value;
		const purchasePrice = this.elem.nativeElement.querySelector('#purchasePrice').value;

		// const stockId = this.elem.nativeElement.querySelector('#stockid').value;

		if (this.codeF.value == null) {
      this.confirmationModalService.confirm('Stock In-take', 'Search and select a product!', 'Ok')
			//alert('Oops, search and select a product!');
			return;
		}

		if (qty === '') {
      this.confirmationModalService.confirm('Stock In-take', 'Enter enter stock quantity!', 'Ok')
			//alert('Oops, you forgot to enter stock quantity!');
			this.qtyField.nativeElement.focus();
			return;
		}

		if (this.purchasePriceF.value > this.unitPriceF.value) {
      this.confirmationModalService.confirm('Stock In-take', 'Enter a value that is more than the purchase price!', 'Ok')
			//alert('Oops, enter a value that is more than the purchase price!');
			return;
		}

		this.Total = qty * this.searchedItems.purchasePrice;
		this.FullTotal = this.FullTotal + this.Total;
		const price = this.FullTotal;
		console.log(price);

		this.stock = new Stock(this.FullTotal);
		console.log(this.stock.totalPrice);
		this.stockDetail_PKDto = new StockDetailPK();
		this.stockDetail = new StockDetail();
		this.stockDetail.quantity = qty;
		this.stockDetail.purchasePrice = purchasePrice;
    this.stockDetail.unitprice = this.searchedItems.unicPrice;
    this.stockDetail.retailprice = this.searchedItems.retailPrice;
		this.stockDetail.item = this.searchedItems;
		this.stockDetail.stock = this.stock;
		this.stockDetail.stockDetail_PKDto = this.stockDetail_PKDto;

		this.selectedItems.push(this.stockDetail);

		console.log(this.selectedItems);
    this.qtyF.reset();
		// qtyOHF.reset();
		this.codeF.reset();
		// this.unitPrice.reset();
		// this.purchasePriceF.reset();
		// this.description.reset();
		this.nameField.nativeElement.focus();
	}

	searchPaymentType(event: any){
		this.paymentTypeService.searchPaymentType(event.target.value).subscribe((result) => {
			this.searchedPaymentTypes = result;
			console.log(this.searchedItems);
		});
	}
	addStock(){
    this.isSubmiting = true
		this.placeStock = new PlaceStock();
		this.placeStock.itemsDTO = this.searchedItems;
		this.placeStock.stockDTO = this.stock;
		this.placeStock.stockDetailDTOS = this.selectedItems;

		this.placeStockService.placeStock(this.placeStock).subscribe((result) => {
			if (result) {
        this.confirmationModalService.confirm('Stock In-take', 'Stock in-take successfull.', 'Ok')
				this.isSubmiting = false
				//
				//this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
				this.route.navigateByUrl('/main/dashboard', { skipLocationChange: true }).then(() => {
					this.route.navigate([ '/main/inventory/place-stock' ]);
				});
			} else {
        this.confirmationModalService.confirm('Stock In-take', 'Stock in-take failed!', 'Ok')
				this.isSubmiting = false
			}
		});
	}

	// delete item from order list
	removeItem(i: number, amount: number){
		//console.log(i);
		this.selectedItems.splice(i, 1);
		this.FullTotal = this.FullTotal - amount;
  }

}
