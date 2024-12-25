import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() imagePath: string = '';
  @Input() email: string = '';
  @Input() userName: string = '';
  constructor(private _AuthService: AuthService) {}
  isManager(): boolean {
    return this._AuthService.role === 'Manager';
  }

  logout(): void {
    this._AuthService.onLogout();
  }
}
