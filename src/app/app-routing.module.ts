import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './components/listado/listado.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'mostrar/:element', component: MostrarComponent },
  { path: 'devolucion', component: DevolucionComponent },
  { path: '**', redirectTo: 'principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
