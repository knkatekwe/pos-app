import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/core/services/item.service';
import { Items } from 'src/app/core/models/items';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items: Array<Items> = [];
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  @ViewChild('tblItems') table: any;
  dataTable: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadAllItems();

    this.dtOptions = {
      // select: true,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'print',
        'excel',
      ]
    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  loadAllItems(): void {
    this.itemService.getAllItems().subscribe(
      (result) => {
        this.items = result;

        console.log(this.items);
      }
    );
  }

}
