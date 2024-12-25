import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper service/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded = true;
  email: string = '';
  userName: string = '';
  imagePath: string = '';
  imageUrl: string = 'https://upskilling-egypt.com:3003/';
  constructor(private _HelperService: HelperService) {}

  ngOnInit(): void {
    this._HelperService.onGetCurrentUser().subscribe({
      next: (res: any) => {
        if (res) {
          this.email = res.email;
          this.userName = res.userName;
          this.imagePath = res.imagePath;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
}
