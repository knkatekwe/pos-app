import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Items } from 'src/app/core/models/items';
import { PaymentType } from 'src/app/core/models/payment-type';
import { AdjustmentDetail } from 'src/app/core/models/adjustment-detail';
import { AdjustmentDetailPK } from 'src/app/core/models/adjustment-detail-pk';
import { PlaceAdjustment } from 'src/app/core/models/place-adjustment';
import { Adjustment } from 'src/app/core/models/adjustment';
import { PlaceAdjustmentServiceService } from 'src/app/core/services/place-adjustment.service';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-adjust-adjustment',
  templateUrl: './adjust-stock.component.html',
})
export class AdjustStockComponent implements OnInit {

  model: Items = new Items();
  paymentTypes: Array<PaymentType> = [];
  selectedItems: Array<AdjustmentDetail> = [];
  FullTotal = 0;
  searchedItems: Items = new Items();
  searchedPaymentTypes: PaymentType = new PaymentType();
  adjustmentDetail_PKDto: AdjustmentDetailPK;
  adjustmentDetail: AdjustmentDetail;
  items: any = [];
  placeAdjustment: PlaceAdjustment;
  adjustment: Adjustment;
  Total = 0;
  // @ViewChild('frmItems') frmItems: NgForm;
  @ViewChild('frmItems', {static: false}) frmItems: NgForm;
  @ViewChild('code', {static: false}) nameField: ElementRef;
  @ViewChild('qty', {static: false}) qtyField: ElementRef;

  itemz: Observable<Items[] | Observable<Items[]>>;
  itemCode = new FormControl();
  codeF = new FormControl();
  description = new FormControl();
  unitPrice = new FormControl();
  retailPrice = new FormControl();
  purchasePrice = new FormControl();
  qtyF = new FormControl();
  qtyOHF = new FormControl();
  itemzLoading = false;

  // tslint:disable-next-line: max-line-length
  constructor(private placeAdjustmentService: PlaceAdjustmentServiceService, private paymentTypeService: PaymentTypeService , private itemService: ItemService, private route: Router, private elem: ElementRef) { }

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

  getPaymentTypeId(){
    this.paymentTypeService.getAllPaymentTypes().subscribe(
      (result) => {
        this.paymentTypes = result;
        console.log(this.paymentTypes);
      }
    );

  }


  searchItems(event: any){
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

  SelectAdjustmentDetails(){

    const total = this.elem.nativeElement.querySelector('#total').value;
    const qty = this.elem.nativeElement.querySelector('#qty').value;
    const purchasePrice = this.elem.nativeElement.querySelector('#purchasePrice').value;

    // const adjustmentId = this.elem.nativeElement.querySelector('#adjustmentid').value;

    if (this.codeF.value == null) {
      alert('Oops, search and select a product!');
      return;
    }

    if (qty === '') {
      alert('Oops, you forgot to enter quantity to be removed!');
      this.qtyField.nativeElement.focus();
      return;
    }

    if (this.qtyOHF.value < this.qtyF.value) {
      alert('Oops, enter quantity that is less than or equal to that in stock!');
      return;
    }

    this.Total = qty * this.searchedItems.purchasePrice;
    this.FullTotal = this.FullTotal + this.Total;
    const price = this.FullTotal;
    console.log(price);

    this.adjustment = new Adjustment(this.FullTotal);
    console.log(this.adjustment.totalPrice);
    this.adjustmentDetail_PKDto = new AdjustmentDetailPK();
    this.adjustmentDetail = new AdjustmentDetail();
    this.adjustmentDetail.quantity = qty;
    this.adjustmentDetail.purchasePrice = purchasePrice;
    this.adjustmentDetail.unitprice = this.searchedItems.unicPrice;
    this.adjustmentDetail.retailprice = this.searchedItems.retailPrice;
    this.adjustmentDetail.item = this.searchedItems;
    this.adjustmentDetail.adjustment = this.adjustment;
    this.adjustmentDetail.adjustmentDetail_PKDto = this.adjustmentDetail_PKDto;

    this.selectedItems.push(this.adjustmentDetail);

    console.log(this.selectedItems);
    this.qtyF.reset();
    // this.qtyOHF.reset();
    this.codeF.reset();
    // this.description.reset();
    // this.unitPrice.reset();
    // this.purchasePrice.reset();
    this.nameField.nativeElement.focus();
  }

  searchPaymentType(event: any){
    this.paymentTypeService.searchPaymentType(event.target.value).subscribe(
      (result) => {
        this.searchedPaymentTypes = result;
        console.log(this.searchedItems);
      }
    );
  }
  addAdjustment(){
    this.placeAdjustment = new PlaceAdjustment();
    this.placeAdjustment.itemsDTO = this.searchedItems;
    this.placeAdjustment.adjustmentDTO = this.adjustment;
    this.placeAdjustment.adjustmentDetailDTOS = this.selectedItems;

    this.placeAdjustmentService.placeAdjustment(this.placeAdjustment).subscribe(
      (result) => {
        if (result) {
          alert('Adjustment has been saved successfully');
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //this.route.navigateByUrl('pos', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/main/inventory/place-adjustment']);
        });
        } else {
          alert('Failed to save the Adjustment');
        }
      }
    );

  }

 // delete item from order list
 removeItem(i: number, price: number){
  if (confirm('Are you sure you want to remove this item?')) {
    console.log(i);
    this.selectedItems.splice(i, 1);
    this.FullTotal = this.FullTotal - price;
  }
  return false
}

}
