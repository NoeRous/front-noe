import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PagePostulationComponent } from './pages/page-postulation/page-postulation.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterPersonComponent } from './pages/page-register-person/page-register-person.component';
import { NotFoundError } from 'rxjs';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './template/admin/admin.component';
import { AuthComponent } from './template/auth/auth.component';
import { PageFormPostulationComponent } from './pages/page-postulation/page-form-postulation/page-form-postulation.component';
import { PageAnnouncementComponent } from './pages/page-announcement/page-announcement.component';
import { PageFormAnnounmentComponent } from './pages/page-announcement/page-form-announment/page-form-announment.component';
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
import { PageTestGroupComponent } from './pages/page-test-group/page-test-group.component';
import { PageFormTestGroupComponent } from './pages/page-test-group/page-form-test-group/page-form-test-group.component';
import { PagePersonComponent } from './pages/page-person/page-person.component';
import { PagePostulationTestComponent } from './pages/page-postulation-test/page-postulation-test.component';
import { PageFormPostulationTestComponent } from './pages/page-postulation-test/page-form-postulation-test/page-form-postulation-test.component';
import { PageTestGroupQuestionComponent } from './pages/page-test-group-question/page-test-group-question.component';
import { PageInboxComponent } from './pages/page-inbox/page-inbox.component';
import { PageRoleMenuComponent } from './pages/page-role-menu/page-role-menu.component';
import { PageTrackingComponent } from './pages/page-tracking/page-tracking.component';
import { PageShowDetailsTrackingComponent } from './pages/page-tracking/page-show-details-tracking/page-show-details-tracking.component';
import { PageShowDetailsPostulationComponent } from './pages/page-postulation/page-show-details-postulation/page-show-details-postulation.component';
import { PageFormUserComponent } from './pages/page-user/page-form-user/page-form-user.component';
import { PageEmployeeComponent } from './pages/page-employee/page-employee.component';
import { PageCommissionComponent } from './pages/page-commission/page-commission.component';
import { PageCommissionMembersComponent } from './pages/page-commission/page-commission-members/page-commission-members.component';
import { PageFormRepresentativeComponent } from './pages/page-commission/page-form-representative/page-form-representative.component';
import { PageCommissionAssignedComponent } from './pages/page-commission/page-commission-assigned/page-commission-assigned.component';


const routes: Routes = [

{
  path:'admin', component:AdminComponent, children:[
    { path: 'dashboard', component: PageDashboardComponent },
    { path: 'postulation', component: PagePostulationComponent },
    { path: 'postulation/edit/:id' , component: PageFormPostulationComponent },
    { path: 'postulation/create' , component: PageFormPostulationComponent },
    { path: 'postulation/details/:id' , component: PageShowDetailsPostulationComponent },

    { path: 'announcement', component: PageAnnouncementComponent },
    { path: 'announcement/edit/:id', component: PageFormAnnounmentComponent },
    { path: 'announcement/create', component: PageFormAnnounmentComponent },


    { path: 'institution-type', component: PageInstitutionTypeComponent },

    { path: 'institution', component: PageInstitutionComponent },

    { path: 'position', component: PagePositionComponent },
    { path: 'position-type', component: PagePositionTypeComponent },
    { path: 'position-type/edit/:id', component: PageFormPositionTypeComponent },
    { path: 'position-type/create', component: PageFormPositionTypeComponent },

    { path: 'institution-position', component: PageInstitutionPositionComponent },
    { path: 'institution-position/edit/:id', component: PageFormInstitutionPositionComponent },
    { path: 'institution-position/create', component: PageFormInstitutionPositionComponent },

    { path: 'announcement-institution-position', component: PageAnnouncementInstitutionPositionComponent },
    { path: 'announcement-institution-position/create', component: PageFormAnnouncementInstitutionPositionComponent },
    { path: 'announcement-institution-position/:announcementId', component: PageAnnouncementInstitutionPositionComponent },
    { path: 'announcement-institution-position/edit/:id', component: PageFormAnnouncementInstitutionPositionComponent },
   
    { path: 'commission', component: PageCommissionComponent },
    { path: 'commission/members/:commissionId', component: PageCommissionMembersComponent },
    { path: 'commission/members/representative/:commissionId/create' , component: PageFormRepresentativeComponent },
    { path: 'commission/members/representative/edit/:id', component: PageFormRepresentativeComponent },
    { path: 'commission/assigneds/:commissionId', component: PageCommissionAssignedComponent },

    { path: 'question-category', component: PageQuestionCategoryComponent },
    { path: 'question-category/edit/:id', component: PageFormQuestionCategoryComponent },
    { path: 'question-category/create', component: PageFormQuestionCategoryComponent },


    { path: 'applicant', component: PagePersonComponent },


    { path: 'question', component: PageQuestionComponent },
    { path: 'question/edit/:id', component: PageFormQuestionComponent },
    { path: 'question/create', component: PageFormQuestionComponent },
    //{ path: 'question/:announcementId', component: PageQuestionComponent },

    { path: 'question-response', component: PageQuestionResponseComponent },
    { path: 'question-response/edit/:id', component: PageFormQuestionResponseComponent },
    { path: 'question-response/create', component: PageFormQuestionResponseComponent },

    { path: 'test', component: PageTestComponent },
    { path: 'test/edit/:id', component: PageFormTestComponent },
    { path: 'test/create', component: PageFormTestComponent },

    { path: 'test/group/:testId', component: PageTestGroupComponent },
    { path: 'test/group/:testId/edit/:id', component: PageFormTestGroupComponent },
    { path: 'test/group/:testId/create', component: PageFormTestGroupComponent },

    { path: 'test/:testId/group/:groupId/question', component: PageTestGroupQuestionComponent },


    { path: 'postulation-test', component: PagePostulationTestComponent },
    { path: 'postulation-test/:postulationId', component: PagePostulationTestComponent },
    { path: 'postulation-test/create/:postulationId', component: PageFormPostulationTestComponent },
    
    { path: 'inbox', component: PageInboxComponent },

    { path: 'tracking', component: PageTrackingComponent },
    { path: 'tracking/details/:postulationId', component: PageShowDetailsTrackingComponent },

    { path: 'user', component: PageUserComponent },
    { path: 'user/create', component: PageFormUserComponent },
    { path: 'role-menu', component: PageRoleMenuComponent },
    { path: 'profile', component: PageProfileComponent },

    { path: 'employee', component: PageEmployeeComponent},

  ]
},
{
  path:'auth', component:AuthComponent, children:[
    { path: 'login', component: PageLoginComponent },
    { path: 'register', component: PageRegisterPersonComponent },
  ]
},
{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:false, useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
