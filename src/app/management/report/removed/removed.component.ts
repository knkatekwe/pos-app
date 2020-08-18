import { Component, OnInit, ViewChild } from '@angular/core';
import { AdjustmentService } from 'src/app/core/services/adjustment.service';
import { Adjustment } from 'src/app/core/models/adjustment';

@Component({
  selector: 'app-removed',
  templateUrl: './removed.component.html',
  styleUrls: ['./removed.component.css']
})
export class RemovedComponent implements OnInit {

  adjustment: Array<Adjustment> = [];
  adjustmentDetail: Adjustment;
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  @ViewChild('tblAdjustment', {static: false}) table: any;
  dataTable: any;

  constructor(private adjustmentService: AdjustmentService) { }

  ngOnInit() {
    this.loadAllAdjustment();

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

  loadAllAdjustment(){
    this.adjustmentService.getAllAdjustment().subscribe(
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

}
