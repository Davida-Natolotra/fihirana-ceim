import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login';

@Component({
  selector: 'app-admin-login',
  imports: [LoginComponent],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {}
