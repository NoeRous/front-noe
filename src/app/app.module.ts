import { NgModule, CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { HeaderComponent } from './template/header/header.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PagePostulationComponent } from './pages/page-postulation/page-postulation.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterPersonComponent } from './pages/page-register-person/page-register-person.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './template/admin/admin.component';
import { AuthComponent } from './template/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { AuthService } from './auth.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { httpInterceptorProviders } from './http-interceptors';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import { PageFormPostulationComponent } from './pages/page-postulation/page-form-postulation/page-form-postulation.component';
import { PageAnnouncementComponent } from './pages/page-announcement/page-announcement.component';
import { PageFormAnnounmentComponent } from './pages/page-announcement/page-form-announment/page-form-announment.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { DialogConfirmComponent } from './share/dialog-confirm/dialog-confirm.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageInstitutionTypeComponent } from './pages/page-institution-type/page-institution-type.component';
import { PageInstitutionComponent } from './pages/page-institution/page-institution.component';
import { PagePositionComponent } from './pages/page-position/page-position.component';
import { PageInstitutionPositionComponent } from './pages/page-institution-position/page-institution-position.component';
import { PageFormInstitutionPositionComponent } from './pages/page-institution-position/page-form-institution-position/page-form-institution-position.component';
import { PageAnnouncementInstitutionPositionComponent } from './pages/page-announcement-institution-position/page-announcement-institution-position.component';
import { PageFormAnnouncementInstitutionPositionComponent } from './pages/page-announcement-institution-position/page-form-announcement-institution-position/page-form-announcement-institution-position.component';
import { PagePositionTypeComponent } from './pages/page-position-type/page-position-type.component';
import { PageFormPositionTypeComponent } from './pages/page-position-type/page-form-position-type/page-form-position-type.component';
import { PageQuestionCategoryComponent } from './pages/page-question-category/page-question-category.component';
import { PageFormQuestionCategoryComponent } from './pages/page-question-category/page-form-question-category/page-form-question-category.component';
import { PageQuestionComponent } from './pages/page-question/page-question.component';
import { PageFormQuestionComponent } from './pages/page-question/page-form-question/page-form-question.component';
import { PageQuestionResponseComponent } from './pages/page-question-response/page-question-response.component';
import { PageFormQuestionResponseComponent } from './pages/page-question-response/page-form-question-response/page-form-question-response.component';
import { PageTestComponent } from './pages/page-test/page-test.component';
import { PageFormTestComponent } from './pages/page-test/page-form-test/page-form-test.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PageTestGroupComponent } from './pages/page-test-group/page-test-group.component';
import { PageFormTestGroupComponent } from './pages/page-test-group/page-form-test-group/page-form-test-group.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptorService } from './tools/loader-interceptor.service';
import { PagePersonComponent } from './pages/page-person/page-person.component';
import { PagePostulationTestComponent } from './pages/page-postulation-test/page-postulation-test.component';
import { PageFormPostulationTestComponent } from './pages/page-postulation-test/page-form-postulation-test/page-form-postulation-test.component';
import { CardAnnouncementComponent } from './pages/page-announcement/card-announcement/card-announcement.component';
import { DialogFormQuestionComponent } from './pages/page-question/dialog-form-question/dialog-form-question.component';
import { DialogFormQuestionResponseComponent } from './pages/page-question-response/dialog-form-question-response/dialog-form-question-response.component';
import { CompFormQuestionResponseComponent } from './pages/page-question-response/comp-form-question-response/comp-form-question-response.component';
import { PageShowPostulationTestComponent } from './pages/page-postulation-test/page-show-postulation-test/page-show-postulation-test.component';
import { PageTestGroupQuestionComponent } from './pages/page-test-group-question/page-test-group-question.component';
import { DialogListResponseComponent } from './pages/page-question-response/dialog-list-response/dialog-list-response.component';
import { DialogUserRolesComponent } from './pages/page-user/dialog-user-roles/dialog-user-roles.component';
import { PageRoleComponent } from './pages/page-role/page-role.component';
import { PageInboxComponent } from './pages/page-inbox/page-inbox.component';
import { PageRoleMenuComponent } from './pages/page-role-menu/page-role-menu.component';
import { PageMenuComponent } from './pages/page-menu/page-menu.component';
import { CompRoleComponent } from './pages/page-role/comp-role/comp-role.component';
import { CompMenuComponent } from './pages/page-menu/comp-menu/comp-menu.component';
import { PageTrackingComponent } from './pages/page-tracking/page-tracking.component';
import { DialogFormRoleComponent } from './pages/page-role/dialog-form-role/dialog-form-role.component';
import { DialogFormMenuComponent } from './pages/page-menu/dialog-form-menu/dialog-form-menu.component';
import { CompListSubMenuComponent } from './pages/page-menu/comp-list-sub-menu/comp-list-sub-menu.component';
import { DialogFormSubMenuComponent } from './pages/page-menu/dialog-form-sub-menu/dialog-form-sub-menu.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageShowDetailsTrackingComponent } from './pages/page-tracking/page-show-details-tracking/page-show-details-tracking.component';
import { PageShowDetailsPostulationComponent } from './pages/page-postulation/page-show-details-postulation/page-show-details-postulation.component';
import { VerifyMenuPipe } from './tools/pipes/verify-menu.pipe';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule  } from 'primeng/selectbutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

