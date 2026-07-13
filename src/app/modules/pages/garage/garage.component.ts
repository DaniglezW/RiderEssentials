import { Component, OnInit } from '@angular/core';
import { GarageService } from '@/app/services/garage.service';
import { Motorcycle, MOTORCYCLE_MAKES } from '@/app/model/motorcycle';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss'],
})
export class GarageComponent implements OnInit {
  bikes: Motorcycle[] = [];
  makes = Object.keys(MOTORCYCLE_MAKES);
  models: string[] = [];
  showForm = false;

  newBike = { make: '', model: '', year: new Date().getFullYear(), nickname: '' };
  years: number[] = [];

  constructor(private garageService: GarageService) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1990; y--) {
      this.years.push(y);
    }
  }

  ngOnInit(): void {
    this.garageService.getBikes().subscribe((bikes) => (this.bikes = bikes));
  }

  onMakeChange(): void {
    this.models = MOTORCYCLE_MAKES[this.newBike.make] || [];
    this.newBike.model = '';
  }

  addBike(): void {
    if (!this.newBike.make || !this.newBike.model) return;
    this.garageService.addBike(this.newBike);
    this.newBike = { make: '', model: '', year: new Date().getFullYear(), nickname: '' };
    this.showForm = false;
  }

  removeBike(id: string): void {
    this.garageService.removeBike(id);
  }

  setPrimary(id: string): void {
    this.garageService.setPrimary(id);
  }
}
