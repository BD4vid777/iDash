import { Component } from '@angular/core';
import { backgroundImages, primaryBG } from "./utils/internal-data";
import { IBackground } from "./utils/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'iDash';
  private bgPrimary: IBackground = primaryBG
  public bgPhoto: IBackground = primaryBG
  public bgArray: IBackground[] = backgroundImages

  changeBackground(photoLink: string, photoAuthor: string, photoIndex: number) {
    this.bgPhoto = {
      photoLink: photoLink,
      photoAuthor: photoAuthor,
      photoIndex: photoIndex
    }

    // TODO: Check data from localStorage and save new bg to ls
  }

  resetBackground() {
    this.bgPhoto = this.bgPrimary
  }
}
