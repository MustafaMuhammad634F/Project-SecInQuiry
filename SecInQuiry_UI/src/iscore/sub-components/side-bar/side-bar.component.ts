

import { AfterViewInit, Component, ElementRef, HostListener, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SideBarHandler } from '../../handlers/side-bar-handler';
import { InterComponentHandlerService } from '../../services/inter-component-handler.service';
import { SubmitCallbackService } from '../../services/submit-callback.service';

@Component({
  selector: 'iscore-side-bar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class Iscore_SideBarComponent extends SideBarHandler implements AfterViewInit
{
  @ViewChild('vclDivNW')   public override NW_PLT_NUM_DIV!:ElementRef;
  @ViewChildren('nwPltInpt')  public override NW_PLT_INPTS!:QueryList<ElementRef>;
  
  @ViewChild('chassisNum') CHASSIS_NUM!:ElementRef;
  @ViewChild('engNum') ENGINE_NUM!:ElementRef;
  @ViewChild('reqNum') REQUEST_NUM!:ElementRef;

  private transmittedData = inject(InterComponentHandlerService);
  private submitKeyCallbackReceiver = inject(SubmitCallbackService);

  
  constructor(NW_PLT_INPTS:QueryList<ElementRef>, NW_PLT_NUM_DIV:ElementRef)
  {
    super(NW_PLT_INPTS, NW_PLT_NUM_DIV);
  }

  ngAfterViewInit(): void 
  {
    this.__handle_NWPltNum_PasteFunctionality();
  }

  /**
 * @function for submit handling; and transmitting data into
 *                          API; and reflecting resultant data into the table.
 * @param event 
 */
  @HostListener('document:keydown.enter', ['$event'])
  protected onSubmitKeyPressedListener(event:KeyboardEvent)
  {
    this.transmitIscore_Data_to_API();
  }

  protected transmitIscore_Data_to_API()
  {
    this.transmittedData.transmitData
    (
      {
        'Vehicle_Num':this.formVehicleNumber(),
        'Request_Num': this.REQUEST_NUM.nativeElement.value,
        'Chassis_Num': this.CHASSIS_NUM.nativeElement.value,
        'Engine_Num': this.ENGINE_NUM.nativeElement.value       
      }
    );

  this.submitKeyCallbackReceiver.submitCallback();
    
  console.log("Document submitted successfully");

  }
  
}
