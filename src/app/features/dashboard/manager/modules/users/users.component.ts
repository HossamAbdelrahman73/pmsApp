import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { IUser } from './interfaces/IUser';
import { UsersService } from './services/users services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  moduleName: string = 'users';

  readonly dialog = inject(MatDialog);
  filterType: string = 'All';
  pageSize: number = 10;
  pageNumber: number = 1;
  tableRes: any;
  searchVal: string = '';
  email: string = '';
  country: string = '';
  searchBy: string = 'userName';
  searchPlaceholder: string = 'Search by User Name';
  searchLabel: string = 'User name';
  searchIcon: string = 'person';
  roleId: number[] = [1, 2];
  displayedColumns: string[] = [
    'userName',
    'imagePath',
    'email',
    'country',
    'phoneNumber',
    'isActivated',
    'actions',
  ];
  actions: any[] = [
    {
      name: 'View',
      icon: 'visibility',
    },
    { name: 'Block', icon: 'block' },
    { name: 'Unblock', icon: 'lock_open' },
  ];
  dataSource: IUser[] = [];
  constructor(private _UsersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    let tableParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      [this.searchBy]: this.searchVal,
      groups: this.roleId,
    };
    this._UsersService.getAllUsers(tableParams).subscribe({
      next: (res) => {
        this.tableRes = res;
        this.dataSource = res.data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
  getMyUsers(): void {
    let tableParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this._UsersService.getUsersOfManager(tableParams).subscribe({
      next: (res) => {
        this.dataSource = res.data;
      },
      error: () => {},
    });
  }
  onFilterTypeChange(): void {
    if (this.filterType === 'all') {
      this.getAllUsers();
    } else if (this.filterType === 'my') {
      this.getMyUsers();
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllUsers();
  }
  updateSearchPlaceholder(searchTerm: string): void {
    this.searchPlaceholder = `Search by ${searchTerm}`;
    this.searchIcon = searchTerm === 'country' ? 'public' : searchTerm;
    this.searchLabel = `${searchTerm}`;
  }
  viewUser(user: IUser): void {
    const userCopy = JSON.parse(JSON.stringify(user));
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '45%',
      data: user,
    });
  }
  blockUser(user: IUser): void {
    this._UsersService.blockUser(user.id).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (err) => {
        console.error('Error blocking user:', err);
      },
    });
  }
  clearFilters(): void {
    this.searchVal = '';
    this.roleId = [1, 2];
    this.searchPlaceholder = 'Search by User Name';
    this.searchIcon = 'person';
    this.searchLabel = 'User name';
    this.searchBy = 'userName';
    this.filterType = 'all';
    this.getAllUsers();
  }
}
