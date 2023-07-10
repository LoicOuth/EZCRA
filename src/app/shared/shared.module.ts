import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { StepFooterComponent } from '../presentation/components/step-footer/step-footer.component';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from '../presentation/components/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';



@NgModule({
  declarations: [StepFooterComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    InputSwitchModule,
    CalendarModule,
    ToastModule,
    StepsModule,
    ProgressSpinnerModule,
    DialogModule,
    TreeModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    InputSwitchModule,
    CalendarModule,
    ToastModule,
    StepsModule,
    ProgressSpinnerModule,
    DialogModule,
    TreeModule,

    //components
    StepFooterComponent,
    LoaderComponent
  ],
  providers: [MessageService]
})
export class SharedModule { }
