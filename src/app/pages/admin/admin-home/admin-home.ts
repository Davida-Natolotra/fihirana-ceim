import {Component} from '@angular/core';
import {AdminList} from '../../../features/admin/components/admin-list/admin-list';
import {AdminExtralist} from '../../../features/admin/components/admin-extralist/admin-extralist';
import {MatTabsModule} from '@angular/material/tabs';
import {PlaylistList} from '../../../features/Playlist/components/playlist-list/playlist-list';

@Component({
  selector: 'app-admin-home',
  imports: [AdminList, AdminExtralist, MatTabsModule, PlaylistList],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {
}
