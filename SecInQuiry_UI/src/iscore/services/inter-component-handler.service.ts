

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Dictionary = {
  [dict_key: string]: string;
};
@Injectable({
  providedIn: 'root'
})
export class InterComponentHandlerService {
  
  private transmittableData = new BehaviorSubject<Dictionary>({'': ''});
  currentData = this.transmittableData.asObservable();

  constructor() { }

  transmitData(data:Dictionary)
  {
    this.transmittableData.next(data);
  }
}
