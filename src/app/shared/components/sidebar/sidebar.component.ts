import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu {
  name: string;
  icon: string;
  isActive: boolean;
  route: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isExpanded = true;
  @Output() toggle = new EventEmitter<boolean>();

  navItems: IMenu[] = [
    {
      name: 'Home',
      icon: 'home',
      route: this.isManager()
        ? '/dashboard/manager/home'
        : '/dashboard/employee/home',
      isActive: this.isEmployee() || this.isManager(),
    },
    {
      name: 'Users',
      icon: 'people',
      route: '/dashboard/manager/users',
      isActive: this.isManager(),
    },
    {
      name: 'Tasks',
      icon: 'task',
      route: this.isManager()
        ? '/dashboard/manager/tasks'
        : '/dashboard/employee/user-tasks',
      isActive: this.isManager() || this.isEmployee(),
    },
    {
      name: 'Projects',
      icon: 'work',
      route: this.isManager()
        ? '/dashboard/manager/manager-projects'
        : '/dashboard/employee/projects',
      isActive: this.isEmployee() || this.isManager(),
    },
    {
      route: '/change',
      name: 'Change password',
      icon: 'lock_open',
      isActive: this.isEmployee() || this.isManager(),
    },
    {
      name: 'Logout',
      icon: 'logout',
      route: '/auth',
      isActive: this.isEmployee() || this.isManager(),
    },
  ];
  constructor(private _AuthService: AuthService) {}
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    this.toggle.emit(this.isExpanded);
  }
  isManager(): boolean {
    return this._AuthService.getRole() === 'Manager';
  }
  isEmployee(): boolean {
    return this._AuthService.getRole() === 'Employee';
  }
  logout(): void {
    this._AuthService.onLogout();
  }
}
