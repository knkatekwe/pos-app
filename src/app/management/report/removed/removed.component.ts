import { Component, OnInit, ViewChild } from '@angular/core';
import { AdjustmentService } from 'src/app/core/services/adjustment.service';
import { Adjustment } from 'src/app/core/models/adjustment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-removed',
  templateUrl: './removed.component.html',
  styleUrls: ['./removed.component.css']
})
export class RemovedComponent implements OnInit {

  form: FormGroup;
  searchText: any;
  p: any;
  adjustment: Array<Adjustment> = [];
  adjustmentDetail: Adjustment;


  constructor(private adjustmentService: AdjustmentService,  private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAllAdjustmentsToday();
    this.initForm()
  }

  loadAllAdjustmentsToday(){
    this.adjustmentService.getAllAdjustmentsToday().subscribe(
      (result) => {
        this.adjustment = result;
        console.log(this.adjustment);

      }
    );
  }

  loadAllAdjustments(){
    this.adjustmentService.getAllAdjustments().subscribe(
      (result) => {
        this.adjustment = result;
        console.log(this.adjustment);

      }
    );
  }

// retrieve stock details from api
  loadAdjustment(aId: number){
    this.adjustmentService.getAdjustment(aId).subscribe(
      (result) => {
        this.adjustmentDetail = result;
        console.log(this.adjustmentDetail);
      }
    );

  }

  search(query){
    console.log(query)
    this.adjustmentService.getAllOrdersByDates(query.startDate, query.endDate).subscribe((result) => {
			this.adjustment = result;
			console.log(this.adjustment);
		});
  }

	initForm() {
		this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
	}

}
