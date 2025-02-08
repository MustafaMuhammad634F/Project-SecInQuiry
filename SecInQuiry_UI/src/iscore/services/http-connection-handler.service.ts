


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IscoreModel } from '../models/IscoreModel';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IscoreView } from '../models/IscoreView';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectionHandlerService {

  private baseURL = 'https://localhost:7117';

  constructor(private http: HttpClient) { }

  __extractFullData():Observable<IscoreModel[]>
  {
    return this.http.get<IscoreModel[]>(`${this.baseURL}/iscoreAllData`, {headers: {'rejectUnauthorized': 'false'}})
  }

    /**
   * @function post method to create a filtered request for extracting specific data.
   * @param secInqData : filtered data extracted from sidebar inputs 
   * @returns : post method with main parameters to search with.
   */
  //#region 
  __getFiltered_IscoreData(iscoreData: IscoreView):Observable<any>
  {

    //const requestHeader = {'content-type': 'application/json'};

    const requestHeader = new HttpHeaders({'content-type': 'application/json',     
                                                                                      'Cache-Control': 'no-cache',  'Pragma': 'no-cache'})

    const requestBody = JSON.stringify(iscoreData);
    
    return this.http.post<IscoreView>(this.baseURL + '/iscoreFilteredData', 
            requestBody, {'headers': requestHeader}).pipe(map((response)=> console.log("Connection interrupted with response " + response)), 
                  catchError(this.catchHTTP_Error), retry(1));
      //catchError(this.catchHTTP_Error),retry(1)
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
