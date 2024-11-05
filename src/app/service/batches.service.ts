import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateStatus } from '../models/putStatus.model';
import { Batch } from '../models/batch.model';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {
  private host = 'http://localhost:5002'

  constructor(private http: HttpClient) { }

  public postBatch(b: Batch, callback: (rowUpdated: UpdateStatus) => void): void {
    this.http.post<UpdateStatus>(this.host + "/v1/batches", {flavorId: b.id, dateMade: b.dateMade.toString(), type: b.type}).subscribe((data) => callback(data))
  }

}
