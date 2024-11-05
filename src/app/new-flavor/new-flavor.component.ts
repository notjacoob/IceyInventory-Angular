import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from '../service/categories.service';
import { FlavorsService } from '../service/flavors.service';
import { Flavor } from '../models/flavor.model';
import {Router} from '@angular/router'

@Component({
  selector: 'app-new-flavor',
  templateUrl: './new-flavor.component.html',
  styleUrl: './new-flavor.component.css'
})
export class NewFlavorComponent implements OnInit {

  categories: Category[] = []

  constructor(private service: CategoriesService, private flavorsService: FlavorsService, private router: Router) {}

  flavorName: string|null = null
  categoryId: number|null = -1
  costPerBatch: number|null = null

  createFlavor(): void {
    if (this.flavorName != null && this.flavorName != "") {
      if (this.categoryId != null && this.categoryId > 0) {
        let f: Flavor = {
          id: -1,
          name: this.flavorName,
          costPerBatch: this.costPerBatch!!,
          making: false,
          inUse: false,
          category_id: {
            name: "",
            id: this.categoryId
          },
          batches: []
        }
        this.flavorsService.addFlavor(f, (status => {
          if (status.affectedRows > 0) {
            this.router.navigate(['/flavor-management'])
          }
        }))
      } else {
        alert("Please select a category")
      }
    } else {
      alert("Please enter a name")
    }
  }

  ngOnInit(): void {
    this.service.getCategories(cat => {
      this.categories = cat
    })
  }

  

}
