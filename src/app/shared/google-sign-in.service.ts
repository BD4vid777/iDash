import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  private authService = inject(SocialAuthService)

  public user$ = new BehaviorSubject<SocialUser | null>(null)
  private user = this.user$.asObservable()

  messages: any[] = []
  accessToken: string = ''

  constructor() {

    window.onload = () => {
      gapi.load('auth2', () => {
        gapi.load('client', () => {
          gapi.client.init({
            apiKey: environment.GOOGLE_MAIL_API_KEY,
            clientId: environment.GOOGLE_CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
          })
          gapi.client.load('gmail', 'v1', () => {
          })
        })
      })
    }

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

  getUserMails() {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(token => {
      this.accessToken = token
      this.getMails(this.user$.value!).then(response => {
        response.messages?.forEach(message => {
          this.getMessage(this.user$.value!, message.id!).then(message => {
            this.messages.push(message)
          })
        })
      })
    })
  }

  getMails(user: SocialUser): Promise<gapi.client.gmail.ListMessagesResponse> {
    return new Promise(resolve => {
      gapi.client.gmail.users.messages.list({
        userId: user.id,
        access_token: this.accessToken,
        maxResults: 10
      }).then(response => {
        resolve(response.result)
      })
    })
  }

  public getMessage(user: SocialUser, messageId: string): Promise<string> {
    return new Promise(resolve => {
      gapi.client.gmail.users.messages.get({
        userId: user.id,
        access_token: this.accessToken,
        id: messageId
      }).then(response => {
        resolve(<string>response.result.snippet);
      })
    })
  }
}
