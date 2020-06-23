import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/dtos/stock';
import { StockService } from 'src/app/services/stock.service';
import { StockDetail } from 'src/app/dtos/stock-detail';

declare var $: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stock: Array<Stock> = [];
  stockDetails: Array<StockDetail> = [];
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  @ViewChild('tblStock', {static: false}) table: any;
  dataTable: any;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.loadAllStock();

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

  loadAllStock(): void {
    this.stockService.getAllStock().subscribe(
      (result) => {
        this.stock = result;
        console.log(this.stock);

      }
    );
  }

// retrieve stock details from api
  loadStockDetails(sId: number): void {
    this.stockService.getAllStockDetails(sId).subscribe(
      (result) => {
        this.stockDetails = result;
        console.log(this.stockDetails);
      }
    );

  }

}
