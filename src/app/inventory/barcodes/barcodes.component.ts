import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Barcodes } from "src/app/core/models/bardcodes";
import { BarcodeService } from "src/app/core/services/barcode.service";
import { ConfirmationModalService } from "src/app/shared/confirmation-modal/confirmation-modal.service";

@Component({
  selector: "app-barcodes",
  templateUrl: "./barcodes.component.html",
  styleUrls: ["./barcodes.component.css"],
})
export class BarcodesComponent implements OnInit {
  barcodes: Array<Barcodes> = [];
  // tslint:disable-next-line: new-parens
  selectedBarcodes: Barcodes = new Barcodes();
  tempBarcodes: Barcodes = null;
  manuallySelected = false;
  isSubmitting: boolean;

  searchText: any;
  p: any;
  // @ViewChild('frmBarcodes') frmBarcodes: NgForm;
  @ViewChild("frmBarcodes")
  frmBarcodes: NgForm;

  //
  elementType = "svg";
  format = "CODE128";
  // format = "EAN13";

  constructor(
    private barcodeService: BarcodeService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.loadAllBarcodes();
  }

  loadAllBarcodes() {
    this.barcodeService.getAllBarcodes().subscribe((result) => {
      this.barcodes = result;
      console.log(this.barcodes);
    });
  }

  selectBarcodes(barcode: Barcodes) {
    this.clear();
    this.selectedBarcodes = barcode;
    this.tempBarcodes = Object.assign({}, barcode);
    this.manuallySelected = true;
  }

  clear() {
    const index = this.barcodes.indexOf(this.selectedBarcodes);

    if (index !== -1) {
      this.barcodes[index] = this.tempBarcodes;
      this.tempBarcodes = null;
    }
    // tslint:disable-next-line: new-parens
    this.selectedBarcodes = new Barcodes();
    this.manuallySelected = false;
  }

  saveBarcodes() {
    this.isSubmitting = true;
    this.barcodeService
      .saveBarcodes(this.selectedBarcodes)
      .subscribe((result) => {
        if (result) {
          //console.log(this.selectedBarcodes);
          this.confirmationModalService.confirm(
            "Barcode",
            "Barcode has been saved successfully.",
            "Ok"
          );
          this.isSubmitting = false;
          //alert('Barcode has been saved successfully');
          this.clear();
          this.loadAllBarcodes();
        } else {
          this.confirmationModalService.confirm(
            "Barcode",
            "Failed to save the barcode!",
            "Ok",
            "Cancel"
          );
          this.isSubmitting = false;
          //alert('Failed to save the barcode');
        }
      });
  }

  deletBarcodes(barcodesID: Barcodes) {
    if (confirm("Are you sure you want to delete this barcode?")) {
      this.barcodeService
        .deletePaymentType(barcodesID.id)
        .subscribe((result) => {
          if (result) {
            this.confirmationModalService.confirm(
              "Barcode",
              "Barcode has been deleted successfully.",
              "Ok"
            );
            //alert('Barcode has been Deleted successfully');
          } else {
            this.confirmationModalService.confirm(
              "Barcode",
              "Failed to delete barcode!",
              "Ok",
              "Cancel"
            );
          }
          this.loadAllBarcodes();
        });
    }
  }
}
