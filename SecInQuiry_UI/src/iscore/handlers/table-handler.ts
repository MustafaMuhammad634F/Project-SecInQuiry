import { ElementRef } from "@angular/core";
import { IscoreModel } from "../models/IscoreModel";


export class TableHandler 
{
      
    protected pages:number[] = [];
    protected segmentedData:any[] = [];
    protected currentPage:number = 1;
    protected rowsPerPage:number = 20;

    protected extracted_FilteredData:IscoreModel[] = this.getApiExtractedData;
    numberRows:ElementRef;

     constructor(numberRows:ElementRef)
    {
        //this.extracted_FilteredData = extracted_FilteredData;
        this.numberRows = numberRows;
    }


    set setCurrentPage (page:any)
    {
      this.currentPage = page;
    }

    get getCurrentPage()
    {
      return this.currentPage;
    }

//#region 
    set setApiExtractedData(data:any)
    {
        this.extracted_FilteredData = data;
    }

    get getApiExtractedData()
    {
        return this.extracted_FilteredData;
    }
//#endregion





//#region 
    /**
     * @function for segmenting data into determined size chunks; to be then 
     *              displayed to the user separated into number of pages depending on
     *              the length of data and the selected number of rows.
     */

    segmentData()
    {
      const start = (this.currentPage - 1)*20;
      const end = start + this.rowsPerPage;
      this.segmentedData = this.extracted_FilteredData.slice(start, end);
    }
//#endregion


    /**
     * @function for updating each page data depending on the selected number of rows
     *                          and data length; whether backward, forward or to a specific page.
     */

  //#region 
  updatePageTransition()
  {
    const totalRows = this.extracted_FilteredData.length;
    const totalPages = Math.ceil(totalRows/this.rowsPerPage);
    this.pages = Array.from({length:totalPages}, (vr,i)=>i+1);
    this.segmentData();
  }
  //#endregion


//#region 
    /**
     * @function for changing data for each transitioning whether backward or forward.
     * @param event : transitioning event
     */
    changeDataPerTransition(event:Event)
    {
      this.currentPage = parseInt((event.target as HTMLSelectElement).value);
      this.currentPage = 1;
      this.updatePageTransition();
    }
//#endregion



//#region 
    /**
     * @function for transitioning to a specific page.
     * @param page 
     */
    __transitionToSpecificPage(page:number)
    {
      this.setCurrentPage = page;
      this.segmentData();
    }
//#endregion





//#region 
    transitionBackToPage()
    {
      if(this.currentPage > 1)
      {
        this.currentPage--;
        this.segmentData();
      }
    }
//#endregion






//#region 
    transitionForwardToPage()
    {
      if(this.currentPage < this.pages.length)
      {
        this.currentPage++;
        this.segmentData();
      }
    }
//#endregion



//#region 
    protected returnFullDate(data:any)
    {
      return new Date(data).toLocaleTimeString('ar-EG',
        {
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: 'numeric', minute: 'numeric', second:'numeric'
        })
    }
//#endregion
}
