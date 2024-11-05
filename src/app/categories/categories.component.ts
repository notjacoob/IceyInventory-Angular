import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  ngOnInit(): void {
    this.service.getCategories((cat => {
      this.categories=cat
    }))
  }
  newCatName: string|null=null
  newName: string|null = null
  toEdit: boolean = false
  whichEdit: number = -1
  categories: Category[] = []
  newCat: boolean = false

  constructor(private service: CategoriesService, private cdRef: ChangeDetectorRef) {}

  del(id: number): void {
    if (confirm("Are you sure you want to delete this category? This will delete all associated flavors")) {
      this.service.deleteCategory(id, (status) => {
        if (status.affectedRows > 0) {
          this.categories = this.categories.filter(c => c.id != id)
        } else {
          alert("Delete was not succesful")
        }
      })
    }
  }
  edit(c: Category): void {
    if (this.toEdit && c.id != this.whichEdit) {
      this.whichEdit = c.id
      this.newName = c.name
    } else if (this.toEdit && c.id == this.whichEdit) {
      this.toEdit = !this.toEdit
    } else {
      this.toEdit = !this.toEdit
      this.whichEdit = c.id
      this.newName = c.name
    }
    this.cdRef.detectChanges()
  }
  confirmEdit(cat: Category): void {
    if (this.newName != null && this.newName != '' && this.newName != cat.name) {
      cat.name = this.newName
      this.service.updateCategory(cat, (status) => {
        if (status.affectedRows > 0) {
          this.categories = this.categories.map(c => {
            if (c.id == cat.id) return cat
            else return c
          })
          this.toEdit = !this.toEdit
        } else {
          alert("Could not edit")
        }
      })
    } else {
      alert(`The new name must be different from ${cat.name}`)
    }
  }
  newCategory(): void {
    this.newCat = true
  }
  confirmNewCat(): void {
    if (this.newCatName != null && this.newCatName != '') {
      this.service.postCategory(this.newCatName, status => {
        if (status.affectedRows > 0) {
          this.service.getCategoryId(status.insertId, cat => {
            this.categories.push(cat)
            this.cancelNewCat()
          })
        }
      })
    } else {
      alert("Please enter a name!")
    }
  }
  cancelNewCat(): void {
    this.newCat = false
    this.newCatName = null
  }

}
