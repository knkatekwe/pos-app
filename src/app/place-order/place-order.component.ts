import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
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

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
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
  qtyF = new FormControl();
  qtyOHF = new FormControl();
  rate = new FormControl();
  itemzLoading = false;
  paymentStatus = false;
  // @ViewChild('frmItems') frmItems: NgForm;
  @ViewChild('frmItems', {static: false}) frmItems: NgForm;
  @ViewChild('frmItem', {static: false}) frmItem: NgForm;
  @ViewChild('code', {static: false}) nameField: ElementRef;
  @ViewChild('qty', {static: false}) qtyField: ElementRef;

  constructor(private placeOrderService: PlaceOrderServiceService,
              private paymentTypeService: PaymentTypeService , private itemService: ItemService,
              private route: Router, private elem: ElementRef) { }

  ngOnInit() {
    this.getPaymentTypeId();
    this.getItemCode();

    this.itemz = this.itemCode.valueChanges.pipe(
      debounceTime( 400 ),
      distinctUntilChanged(),
      tap(() => this.itemzLoading = true ),
      switchMap( code => this.itemService.findProductByCode( code ) ),
      tap(() => this.itemzLoading = false ) );

  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime( 400 ),
      distinctUntilChanged(),
      tap(() => this.itemzLoading = true ),
        // switchMap allows returning an observable rather than maps array
      switchMap( code => this.itemService.findProductByCode( code ) ),
      tap(() => this.itemzLoading = false ) );
        // catchError(new ErrorInfo().parseObservableResponseError)
  }

  formatter = (x: {code: string}) => x.code;

//  Used to format the result data from the lookup into the
//  display and list values. Maps `{name: "band", id:"id" }` into a string

resultFormatBandListValue(value: any) {
  return value.code;
}

// Initially binds the string value and then after selecting
// an item by checking either for string or key/value object.

inputFormatBandListValue(value: any)   {
  if (value.code) {
    return value.code;
  }
  return value;
}

  getPaymentTypeId(): void {
    this.paymentTypeService.getAllPaymentTypes().subscribe(
      (result) => {
        this.paymentTypes = result;
        console.log(this.paymentTypes);
      }
    );

  }

// retrieve products from api
  searchItems(event: any): void {
    this.itemService.searchItem(event.target.value).subscribe(
      (result) => {
        this.searchedItems = result;
        console.log(this.searchedItems);
      }
    );

  }

  getItemCode() {
    this.itemService.getAllItems().subscribe(
      (result) => {
        this.items = result;
      }
    );
  }

  SelectOrderDetails(): void {
    // const total = this.elem.nativeElement.querySelector('#total').value;
    const qty = this.elem.nativeElement.querySelector('#qty').value;
    // const qtyonhand = this.elem.nativeElement.querySelector('#qtyonhand').value;
    // const rate = this.elem.nativeElement.querySelector('#rate').value;
    console.log(this.rate.value);

    if (this.rate.value == null) {
      alert('Oops, select payment!');
      return;
    }

    if (qty === '') {
      alert('Oops, you forgot to enter order quantity!');
      this.qtyField.nativeElement.focus();
      return;
    }

    if (this.qtyF.value === 0) {
      alert('Oops, enter amount greater than 0!');
      return;
    }

    if (this.codeF.value == null) {
      alert('Oops, search and select a product!');
      return;
    }

    if (this.qtyOHF.value < this.qtyF.value) {
      alert('Oops, enter quantity that is less than or equal to that in stock!');
      return;
    }

    this.Total = qty * (this.searchedItems.unicPrice + (this.searchedItems.unicPrice * (this.rate.value / 100)));
    this.FullTotal = this.FullTotal + this.Total;
    const price = this.FullTotal.toFixed(2);
    console.log(price);

    this.paymentStatus = true;

    this.orders = new Orders(this.FullTotal, this.searchedPaymentTypes);
    console.log(this.orders.totalPrice);
    this.orderDetail_PKDto = new OrdersDetailPK();
    this.orderDetail = new OrdersDetail();
    this.orderDetail.quantity = qty;
    this.orderDetail.unitprice = (this.searchedItems.unicPrice + (this.searchedItems.unicPrice * (this.rate.value / 100)));
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

  searchPaymentType(event: any): void {
    this.paymentTypeService.searchPaymentType(event.target.value).subscribe(
      (result) => {
        this.searchedPaymentTypes = result;
        console.log(this.searchedItems);
      }
    );
  }

  addOrder(): void {
    this.placeOrder = new PlaceOrder();
    this.placeOrder.itemsDTO = this.searchedItems;
    this.placeOrder.orderDTO = this.orders;
    this.placeOrder.orderDetailDTOS = this.selectedItems;

    this.placeOrderService.placeOrder(this.placeOrder).subscribe(
      (result) => {
        if (result) {
          alert('Order has been saved successfully');
          // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.route.navigateByUrl('pos', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/main/place-order']);
        });
        } else {
          alert('Failed to save the Order');
          // this.frmItems.reset();
        }
      }
    );
  }
// delete item from order list
  removeItem(i: number, price: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      console.log(i);
      this.selectedItems.splice(i, 1);
      this.FullTotal = this.FullTotal - price;
    }
  }

}
