

import { Component, AfterViewInit, OnInit, ElementRef,  QueryList, 
  ViewChild, ViewChildren, ChangeDetectionStrategy, ViewEncapsulation,
  Inject,
  Injectable,
  inject,
  HostListener,
  Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule, NgForm, FormControl,
ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms'

import {AsyncPipe, DatePipe, NgFor, NgForOf, NgIf} from '@angular/common';

import {async, Observable, Subscribable,of} from 'rxjs';
import {map, startWith, TimeoutConfig} from 'rxjs/operators'

import {GovsTrafs} from '../../../externals/Govs_TrafficUnits'

import { InterComponentDataTransmissionService } from '../../services/inter-component-data-transmission.service';
import { SubmitCallbackService } from '../../services/submit-callback.service';

import { SidebarHandler } from '../../handlers/sidebar-handler';

import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input'
import {MatAutocompleteModule, MatOption} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { stringify } from 'node:querystring';
import { HttpConnectionHandlerService } from '../../services/http-connection-handler.service';

@Component({
  selector: 'secInQ-side-bar',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgFor,
    ReactiveFormsModule,
    MatAutocompleteModule, MatInputModule, 
    MatFormFieldModule, 
     MatSelectModule, MatDatepickerModule, 
     MatIconModule, MatButtonModule],

  providers: [provideNativeDateAdapter(), DatePipe, QueryList<ElementRef>],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,   

  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})


export class SecInQ_SideBarComponent extends SidebarHandler implements OnInit, AfterViewInit 
{
  @ViewChild('vclDivNW')   public override NW_PLT_NUM_DIV!:ElementRef;
  @ViewChildren('nwPltInpt')  public override NW_PLT_INPTS!:QueryList<ElementRef>;
  @ViewChild('nwPltBtn')  public override NW_PLT_BTN!:ElementRef;
  @ViewChild('vclDivOLD')  public override OLD_PLT_NUM_DIV!:ElementRef;
  @ViewChild('oldPltInpt')  public override OLD_PLT_INPT!:ElementRef;
  @ViewChild('oldPltBtn')  public override OLD_PLT_BTN!:ElementRef;
  @ViewChild('crOwn')  CAR_OWNER!:ElementRef;
  @ViewChild('ipAddr')  IP_ADDRESS!:ElementRef;
  @ViewChild('inqr')  INQUIRER!:ElementRef;
  @ViewChild('govInpt')  GOV_INPUT!:ElementRef;
  @ViewChild('trfInpt')  TRAFFIC_INPUT!:ElementRef;
  @ViewChild('strtDt')  START_DATE!:ElementRef;
  @ViewChild('endDt')  END_DATE!:ElementRef;
  @ViewChild('appStatus', {static: true}) appStatus!:ElementRef;
  
  private httpResponse = inject(HttpConnectionHandlerService);
  private dateAdapter = inject(DateAdapter<Date>);
  private transmitHandler = inject(InterComponentDataTransmissionService);
  private submitKeyCallbackReceiver = inject(SubmitCallbackService);
  private selectedGov!:string;
  private trfUnitOptionsDependency!:string[];

  protected govSelectedControl = new FormControl('');
  protected trfUntSelectControl = new FormControl('');

  protected govFilteredOptions!:Observable<string[]>;
  protected trfUntOptions!:Observable<string[]>;
  protected trfUntFilteredOptions!:Observable<string[]>;
  protected trfUntFilteredOptions_!:Observable<string[]>;

  protected govTrfUnt_Corr = new GovsTrafs();
  protected vehicleFullNumber!:string;

  protected dateRangeForm = new FormGroup(
    {
      startDate: new FormControl<Date | null>(null),
      endDate:new FormControl<Date|null>(null),
    });

