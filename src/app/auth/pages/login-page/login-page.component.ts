import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {

  public subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onLogin(): void{
    this.authService.login('','').subscribe({
      next: (user: User) => {
        this.router.navigateByUrl('/');
      },
      error: () => {},
    })
  }
}
