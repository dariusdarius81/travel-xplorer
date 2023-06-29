import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzIconModule,
    NzNotificationModule,
    NzTableModule,
    NzPaginationModule,
    NzRateModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,

  ],
  
})
export class TripsModule { }
