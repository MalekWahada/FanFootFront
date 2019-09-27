import { NgModule } from '@angular/core';
import { MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatRippleModule, MatSlideToggleModule, MatSliderModule, MatSliderChange } from '@angular/material';
const MaterialComponenet=[  
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSliderModule,
  MatSlideToggleModule,
  
]

@NgModule({
 
  imports: [MaterialComponenet],
  exports:[MaterialComponenet],
})
export class MaterialModule { }
