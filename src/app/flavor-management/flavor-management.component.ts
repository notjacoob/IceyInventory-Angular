import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlavorsService } from '../service/flavors.service';
import { Flavor } from '../models/flavor.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-flavor-management',
  templateUrl: './flavor-management.component.html',
  styleUrl: './flavor-management.component.css'
})
export class FlavorManagementComponent implements OnInit {
  
  constructor(private service: FlavorsService, private cdRef: ChangeDetectorRef) {}

  flavors: Flavor[] = []

  ngOnInit(): void {
    this.service.getFlavors((f) => {
      this.flavors = f
    })
  }

  handleDeletion(flavorId: number): void {
    this.flavors = this.flavors.filter(f => f.id != flavorId)
    this.cdRef.detectChanges()
  }

  fixCategories(): Category[] {
    let fixedCategories: Category[] = []
    let ids: String[] = []
    for (let f of this.flavors) {
      if (!ids.includes(f.category_id.name)) {
        fixedCategories.push(f.category_id)
        ids.push(f.category_id.name)
      }
    }
    return fixedCategories
  }
  flavorsForCat(c: Category): Flavor[] {
    return this.flavors.filter(f => f.category_id.name == c.name)
  }

}
