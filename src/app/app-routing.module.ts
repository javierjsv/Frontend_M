import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { CreditosComponent } from './pages/creditos/creditos.component';

const routes: Routes = [
  { path: 'crearUser', component: CrearUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creditos', component: CreditosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
