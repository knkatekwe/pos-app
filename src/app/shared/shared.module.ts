import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { PurchaseReceiptComponent } from './receipts/purchase-receipt/purchase-receipt.component';
import { StockIntakeReceiptComponent } from './receipts/stock-intake-receipt/stock-intake-receipt.component';
import { UserRoleDirective } from './user-role.directive';
import { ReceiptPrintComponent } from './receipts/receipt-print/receipt-print.component';
import { RemovalReceiptComponent } from './receipts/removal-receipt/removal-receipt.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ConfirmationModalService } from './confirmation-modal/confirmation-modal.service';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    PurchaseReceiptComponent,
    StockIntakeReceiptComponent,
    ShowAuthedDirective,
    UserRoleDirective,
    ReceiptPrintComponent,
    RemovalReceiptComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    DataTablesModule,
    NgxBarcodeModule,//barcode module
    NgxPrintModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    DataTablesModule,
    NgxBarcodeModule,//barcode module
    NgxPrintModule,
    //
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    PurchaseReceiptComponent,
    StockIntakeReceiptComponent,
    ShowAuthedDirective,
    UserRoleDirective,
    ReceiptPrintComponent,
    RemovalReceiptComponent,
    ConfirmationModalComponent,
  ],
  providers:[
    ConfirmationModalService
  ],
  entryComponents:[ConfirmationModalComponent]
})
export class SharedModule { }