import { FilterGroupPipe } from './tools/pipes/filter-group.pipe';
import { VerifyGroupPipe } from './tools/pipes/verify-group.pipe';
import { DialogDerivedInboxComponent } from './pages/page-inbox/dialog-derived-inbox/dialog-derived-inbox.component';
import { PageFormUserComponent } from './pages/page-user/page-form-user/page-form-user.component';
import { DialogUserInstitutionsComponent } from './pages/page-user/dialog-user-institutions/dialog-user-institutions.component';
import { PageEmployeeComponent } from './pages/page-employee/page-employee.component';
import { DialogEmployeeInstitutionsComponent } from './pages/page-employee/dialog-employee-institutions/dialog-employee-institutions.component';
import { DialogUserPasswordComponent } from './pages/page-user/dialog-user-password/dialog-user-password.component';
import { PageCommissionComponent } from './pages/page-commission/page-commission.component';
import { PageCommissionMembersComponent } from './pages/page-commission/page-commission-members/page-commission-members.component';
import { PageCommissionMembersIntComponent } from './pages/page-commission/page-commission-members-int/page-commission-members-int.component';
import { PageCommissionMembersExtComponent } from './pages/page-commission/page-commission-members-ext/page-commission-members-ext.component';
import { PageFormRepresentativeComponent } from './pages/page-commission/page-form-representative/page-form-representative.component';
import { PageCommissionAssignedComponent } from './pages/page-commission/page-commission-assigned/page-commission-assigned.component';
import { DialogFormCommissionAssignedComponent } from './pages/page-commission/dialog-form-commission-assigned/dialog-form-commission-assigned.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    PageDashboardComponent,
    PagePostulationComponent,
    PageLoginComponent,
    PageRegisterPersonComponent,

    PageNotFoundComponent,
    AdminComponent,
    AuthComponent,
    MessagesComponent,
    
    PageFormPostulationComponent,
          PageAnnouncementComponent,
          PageFormAnnounmentComponent,
          DialogConfirmComponent,
          PageUserComponent,
          PageProfileComponent,
          PageInstitutionTypeComponent,
          PageInstitutionComponent,
          PagePositionComponent,
          PageInstitutionPositionComponent,
          PageFormInstitutionPositionComponent,
          PageAnnouncementInstitutionPositionComponent,
          PageFormAnnouncementInstitutionPositionComponent,
          PagePositionTypeComponent,
          PageFormPositionTypeComponent,
          PageQuestionCategoryComponent,
          PageFormQuestionCategoryComponent,
          PageQuestionComponent,
          PageFormQuestionComponent,
          PageQuestionResponseComponent,
          PageFormQuestionResponseComponent,
          PageTestComponent,
          PageFormTestComponent,
          PageTestGroupComponent,
          PageFormTestGroupComponent,
          PagePersonComponent,
          PagePostulationTestComponent,
          PageFormPostulationTestComponent,
          CardAnnouncementComponent,
          DialogFormQuestionComponent,
          DialogFormQuestionResponseComponent,
          CompFormQuestionResponseComponent,
          PageShowPostulationTestComponent,
          PageTestGroupQuestionComponent,
          DialogListResponseComponent,
          DialogUserRolesComponent,
          PageRoleComponent,
          PageInboxComponent,
          PageRoleMenuComponent,
          PageMenuComponent,
          CompRoleComponent,
          CompMenuComponent,
          PageTrackingComponent,
          DialogFormRoleComponent,
          DialogFormMenuComponent,
          CompListSubMenuComponent,
          DialogFormSubMenuComponent,
          PageShowDetailsTrackingComponent,
          PageShowDetailsPostulationComponent,
          VerifyMenuPipe,
          FilterGroupPipe,
          VerifyGroupPipe,
          DialogDerivedInboxComponent,
          PageFormUserComponent,
          DialogUserInstitutionsComponent,
          PageEmployeeComponent,
          DialogEmployeeInstitutionsComponent,
          DialogUserPasswordComponent,
          PageCommissionComponent,
          PageCommissionMembersComponent,
          PageCommissionMembersIntComponent,
          PageCommissionMembersExtComponent,
          PageFormRepresentativeComponent,
          PageCommissionAssignedComponent,
          DialogFormCommissionAssignedComponent,
          
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    FormsModule,
    MatTooltipModule,
    MatTableModule, 
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    MatMenuModule,
    MatRadioModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,

    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),

    TableModule,
    ButtonModule,
    SelectButtonModule,
    TreeSelectModule,
    InputTextModule,
    TagModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es' }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
