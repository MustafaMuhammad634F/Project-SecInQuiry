

import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpConnectionHandlerService } from '../../services/http-connection-handler.service';
import { IscoreModel } from '../../models/IscoreModel';
import { read } from 'node:fs';
import { InterComponentHandlerService } from '../../services/inter-component-handler.service';
import { SubmitCallbackService } from '../../services/submit-callback.service';
import { IscoreView } from '../../models/IscoreView';
import { Subscription } from 'rxjs';
import { TableHandler } from '../../handlers/table-handler';

type Dictionary = {
  [dict_key: string]: string|null;
};

@Component({
  selector: 'iscore-table',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class IscoreTableComponent extends TableHandler implements AfterViewInit, OnInit{

  @ViewChildren('matchProb', { emitDistinctChangesOnly: false }) unmatchedCarDataExpandable!:QueryList<ElementRef>;
  @ViewChildren('mainTableRow', { emitDistinctChangesOnly: false }) mainTableRows!:QueryList<ElementRef>;
  @ViewChild('noResult') noResult!:ElementRef;
  @ViewChild('httpConnError') httpError!:ElementRef;
  @ViewChild('tableBody') tableBody!:ElementRef;

  private httpResponse = inject(HttpConnectionHandlerService);
  private transmitHandler = inject(InterComponentHandlerService);
  private submitKeyReceiver = inject(SubmitCallbackService);

  private transitionedData!:Dictionary;
  private iscoreViewInstance!:IscoreView;

  matchingDataProb!:IscoreModel[];

  imgIllustrationObj!:any;

  count:number = 0;


  constructor(numberRows:ElementRef, private renderer: Renderer2)
  {
    super(numberRows);
  }

  ngOnInit(): void 
  {
    //throw new Error('Method not implemented.');
  }


  ngAfterViewInit(): void 
  {
      this.httpResponse.__extractFullData().subscribe(transmittedData=>
      {

          this.matchingDataProb = transmittedData;
          //this.element = this.unmatchedCarDataExpandable;

      })

      /*this.imgIllustrationObj = this.renderer.createElement('img');
      this.renderer.setAttribute(this.imgIllustrationObj, 'src', '/assets/question.png');*/

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
  
        this.iscoreViewInstance = {
                plateNum:this.transitionedData['Vehicle_Num'] === ''?null:this.transitionedData['Vehicle_Num'],
                lastReqNum:this.transitionedData['Request_Num'] === ''?null:this.transitionedData['Request_Num'],
                chassisNum:this.transitionedData['Chassis_Num'] === ''?null:this.transitionedData['Chassis_Num'],
                engineNum:this.transitionedData['Engine_Num'] === '' ? null:this.transitionedData['Engine_Num']
                                      }
  
         this.establishConnection(this.iscoreViewInstance);
        /**
         *                         pl:this.transitionedData['Vehicle_Num'] === ''?null : this.transitionedData['Vehicle_Num'], 
                        lastReqNum:this.transitionedData['Request_Num'] ===''?null : this.transitionedData['Car_Owner'],
                        person_entity_name:this.transitionedData['IP'] === '' ? null : this.transitionedData['IP'] ,
                        inquirer:this.transitionedData['Inquirer'] === '' ? null : this.transitionedData['Inquirer'],
                        trafficUnit:this.transitionedData['Traf_Unit'] === '' ? null : this.transitionedData['Traf_Unit'],
                        inqDate:this.transitionedData['Date_From'] === '' ? null : this.transitionedData['Date_From'],
                        inqDateTo:this.transitionedData['Date_To'] === '' ? null : this.transitionedData['Date_To']
         */
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
    
      var connection = this.httpResponse.__getFiltered_IscoreData(transitionedData).subscribe(
        interfaceFilteredData=>
                        {
                            
                            this.matchingDataProb = interfaceFilteredData;

                            this.httpError.nativeElement.style.display = 'none';

                            if(interfaceFilteredData.length != 0)
                            {
                              this.setApiExtractedData = interfaceFilteredData;
                              this.currentPage = 1;
                              this.updatePageTransition();
                              
                              this.tableBody.nativeElement.style.display = 'block';
                              this.noResult.nativeElement.style.display = 'none';
                            }
  
                            else
                            {
                              this.tableBody.nativeElement.style.display = 'none';
                              this.noResult.nativeElement.style.display = 'table';
                            }
  
                        }, error=>{
                          // transition-duration: 4s; transition-property: margin-right, color;"
                          this.httpError.nativeElement.style.display = 'block';
                      
                          this.renderer.setStyle(this.httpError.nativeElement, 'transition', 'all 5s ease-in-out');
                        });

  
                        
      return connection;

                      
  }
  //#endregion

  //#region 
  determineMatchedVehicleData(determinantMatched:boolean ,indxId:number): string
  {
    const elementRow = this.mainTableRows.get(indxId=indxId!=0?indxId-1:indxId);
    const unMatchedValue = this.unmatchedCarDataExpandable.get(indxId=indxId!=0?indxId-1:indxId);    

    if (determinantMatched)
    {
      return 'مطابقة'
    }
    else
    {
      if(unMatchedValue && this.matchingDataProb[indxId]['vehicle_Matching_Result'] === true)
      {
        this.renderer.appendChild(unMatchedValue.nativeElement, this.imgIllustrationObj);
      }

      if(elementRow)
      {
        this.renderer.setStyle(elementRow.nativeElement, 'background-color', '#ffc7ce');
        this.renderer.setStyle(elementRow.nativeElement, 'color', '#9c004e');
      }
      return 'غير مطابقة'
    }

  }
//#endregion
























  
//this.matchingDataProb[indxId]['vehicle_Matching_Result'] == true

  /**
   * References
   * ----------
   *    if (!this.mCarElement.nativeElement.querySelector('#newTh')) 
        { 
          const thEngineHeader = this.renderer.createElement('th'); 
          this.renderer.setAttribute(thEngineHeader, 'id', 'newTh'); 
          const thEngineHeaderText = this.renderer.createText('رقم الموتور'); 
          this.renderer.appendChild(thEngineHeader, thEngineHeaderText); 
          this.renderer.appendChild(this.mCarElement.nativeElement, thEngineHeader); 
          this.renderer.setStyle(thEngineHeader, 'backgroundColor', 'rgb(179, 173, 172)');
          this.renderer.setStyle(thEngineHeader, 'color', '#fff'); 

          const tdISCRElement = this.renderer.createElement('td');
          const tdISCRElementText = this.renderer.createText('ENJINE787945');
          this.renderer.appendChild(tdISCRElement, tdISCRElementText);
    
          this.iscrElement.nativeElement.appendChild(tdISCRElement);

          const tdTRFElement = this.renderer.createElement('td');
          const tdTRFElementText = this.renderer.createText('ENJINE787945');
          this.renderer.appendChild(tdTRFElement, tdTRFElementText);
    
          this.trfElement.nativeElement.appendChild(tdTRFElement);
      }
   * 
   */


    /**
     * 
      if (this.id.nativeElement.textContent === '2')
      {
          const defElement = this.renderer.createElement('td');
          const text = this.renderer.createText('Matched');

          this.renderer.appendChild(defElement, text);

          this.renderer.removeChild(this.expandableParent, this.elementsChild.get(1)?.nativeElement);
          this.renderer.appendChild(this.expandableParent.nativeElement, defElement);

          this.renderer.listen(this.expandableParent.nativeElement, 'mouseenter', ()=>
          {
            this.renderer.setStyle(this.expandableParent.nativeElement, 'background-color', '#AFE1AF');
          })
          this.renderer.listen(this.expandableParent.nativeElement, 'mouseleave', () =>
          {
            this.renderer.removeStyle(this.expandableParent.nativeElement, 'background-color');
          })
      }
      */


      /*
          this.unmatchedCarDataExpandable.forEach((element)=>
          {
            this.renderer.setProperty(element, 'innerHTML', '+');
    
            element.nativeElement.addEventListener('click', () =>
            {
              element.nativeElement

              const expandedContent = element.nativeElement.closest('tr').nextElementSibling;
    
              if(expandedContent.style.display === 'none' || !expandedContent.style.display)
              {
                expandedContent.style.display = 'table'; 
                element.nativeElement.textContent = '-';
              }
              else
              {
                expandedContent.style.display = 'none'; 
                element.nativeElement.textContent = '+';
              }
      
            });
          });
      */
  
}
