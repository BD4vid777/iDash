import { inject, Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  private authService = inject(SocialAuthService)

  private user$ = new BehaviorSubject<SocialUser | null>(null)
  public user = this.user$.asObservable()

  constructor() {
    this.authService.authState.subscribe((user) => {
      console.log('GoogleSignInService: user', user)
      this.user$.next(user)
      if (user != null) this.getAuthToken()
    })
  }

  getAuthToken() {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then(token => {
        console.log('GoogleSignInService: token', token)
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
