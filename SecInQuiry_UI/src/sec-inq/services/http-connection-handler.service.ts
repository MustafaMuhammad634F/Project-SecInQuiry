
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {catchError, map, Observable, OperatorFunction, retry, throwError} from 'rxjs'
import { SecInqDataModel } from '../models/SecInqModel';
import { SecInqDataView } from '../models/SecInqView';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionHandlerService {

  private baseURL = 'http://192.168.235.55';

  constructor(private http:HttpClient) { }

  
  /**
   * @function for testing retrieving full data from @api_get request.
   * @returns : entire data recorded on the database that correlated with the interface data model.
   */
  //#region 
  __extractAPI_Data():Observable<SecInqDataModel[]>
  {
    return this.http.get<SecInqDataModel[]>(`${this.baseURL}/secInQReponse`)
  }
//#endregion

  /**
   * @function post method to create a filtered request for extracting specific data.
   * @param secInqData : filtered data extracted from sidebar inputs 
   * @returns : post method with main parameters to search with.
   */
  //#region 
  __getFiltered_secInqData(secInqData: SecInqDataView):Observable<any>
  {

    //const requestHeader = {'content-type': 'application/json'};

    const requestHeader = new HttpHeaders({'content-type': 'application/json',     
      'Cache-Control': 'no-cache',  'Pragma': 'no-cache'})

    const requestBody = JSON.stringify(secInqData);
    
    return this.http.post<SecInqDataView>(this.baseURL + '/SecInQ_ISCR/secInQFilteredData', 
            requestBody, {'headers': requestHeader}).pipe( 
                  catchError(this.catchHTTP_Error), retry(1));
      //catchError(this.catchHTTP_Error),retry(1)
  }

__getConnectionStatus():Observable<any>
{
  return this.http.get<boolean>(`${this.baseURL}/confirmConnected`)
}
  /**
   * @function for handling and catching the related error that might be thrown 
   *                      while attempting establishing a new connection link.
   * @param error 
   * @returns 
   */
  catchHTTP_Error(error:HttpErrorResponse)
  {
    if(error.status === 0)
    {
      console.error("HTTP connection returned with an error", error.error);
    }
    else
    {
      console.error(error.status);
    }
    return throwError(()=>new Error("Something occurred; Try Again later"))
  }
//#endregion


}
