import { Component, OnInit } from "@angular/core";
import { Date } from "src/app/models/date.model";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Employee } from "src/app/models/Employee";
import { DateService } from "src/app/services/date.service";
import { AuthEmployeeService } from "src/app/shared/auth-employee.service";
import { Router } from "@angular/router";
import { LogHelper } from "src/app/services/log-helper.service";
import { AuthClientsService } from "src/app/shared/auth-clients.service";

@Component({
  selector: "app-dates",
  templateUrl: "./dates.component.html",
  styleUrls: ["./dates.component.css"],
})
export class DatesComponent implements OnInit {
  dates: Array<Date> = [];
  date = new Date();
  pets: Pet[] = [];
  employees: Employee[] = [];
  employeeId = 0;
  petId = 0;
  validSession: boolean = false;
  loggedUser: any;
  htmlMsg!: String;

  constructor(
    private logHelper: LogHelper,
    private router: Router,
    private dateService: DateService,
    private petService: PetService,
    private employeeService: AuthEmployeeService,
    private clientsService: AuthClientsService
  ) {}

  ngOnInit(): void {
    //Get logged user
    this.loggedUser = this.logHelper.getLoggedUser();
    if (this.loggedUser) {
      this.validSession = true;
    } else {
      alert("Por favor, registrate o inicia sesión");
      this.router.navigate(["/"]);
    }
    //If client, get his dates. If employee, get everyone's
    this.clientsService.getAuthenticateUser().subscribe(
      (data: any) => {
        this.displayByPets(data.user.id);
      },
      (exception) => {
        this.dateService.listAllDates().subscribe((data) => {
          this.dates = Object.values(data);
        });
      }
    );
    //Get pets
    this.petService.getCompletePetList().subscribe((data: Pet) => {
      this.pets = Object.values(data);
    });
    //Get employees
    this.employeeService.listAllEmployees().subscribe((data) => {
      this.employees = Object.values(data).map(
        (employeeDB) => new Employee(employeeDB)
      );
    });
  }

  displayByPets(id: number) {
    this.petService.listAllPets(id).subscribe((data: Pet[]) => {
      for (const d of Object.entries(data)) {
        for (const i of d as any) {
          if (i.id) {
            this.pets.push(i);
            this.getDatesByPetId(i.id);
          }
        }
      }
    });
  }

  getDatesByPetId(petId: number) {
    this.dateService.listDateByPetId(petId).subscribe((data) => {
      for (const d of data as any) {
        this.dates.push({
          id: d.id,
          date_time: d.date_time,
          pet_id: d.pet_id,
          employee_id: d.employee_id,
        });
      }
    });
  }

  getPetById(id: number) {
    let petFiltered = this.pets.filter((pet: Pet) => pet.id == id);
    if (petFiltered.length > 0) {
      return petFiltered[0].name;
    }
    return "No disponible";
  }

  getEmployeeById(id: any) {
    let employeeFiltered = this.employees.filter(
      (employee: Employee) => employee.id == id
    );
    if (employeeFiltered.length > 0) {
      return employeeFiltered[0].name;
    }
    return "No disponible";
  }

  deleteDate(dateId: number) {
    let index: number = this.dates.findIndex(({ id }) => id === dateId);
    if (index !== -1) {
      this.dates.splice(index, 1);
    }
    this.dateService.deleteDate(dateId).subscribe(
      (data) => (this.htmlMsg = "Cita eliminada correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }

  tracker(item: any, index: any) {
    return `${item.id}-${index}`;
  }
}
