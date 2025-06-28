import { Component } from '@angular/core';
import { AdminList } from '../../components/admin-list/admin-list';

@Component({
  selector: 'app-admin-home',
  imports: [AdminList],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {}
