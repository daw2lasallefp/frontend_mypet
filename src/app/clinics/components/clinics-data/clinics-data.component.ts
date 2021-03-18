import { Component } from "@angular/core";
import { ClinicsDataService } from "../../services/clinics-data.service";

@Component({
  selector: "app-clinics-data",
  templateUrl: "./clinics-data.component.html",
  styleUrls: ["./clinics-data.component.css"],
})
export class ClinicsDataComponent {
  clinics = [] as any;
  clinic = [] as any;
  clinicId = 0;

  constructor(private clinicsDataService: ClinicsDataService) {}

  listAllClinics() {
    this.clearPreviousValues();
    this.clinicsDataService.listAllClinics().subscribe((data) => {
      for (const d of data as any) {
        this.clinics.push({
          name: d.name,
          city: d.city,
          address: d.address,
          phone: d.phone,
          email: d.email,
        });
      }
    });
  }

  listSingleClinic(clinicId: number) {
    this.clearPreviousValues();
    this.clinicsDataService.listSingleClinic(clinicId).subscribe(
      (data) =>
        (this.clinic = {
          name: (data as any).name,
          city: (data as any).city,
          address: (data as any).address,
          phone: (data as any).phone,
          email: (data as any).email,
        })
    );
  }

  clearPreviousValues(){
    this.clinic = [];
    this.clinics = [];
  }
}