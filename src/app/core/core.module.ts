import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionHeaderComponent } from './section-header/section-header.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerModule
  ]
})
export class CoreModule { }
