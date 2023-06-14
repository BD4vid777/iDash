import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  private authService = inject(SocialAuthService)

  private user$ = new BehaviorSubject<SocialUser | null>(null)
  public user = this.user$.asObservable()

  constructor() {
    this.authService.authState.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.user$.next(user)
    })
  }

  logOut() {
    this.authService.signOut().then(() => {
      this.user$.next(null)
    })
  }

  getUser() {
    return this.user
  }
}
