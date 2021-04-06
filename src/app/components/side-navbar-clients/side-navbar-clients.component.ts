import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Clients } from 'src/app/models/clients';
import { AuthClientsService } from '../../shared/auth-clients.service';
import { Location } from '@angular/common';
import { Pet } from '../../models/pet';
import { PetService } from 'src/app/services/pet.service';




@Component({
  selector: 'app-side-navbar-clients',
  templateUrl: './side-navbar-clients.component.html',
  styleUrls: ['./side-navbar-clients.component.css']
})
export class SideNavbarClientsComponent implements OnInit {
  client: any = false ;
  pets: any = false;
  dates: any = false;
  clientsLogged:Clients | any;
  clients: Clients[] = [];
  
  

  @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(public router: Router,
    public fb: FormBuilder,
    private _location: Location,
    private clientsService: AuthClientsService,
    private petService: PetService,) { }

 
  ngOnInit() {
   
    this.client = false;
    
  }

  clientsUserShow(){
    this.clientsLogged= this.clients;
    this.pets = false;
    this.dates = false;
    this.client = true;
  }

  clientsPetShow(){
  
    this.pets = true;
    this.client = false;
    this.dates = false;
  }

  clientsDatesShow(){
    this.dates = true;
    this.client = false;
    this.pets = false;
  }

  
  clientsSelected(clients: Clients):void{
    
    this.clientsLogged =  clients;
    this.clientsSelectedEvent.emit(clients);
  }

  










}
