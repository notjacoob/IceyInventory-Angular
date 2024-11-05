import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input({required: true}) currentPage!: String

  formatPage(): String {
    let a = this.currentPage.replace('-', ' ').split(' ')
    let b: String[] = []
    a.forEach(a => {
      b.push(this.captializeFirstLetter(a))
    })
    return b.join(' ')
  }
  private captializeFirstLetter(str: String): String {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
  }

}
