import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'IceyInventory';
  constructor(private elementRef:ElementRef) {}
  ngAfterViewInit(): void {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4F6FF'
  }
}
