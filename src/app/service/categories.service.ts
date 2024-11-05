import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { UpdateStatus } from '../models/putStatus.model';
import { Flavor } from '../models/flavor.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  private host = 'http://localhost:5002'

  public getCategories(callback: (categories: Category[]) => void): void {
    this.http.get<Category[]>(this.host+"/v1/categories").subscribe((categories: Category[]) => {
      callback(categories)
    })
  }
  public deleteCategory(id: number, callback: (status: UpdateStatus) => void): void {
    this.http.delete<UpdateStatus>(this.host+"/v1/categories", {body: {id: id}}).subscribe((status: UpdateStatus) => {
      callback(status)
    })
  }
  public updateCategory(category: Category, callback: (status: UpdateStatus) => void): void {
    this.http.put<UpdateStatus>(this.host+"/v1/categories", category).subscribe((status: UpdateStatus) => {
      callback(status)
    })
  }
  public postCategory(name: string, callback: (status: UpdateStatus) => void): void {
    this.http.post<UpdateStatus>(this.host+"/v1/categories", {name: name}).subscribe((status: UpdateStatus) => {
      callback(status)
    })
  }
  public getCategoryId(id: number, callback: (category: Category) => void): void {
    this.http.get<Category>(this.host+"/v1/categories/id/" + id).subscribe((category: Category) => {
      callback(category)
    })
  }

}
