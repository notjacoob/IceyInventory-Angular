import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flavor } from '../models/flavor.model';
import { Batch } from '../models/batch.model';
import { BatchWrapper } from '../models/batchWrapper.model';
import { Category } from '../models/category.model';
import { BatchCreationWrapper } from '../models/batchCreationWrapper.model';
import { FlavorsService } from '../service/flavors.service';
import { BatchesService } from '../service/batches.service';

@Component({
  selector: 'app-flavor',
  templateUrl: './flavor.component.html',
  styleUrl: './flavor.component.css'
})
export class FlavorComponent implements OnInit {


  ngOnInit(): void {

    this.newBatch = {
      type: "None",
      count: null,
      dateMade: null,
      flavor: this.flavor.id
    }

    this.batches = this.formatBatches()

  }

  constructor(private service: FlavorsService, private batchService: BatchesService, private cdRef: ChangeDetectorRef) {}

  @Input({required: true}) flavor!: Flavor
  @Output() deleteDetector = new EventEmitter<number>()

  error: string = ""
  edit: boolean = false
  newName: string|null = null
  newCostPerBatch: number|null = null

  batches: BatchWrapper[] = []

  newBatch!: BatchCreationWrapper

  formatBatches = (): BatchWrapper[] => {
    let fixedBatches: BatchWrapper[] = []
    let ids: String[] = []
    for (let b of this.flavor.batches) {
      let identifier = `${b.dateMade}${b.type}`
      if (ids.includes(identifier)) {
        let idx = ids.indexOf(identifier)
        if (fixedBatches[idx]) {
          fixedBatches[idx].count++
        }
      } else {
        ids.push(identifier)
        fixedBatches.push({
          batch: b,
          count: 1
        })
      }
    }
    return fixedBatches
  }
  sendDelete() {
    if (confirm("Are you sure you want to delete this flavor?")) {
      this.service.deleteFlavor(this.flavor.id, (data) => {
        if (data.affectedRows > 0) {
          this.deleteDetector.emit(this.flavor.id)
        } else {
          alert("Could not delete flavor!")
        }
      })
    }
  }
  makeStateChange(newValue: boolean) {
    this.flavor.making = newValue
    this.service.updateFlavor(this.flavor, (data) => {
      if (data.changedRows < 1) {
        //this.flavor.making = !this.flavor.making
        alert("Update was not successful")
      }
    })
  }
  inUseStateChange(newValue: boolean) {
    this.flavor.inUse = newValue
    this.service.updateFlavor(this.flavor, (data) => {
      if (data.changedRows < 1) {
        this.flavor.inUse = !this.flavor.inUse
        alert("Update was not successful")
      }
    })
  }
  createNewBatch() {
    this.error = ""
    if (this.newBatch.count != null && this.newBatch.count > -1) {
      if (this.newBatch.dateMade != null) {
        if (this.newBatch.type == "Full" || this.newBatch.type == "Half") {
          let allSuccess = true
          for (let i = 0; i < this.newBatch.count; i++) {
            this.batchService.postBatch({
              id: this.flavor.id,
              type: this.newBatch.type,
              dateMade: String(this.newBatch.dateMade)
            }, (data) => {
              if (data.affectedRows < 1) {
                alert("Could not insert batch!")
                allSuccess = false
              }
              let d: Date = new Date(this.newBatch.dateMade!!)
              d.setDate(d.getDate() + 1)
              this.flavor.batches.push({
                id: data.insertId,
                type: this.newBatch.type,
                dateMade: String(d)
              })
            })
          }
          if (allSuccess) {
            this.cdRef.detectChanges()
          } 
        } else {
          this.error = "type must be either \"Full\" or \"Half\""
          alert(this.error)
        }
      } else {
        this.error = "Please select a date"
        alert(this.error)
      }
    } else {
      this.error = "count must be greater than -1"
      alert(this.error)
    }
  }
  parseDate(b: Batch): string {
    let date: Date = new Date(b.dateMade as string)
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
  }
  toggleEdit(): void {
    this.edit = !this.edit
    if (this.edit) {
      this.newName = this.flavor.name
      this.newCostPerBatch = this.flavor.costPerBatch
    } else {
      this.newName = null
      this.newCostPerBatch = null
    }
  }
  submitEdit(): void {
    this.flavor.costPerBatch = this.newCostPerBatch!!
    this.flavor.name = this.newName!!
    this.service.updateFlavor(this.flavor, (status) => {
      console.log("hi")
      if (status.affectedRows > 0) {
        this.toggleEdit()
      }
    })
  }

}