  constructor(NW_PLT_NUM_DIV:ElementRef, NW_PLT_INPTS: QueryList<ElementRef>, NW_PLT_BTN: ElementRef, OLD_PLT_NUM_DIV: ElementRef, 
    OLD_PLT_INPT: ElementRef, OLD_PLT_BTN: ElementRef, private renderer:Renderer2)
  {
    super(NW_PLT_NUM_DIV, NW_PLT_INPTS, NW_PLT_BTN, OLD_PLT_NUM_DIV, OLD_PLT_INPT, OLD_PLT_BTN);

    //this.NW_PLT_INPTS = NW_PLT_INPTS;

    //this.dateAdapter.setLocale('ar');
  }



    ngOnInit(): void 
    {
      
      this.govFilteredOptions = this.govSelectedControl.valueChanges.pipe
      (
        startWith(''),
        map(value => this.govSelectFilter_(value || '', GovsTrafs.governorates)) 
      );


      /*this.trfUntOptions = this.govSelectedControl.valueChanges.pipe
      (
        startWith(''),
        map(value => this.trfUntSelectFilter_(value || ''))
      );*/
      
      this.govSelectedControl.valueChanges.subscribe
      (value=>
        {
          this.trfUntFilteredOptions = of(this.getTrfUnt(value!));
          this.trfUntFilteredOptions = this.trfUntSelectControl.valueChanges.pipe
          (
            startWith(''),
            map(value => 
                this.trfUntSelectFilter_(value!)))
        }
      );


    }



    ngAfterViewInit(): void 
    {
      this.__handle_NWPltNum_PasteFunctionality();
      this.__handleMouseClicks();
      this.httpResponse.__getConnectionStatus().subscribe(
        (connStatus)=>
        {

          if(connStatus == true)
            {

              const statusFlashInterval = setInterval(()=>
              {
                this.renderer.setStyle(this.appStatus.nativeElement, 
                  'animation', 'flashing 1000ms infinite');
              }, 5000)

              setTimeout(()=>
              {
                clearInterval(statusFlashInterval);
                this.renderer.setStyle(this.appStatus.nativeElement, 
                                  'animation', 'flashing 1s');
                    this.renderer.setStyle(
                      this.appStatus.nativeElement, 
                                  'background-color', 'green');
              }, 10000);

            }
        });

    }



    //#region 
    private govSelectFilter_(value:string, options:string[]):string[]
    {
      this.selectedGov = value;
      return options.filter
      (option => 
          option.includes(value)
        );
    }
  
    private trfUntSelectFilter_(trfUnt:string):string[]
    {
      var selectedGovValue  = this.govSelectedControl.value!;
      console.log(selectedGovValue);
      var trfUnitsOpts =  GovsTrafs.trafficUnits[selectedGovValue] || [];
      return trfUnitsOpts.filter(option => option.includes(trfUnt));
    }



    private getTrfUnt(value:string):string[]
    {
      this.selectedGov = value;
      return GovsTrafs.trafficUnits[value];
    }


  
    protected onGovInputClicked()
    {
      this.TRAFFIC_INPUT.nativeElement.value = '';
    }
  //#endregion



  /**
 * @function for submit handling; and transmitting data into
 *                          API; and reflecting resultant data into the table.
 * @param event 
 */
@HostListener('document:keydown.enter', ['$event'])
protected onSubmitKeyPressedListener(event:KeyboardEvent)
{
  this.transmitSecInQ_Data_to_secInQTableComp();
}


protected transmitSecInQ_Data_to_secInQTableComp()
{
    this.transmitHandler.transmitData
    (
      {
        'Vehicle_Num':this.formVehicleNumber(),
        'Car_Owner': this.CAR_OWNER.nativeElement.value,
        'IP': this.IP_ADDRESS.nativeElement.value,
        'Inquirer': this.INQUIRER.nativeElement.value,
        'Traf_Unit': this.TRAFFIC_INPUT.nativeElement.value,
        'Date_From': this.START_DATE.nativeElement.value,
        'Date_To': this.END_DATE.nativeElement.value,
        'loading-line':this.showDbLoadingLine()
      }
    );

  this.submitKeyCallbackReceiver.submitCallback();

  console.log("Document submitted successfully");

}

protected resetDate()
{
  this.dateRangeForm.reset();
}

}
