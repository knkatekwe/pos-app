import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Items } from 'src/app/core/models/items';
import { ItemService } from 'src/app/core/services/item.service';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Array<Items> = [];
  // tslint:disable-next-line: new-parens
  selectedItems: Items = new Items;
  tempItems: Items = null;
  manuallySelected = false;
  isSubmitting: boolean

  searchText: any;
  p: any;
  // @ViewChild('frmItems') frmItems: NgForm;
  @ViewChild('frmItems', {static: false}) frmItems: NgForm;

  constructor(private itemService: ItemService, private confirmationModalService: ConfirmationModalService) { }

  ngOnInit() {
    this.isSubmitting = false
    this.loadAllItems();
  }

  loadAllItems(){
    this.itemService.getAllItems().subscribe(
      (result) => {
        this.items = result;
        console.log(this.items);
      }
    );
  }

  selectItems(item: Items){
    this.clear();
    this.selectedItems = item;
    this.tempItems = Object.assign({}, item);
    this.manuallySelected = true;
  }

  clear(){
    const index = this.items.indexOf(this.selectedItems);

    if (index !== -1) {
      this.items[index] = this.tempItems;
      this.tempItems = null;
    }
    // tslint:disable-next-line: new-parens
    this.selectedItems = new Items;
    this.manuallySelected = false;
  }

  saveItems(){
    this.isSubmitting = true
    this.itemService.saveItems(this.selectedItems).subscribe(
      (result) => {
        if (result) {
          //console.log(this.selectedItems);
          this.confirmationModalService.confirm('Product', 'Product has been saved successfully.', 'Ok')
          this.isSubmitting = false
          //alert('Product has been saved successfully');
          this.clear();
          this.loadAllItems();
        } else {
          this.confirmationModalService.confirm('Product', 'Failed to save the product!', 'Ok', 'Cancel')
          this.isSubmitting = false
          //alert('Failed to save the product');
        }
      }
    );

  }

  deletItems(itemsID: Items): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.itemService.deletePaymentType(itemsID.code).subscribe(
        (result) => {
          if (result) {
            this.confirmationModalService.confirm('Product', 'Product has been deleted successfully.', 'Ok')
            //alert('Product has been Deleted successfully');
          } else {
            this.confirmationModalService.confirm('Product', 'Failed to delete product!', 'Ok', 'Cancel')
          }
          this.loadAllItems();
        }
      );
    }
  }


}

