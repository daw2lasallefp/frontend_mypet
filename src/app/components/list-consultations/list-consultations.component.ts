import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.css']
})
export class ListConsultationsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  consultations: Consultation[] = [];
  petId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
  })
    this.getConsultations();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getConsultations():void {
    this.petService.getConsultations(this.petId).subscribe((data: Consultation[]) => {
      this.consultations = data;
    })
  }

  onSelect(id: number): void {
    console.log(id);
    this.consultations = this.consultations.map(function(cons) {
      if(cons.id == id) {
        cons.visibility = !cons.visibility;
      }
      return cons
    }
    ) 

    
  }

}