import { Component } from '@angular/core';
import { AdminList } from '../../components/admin-list/admin-list';
import { AdminExtralist } from '../../components/admin-extralist/admin-extralist';

@Component({
  selector: 'app-admin-home',
  imports: [AdminList, AdminExtralist],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {}
