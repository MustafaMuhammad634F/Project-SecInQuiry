

import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet , RouterModule, RouterConfigOptions, ROUTER_CONFIGURATION} from '@angular/router';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input'
import {MatAutocompleteModule, MatOption} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

import { SecInQ_SideBarComponent } from "../sec-inq/sub-components/side-bar/side-bar.component";
import { Iscore_SideBarComponent } from "../iscore/sub-components/side-bar/side-bar.component";

import { SecInQTableComponent } from "../sec-inq/sub-components/table/table.component";
import { IscoreTableComponent } from "../iscore/sub-components/table/table.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatFormFieldModule, MatSelect, MatOption, SecInQTableComponent, SecInQ_SideBarComponent, Iscore_SideBarComponent, IscoreTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit{
  
  title = 'Portal_UI';

  @ViewChild('searchTypeOption') searchOpts!:MatSelect;


  @ViewChild('secInQSideBar') secInQSideBar!:ElementRef;
  @ViewChild('iscoreSideBar') iscoreSideBar!:ElementRef;


  constructor(private renderer:Renderer2)
  {

  }
  ngAfterViewInit(): void 
  {
    this.searchOpts.valueChange.subscribe(value=>
      {
         if (value == 1)
         {
          this.renderer.setStyle(this.secInQSideBar.nativeElement, 'display', 'block');
          //this.renderer.setStyle(this.iscoreSideBar.nativeElement, 'display', 'none');
         }
         else if(value == 2)
         {
          //this.renderer.setStyle(this.iscoreSideBar.nativeElement, 'display', 'block');
          this.renderer.setStyle(this.secInQSideBar.nativeElement, 'display', 'none');
         }
      })
  }
}
