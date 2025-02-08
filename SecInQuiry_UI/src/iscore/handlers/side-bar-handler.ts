import { ElementRef, QueryList } from "@angular/core";


export class SideBarHandler 
{
    NW_PLT_INPTS:QueryList<ElementRef>;
    NW_PLT_NUM_DIV:ElementRef;

    constructor(NW_PLT_INPTS:QueryList<ElementRef>, NW_PLT_NUM_DIV:ElementRef)
    {
        this.NW_PLT_INPTS = NW_PLT_INPTS;
        this.NW_PLT_NUM_DIV = NW_PLT_NUM_DIV;
    }

    /**
    * @function to handle paste functionality; by dividing the pasted value into (4) separated inputs;
    *                             First (3) inputs accepting the first characters
    *                              & last input accept the rest; with a condition that in the third input 
    *                                  any special characters (/\*&%$£!"~}) will be neglected...
    */
//#region 
__handle_NWPltNum_PasteFunctionality():void
{      
    this.NW_PLT_INPTS.forEach((input:any, index:any, arr:Array<any>)=>
        {
        input.nativeElement.addEventListener('input', (ev:any)=>
            {
            arr[index < 3  ? index + 1: index].nativeElement.focus(); 
            })
        })

    this.NW_PLT_NUM_DIV?.nativeElement.addEventListener('paste', ((ev:any)=>
    {
        const target = ev.target;

        ev.preventDefault();
    
        let paste = (ev.clipboardData || window.Clipboard).getData('text');
        
        paste = paste.replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g,'').replace(/[\u0660-\u0669\u06f0-\u06f9]/g,    // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
        function(a:any) { return a.charCodeAt(0) & 0xf })     // Remove the Unicode base(2) range that not match
        
        

        this.NW_PLT_INPTS.forEach((input:any, index:any) =>
        {

                input.nativeElement.focus();

                let remain  = "";

                input.nativeElement.value = paste[index];

                if(parseInt(paste[2]) >= 0)
                {
                    remain = paste[2];
                }
        
                if(index == 2 && parseInt(paste[index]) >= 0)
                {
                    
                    input.nativeElement.value = "";
                }
                else if(index == 3)
                {
                    input.nativeElement.value = remain + paste.slice(index);
                }
        })

        }))
}
//#endregion


/**
* @function to form and format vehilce number and replace some similar characters 
*              which might be written in different methods.
*                    like (ا) - (أ) / (ى) / (ي) ... 
* @Inputs extracted from the inheriting class @SideBarComponent 
* @returns a formatted value of vehicle number
*/
//#region 

protected formVehicleNumber():string
{
  let vehicleFullNumber:string = '';
  let indexOfNumber:number = 0;

  this.NW_PLT_INPTS.forEach((inpt)=>
  {
    vehicleFullNumber += inpt.nativeElement.value;
  })

  if (vehicleFullNumber.includes('ا') || vehicleFullNumber.includes('ى'))
  {
      vehicleFullNumber = vehicleFullNumber.replace('ا', 'أ').replace('ى', 'ي');
  }

  indexOfNumber = parseInt(vehicleFullNumber[2]) >= 0 ? 2:3;

 

  indexOfNumber = parseInt(vehicleFullNumber.slice(indexOfNumber, vehicleFullNumber.length));


  if (vehicleFullNumber.includes(indexOfNumber.toString()))
  {
    
    vehicleFullNumber = vehicleFullNumber.replace(indexOfNumber.toString(), '').split('').join(' ') + ' - ' + indexOfNumber.toString();
    //console.log(vehicleFullNumber);
    return vehicleFullNumber;
  }

  return '';
}
//#endregion

}
