
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator'
import {NgFor, NgForOf, NgIf} from '@angular/common';
import { Observable, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpConnectionHandlerService } from '../../services/http-connection-handler.service';
import { InterComponentDataTransmissionService } from '../../services/inter-component-data-transmission.service';
import { SubmitCallbackService } from '../../services/submit-callback.service';

import { SecInqDataModel } from '../../models/SecInqModel';
import {SecInqDataView} from '../../models/SecInqView'
import { TableHandler } from '../../handlers/table-handler';
import { error } from 'node:console';

type Dictionary = {
  [dict_key: string]: string|null;
};

@Component({
  selector: 'secInQ-table',
  standalone: true,
  imports: [MatButtonModule, MatPaginatorModule, NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class SecInQTableComponent extends TableHandler implements AfterViewInit
{
  @ViewChild('tableBody') tableBody!:ElementRef;
  @ViewChild('pagination', {static:true}) pagination!:ElementRef;
  @ViewChildren('pgntionBtns', { emitDistinctChangesOnly: false }) pagButtons!:QueryList<ElementRef>;
  @ViewChild('numRows') override numberRows!:ElementRef;
  @ViewChild('noResult') noResult!:ElementRef;
  @ViewChild('httpConnError') httpError!:ElementRef;
  @ViewChild('dbLoading') databaseLoadingLine!:ElementRef;
  @ViewChild('refreshButtonDiv') refreshButtonDiv!:ElementRef;

  private httpResponse = inject(HttpConnectionHandlerService);
  private transmitHandler = inject(InterComponentDataTransmissionService);
  private submitKeyReceiver = inject(SubmitCallbackService);



  protected  extracted_secInqFilteredData:SecInqDataModel[] = [];
  private secInqDataViewInstance!:SecInqDataView;
  private transitionedData!:Dictionary;

  
  constructor(numberRows:ElementRef, private renderer:Renderer2)
  {
    super(numberRows);
  }


  ngAfterViewInit(): void 
  {
    //#region 
    /**
     * @lambda_function for receiving submit button pressing notification.
     */
    this.submitKeyReceiver.onSubmit.subscribe(()=>
      {
  
        /**
         * @lambda_function for extracting data from #sideBar Component.
         */
        this.transmitHandler.currentData.subscribe(data => this.transitionedData = data);

        let date_from_local = this.transitionedData['Date_From']!.length !== 0 ? new Date(this.transitionedData['Date_From']!): null;
		
		let date_to_local = this.transitionedData['Date_From']!.length !== 0 ? new Date(
				this.transitionedData['Date_To']!) : null;
		
		let isoDateFrom;
		let isoDateTo;
		
		//console.log(this.transitionedData['Date_From']!.length);
		
		if(date_from_local !== null && date_to_local !== null)
		{
		    date_from_local.setTime(date_from_local.getTime()+2*60*60*1000);
			console.log(date_from_local);
			
			isoDateFrom = date_from_local.toISOString();
			
			date_to_local.setTime(date_to_local.getTime()+2*60*60*1000);
			
			isoDateTo = date_to_local.toISOString();
		}
			
		
		else
		{
			isoDateFrom = null;
			isoDateTo = null;
		}


        this.secInqDataViewInstance = {
                                        plateNum:this.transitionedData['Vehicle_Num'] === ''?null : this.transitionedData['Vehicle_Num'], 
                                        ownerName:this.transitionedData['Car_Owner'] ===''?null : this.transitionedData['Car_Owner'],
                                        ip:this.transitionedData['IP'] === '' ? null : this.transitionedData['IP'] ,
                                        inquirerName:this.transitionedData['Inquirer'] === '' ? null : this.transitionedData['Inquirer'],
                                        trfUnit:this.transitionedData['Traf_Unit'] === '' ? null : this.transitionedData['Traf_Unit'],
                                        date_from: this.transitionedData['Date_From'] === '' ? null : isoDateFrom,
                                        date_to:this.transitionedData['Date_To'] === '' ? null : isoDateTo
                                      }
                                      if(this.transitionedData['loading-line'] !== null)
                                      {
                                        this.databaseLoadingLine.nativeElement.style.display = 'table-row';
                                      }
         this.establishConnection(this.secInqDataViewInstance);
		/*
		this.transitionedData['Date_From']!==null?'':this.		
			transitionedData['Date_From']!
		**/
		
		/**
		new Date(this.transitionedData['Date_From']!).toISOString()
		*/
		console.log("Log#88 TableComponent");
		
		console.log(this.transitionedData['Date_From']?.length);
			
         
      })
      //#endregion
  }

  

/**
 * @function to define new connection pipe; for connecting to 
 *                            C# .net API through out the inner Connection service.
 *                            
 * @param transitionedData 
 * @returns 
 */
  //#region 
  establishConnection(transitionedData:any):Subscription | null
  {
    
      var connection = this.httpResponse.__getFiltered_secInqData(transitionedData).subscribe(
        interfaceFilteredData=>
                        {
                            
                            this.extracted_secInqFilteredData = interfaceFilteredData;

                            this.httpError.nativeElement.style.display = 'none';

                            if(this.extracted_secInqFilteredData.length != 0)
                            {
                              this.setApiExtractedData = this.extracted_secInqFilteredData;

                              this.currentPage = 1;
                              
                              console.log(this.pagButtons);

                              this.updatePageTransition();

                              this.tableBody.nativeElement.style.display = 'block';
                              this.noResult.nativeElement.style.display = 'none';
                              this.databaseLoadingLine.nativeElement.style.display = 'none';
                              this.httpError.nativeElement.style.display = 'none';
                              this.pagination.nativeElement.style.display = 'block';

                              /*setTimeout(()=>
                                {
                                  this.renderer.setStyle(this.refreshButtonDiv.nativeElement, 'width', '100px');
                                }, 1000)*/
                            }
  
                            else
                            {
                              this.databaseLoadingLine.nativeElement.style.display = 'none';
                              this.tableBody.nativeElement.style.display = 'none';
                              this.noResult.nativeElement.style.display = 'block';
                              this.httpError.nativeElement.style.display = 'none';
                              this.pagination.nativeElement.style.display = 'none';
                            }
  
                        }, error=>{
                          
                          this.httpError.nativeElement.style.display = 'block';

                          this.databaseLoadingLine.nativeElement.style.display = 'none';

                          console.log(error);

                          this.pagination.nativeElement.style.display = 'none';
                        });

  
                        
      return connection;

                      
  }
  //#endregion

}
