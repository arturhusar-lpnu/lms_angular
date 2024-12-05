import { Routes } from '@angular/router';
import { authGuard } from './guard/auth/auth.guard';
import { roleGuard } from './guard/role/role.guard';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { CoursesPageComponent } from './pages/courses/courses-page/courses-page.component';
import { StudentsPageComponent } from './pages/students/students-page/students-page.component';
import { AssignmentsPageComponent } from './pages/assignments/assignments-page/assignments-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized/unauthorized-page/unauthorized-page.component';
import { ErrorPageComponent } from './pages/error/error-page/error-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { PermissionDeniedPageComponent } from './pages/permission-denied-page/permission-denied-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { SubmitPageComponent } from './pages/submit-page/submit-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'courses/:courseId',
    component: CoursePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students',
    component: StudentsPageComponent,
    canActivate: [roleGuard],
    data: { roles: ['Administrator', 'Lector', 'Assistant'] },
  },
  {
    path: 'assignments',
    component: AssignmentsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assignments/:assignmentId',
    component: AssignmentsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assignments/:assignmentId/submit/:submitId',
    component: SubmitPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'assignments/:assignmentId/submit/:submitId/review',
    component: ReviewPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  {
    path: 'permission-denied',
    component: PermissionDeniedPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
