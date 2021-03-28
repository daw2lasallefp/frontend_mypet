import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesLoginComponent } from './components/employees/employees-login/employees-login.component';
import { EmployeesRegisterComponent } from  './components/employees/employees-register/employees-register.component';
import { ClinicsListComponent } from './components/clinics/clinics-list/clinics-list.component';
import { ClinicsUpdateComponent } from './components/clinics/clinics-update/clinics-update.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { ListPetsComponent } from './components/list-pets/list-pets.component';
import { ClientsLoginComponent } from './components/clients/clients-login/clients-login.component';
import { ClientsRegisterComponent } from  './components/clients/clients-register/clients-register.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { VaccinationsComponent } from './components/vaccinations/vaccination-list/vaccinations.component';
import { VaccinationUpdateComponent } from './components/vaccinations/vaccination-update/vaccination-update.component';
import { VaccinationCreateComponent } from './components/vaccinations/vaccination-create/vaccination-create.component';
import { EmployeesUpdateComponent} from  './components/employees/employees-update/employees-update.component';



const routes: Routes = [
  {path: 'loginEmployee', component:EmployeesLoginComponent, pathMatch: 'full'},
  {path: 'registerEmployee', component:EmployeesRegisterComponent, pathMatch: 'full'},
  {path: 'clinics', component:ClinicsListComponent, pathMatch: 'full'},
  {path: 'clinics/updateClinic', component:ClinicsUpdateComponent, pathMatch: 'full'},
  {path: 'clinics/updateClinic/:id', component:ClinicsUpdateComponent, pathMatch: 'full'},
  {path: 'employees', component:EmployeesListComponent, pathMatch: 'full'},
  {path: 'vaccines', component:VaccinesComponent, pathMatch: 'full'},
  {path: 'clients/:clientId/pets/createPet', component: CreatePetComponent, pathMatch: 'full'},
  {path: 'clients/:clientId/pets', component: ListPetsComponent, pathMatch: 'full'},
  {path: 'loginClients', component:ClientsLoginComponent, pathMatch: 'full'},
  {path: 'registerClients', component:ClientsRegisterComponent, pathMatch: 'full'},
  {path: 'clientsList', component:ClientsListComponent, pathMatch: 'full'},
  {path: 'vaccinations', component:VaccinationsComponent, pathMatch: 'full'},
  {path: 'vaccinations/addVaccination', component:VaccinationCreateComponent, pathMatch: 'full'},
  {path: 'vaccinations/updateVaccination/:id', component:VaccinationUpdateComponent, pathMatch: 'full'},
  {path: 'vaccinations/updateVaccination/pets/:petId', component:VaccinationUpdateComponent, pathMatch: 'full'},
  {path: 'employees/:employeeId/update', component: EmployeesUpdateComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
