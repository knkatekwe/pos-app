import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/core/models/stock';
import { StockService } from 'src/app/core/services/stock.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  form: FormGroup;
  searchText: any;
  p: any;
  stock: Array<Stock> = [];
  stockDetail: Stock;

  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAllStockToday();
    this.initForm()

  }

  loadAllStockToday(){
    this.stockService.getAllStockToday().subscribe(
      (result) => {
        this.stock = result;
        console.log(this.stock);

      }
    );
  }

  loadAllStock(){
    this.stockService.getAllStock().subscribe(
      (result) => {
        this.stock = result;
        console.log(this.stock);

      }
    );
  }

// retrieve stock details from api
  loadStock(sId: number){
    this.stockService.getStock(sId).subscribe(
      (result) => {
        this.stockDetail = result;
        console.log(this.stockDetail);
      }
    );

  }

  search(query){
    console.log(query)
    this.stockService.getAllStockByDates(query.startDate, query.endDate).subscribe((result) => {
			this.stock = result;
			console.log(this.stock);
		});
  }

	initForm() {
		this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
	}

}
