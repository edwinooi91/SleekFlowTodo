import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
  ]
})
export class LoginComponent {

  constructor(private readonly router: Router) { }

  public OnLoginClicked(): void {
    this.router.navigate(['/todo']);
  }
}
