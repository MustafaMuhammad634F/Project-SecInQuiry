

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitCallbackService {

  private submitKey = new Subject<void>();
  onSubmit = this.submitKey.asObservable();
  
  constructor() { }

  submitCallback()
  {
    this.submitKey.next();
  }
  
}
