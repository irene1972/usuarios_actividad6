import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Formulario } from './components/formulario/formulario';
import { Detalle } from './components/detalle/detalle';
import { C404 } from './components/c404/c404';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Main},
    {path:'formulario',component:Formulario},
    {path:'user/:id',component:Detalle},
    {path:'updateuser/:id',component:Formulario},
    {path:'newuser',component:Formulario},
    {path:'**',component:C404}
];
