import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaymentType } from 'src/app/core/models/payment-type';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

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


  constructor(private paymentTypeService: PaymentTypeService,
              private dialog: ConfirmationModalService) {
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
    // if (confirm('Are you sure you want to delete this Payment Type?')) {
    //   this.paymentTypeService.deletePaymentType(paymentType.typeName).subscribe(
    //     (result) => {
    //       if (result) {
    //         this.dialog.confirm('Payment Types', 'Payment has been deleted successfully.', 'Ok')
    //         //alert('PaymentType has been deleted successfully');
    //       } else {
    //         this.dialog.confirm('Payment Types', 'Failed to delete payment type!.', 'Ok')
    //         //alert('Failed to delete the Payment Type');
    //       }
    //       this.loadAllPaymentTypes();
    //     }
    //   );
    // }
  }

  selectPaymentType(paymentType: PaymentType){
    this.clear();
    this.selectedPaymentType = paymentType;
    this.tempPaymentType = Object.assign({}, paymentType);
    this.manuallySelected = true;
  }

  clear(){
    const index = this.paymentTypes.indexOf(this.selectedPaymentType);
    if (index !== -1) {
      this.paymentTypes[index] = this.tempPaymentType;
      this.tempPaymentType = null;
    }
    this.selectedPaymentType = new PaymentType();
    this.manuallySelected = false;
  }

  savePaymentType(){
    this.paymentTypeService.savePaymentType(this.selectedPaymentType).subscribe(
      (result) => {
        if (result) {
          this.dialog.confirm('Payment Types', 'Payment has been saved successfully.', 'Ok')
          //alert('Payment Type has been saved successfully');
          this.loadAllPaymentTypes();
          this.clear();
        } else {
          this.dialog.confirm('Payment Types', 'Failed to save payment type!', 'Ok')
          //alert('Failed to save the Payment Type');
        }
      }
    );
  }

}
