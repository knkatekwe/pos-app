import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaymentType } from '../core/models/payment-type';
import { PaymentTypeService } from '../core/services/payment-type.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManagePaymentTypesComponent implements OnInit {

  paymentTypes: Array<PaymentType> = [];
  selectedPaymentType: PaymentType = new PaymentType();
  tempPaymentType: PaymentType = null;
  manuallySelected = false;
  searchText: any;
  // @ViewChild('frmPaymentTypes') frmPaymentTypes: NgForm;
  @ViewChild('frmPaymentTypes', {static: false}) frmPaymentTypes: NgForm;


  constructor(private paymentTypeService: PaymentTypeService) {
  }

  ngOnInit() {
    this.loadAllPaymentTypes();
  }

  loadAllPaymentTypes(): void {
    this.paymentTypeService.getAllPaymentTypes().subscribe(
      (result) => {
        this.paymentTypes = result;
        console.log(this.paymentTypes);
      }
    );
  }

  deletePaymentType(paymentType: PaymentType): void {
    if (confirm('Are you sure you want to delete this Payment Type?')) {
      this.paymentTypeService.deletePaymentType(paymentType.typeName).subscribe(
        (result) => {
          if (result) {
            alert('PaymentType has been deleted successfully');
          } else {
            alert('Failed to delete the Payment Type');
          }
          this.loadAllPaymentTypes();
        }
      );
    }
  }

  selectPaymentType(paymentType: PaymentType): void {
    this.clear();
    this.selectedPaymentType = paymentType;
    this.tempPaymentType = Object.assign({}, paymentType);
    this.manuallySelected = true;
  }

  clear(): void {
    const index = this.paymentTypes.indexOf(this.selectedPaymentType);
    if (index !== -1) {
      this.paymentTypes[index] = this.tempPaymentType;
      this.tempPaymentType = null;
    }
    this.selectedPaymentType = new PaymentType();
    this.manuallySelected = false;
  }

  savePaymentType(): void {
    this.paymentTypeService.savePaymentType(this.selectedPaymentType).subscribe(
      (result) => {
        if (result) {
          alert('Payment Type has been saved successfully');
          this.loadAllPaymentTypes();
          this.clear();
        } else {
          alert('Failed to save the Payment Type');
        }
      }
    );
  }

}
