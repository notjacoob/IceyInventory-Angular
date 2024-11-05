import { Injectable } from '@angular/core';
import { Flavor } from '../models/flavor.model';
import { HttpClient } from '@angular/common/http';
import { UpdateStatus } from '../models/putStatus.model';

@Injectable({
  providedIn: 'root'
})
export class FlavorsService {

  private host = 'http://localhost:5002'
  flavors: Flavor[] = []

  constructor(private http: HttpClient) { }

  public getFlavors(callback: (flavors: Flavor[]) => void): void {
    this.http.get<Flavor[]>(this.host+'/v1/flavors')
      .subscribe((flavors: Flavor[]) => {
        callback(flavors)
      })
  }
  public updateFlavor(flavor: Flavor, callback: (rowUpdated: UpdateStatus) => void): void {
    this.http.put<UpdateStatus>(this.host + "/v1/flavors", {
      id: flavor.id,
      name: flavor.name,
      costPerBatch: flavor.costPerBatch,
      making: flavor.making == true ? 1 : 0,
      inUse: flavor.inUse == true ? 1 : 0,
    }).subscribe((data) => {
      callback(data)
    })
  }
  public deleteFlavor(flavorId: number, callback: (rowUpdated: UpdateStatus) => void): void {
    this.http.delete<UpdateStatus>(this.host + "/v1/flavors/deleteAssoc", {
      body: {
        id: flavorId
      }
    }).subscribe((data) => {
      callback(data)
    })
  }
  public addFlavor(flavor: Flavor, callback: (rowUpdated: UpdateStatus) => void): void {
    
    this.http.post<UpdateStatus>(this.host+"/v1/flavors", {
      name: flavor.name,
      costPerBatch: flavor.costPerBatch,
      making: flavor.making,
      inUse: flavor.inUse,
      category_id: flavor.category_id.id
    }).subscribe((data) => {
      callback(data)
    })
  }

}
