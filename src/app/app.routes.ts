import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { GetsetInputValue } from './testing/getset-input-value/getset-input-value';
import { PageNotFound } from './page-not-found/page-not-found';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {path : 'login',component: Login},
    {path : 'register',component: Register},
    {path : 'getset',component: GetsetInputValue},
    {path : 'profile',component: Profile},
    {path : 'profile/:id/:name',component: Profile},

    {path : '**',component: PageNotFound}


];
