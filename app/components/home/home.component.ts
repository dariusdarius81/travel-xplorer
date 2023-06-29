import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private notification: NzNotificationService
  ) {}

  goToLogin() {
    const user = this.usersService.getLoggedInUser();
    if (user) {
      this.router.navigate(['/trips']);
      this.notification.info('Information', 'User already login.');
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logOut() {
    this.usersService.clearLoggedInUser();
  }

  isRegisterButtonDisabled(): boolean {
    return this.usersService.getLoggedInUser() !== null;
  }
}
