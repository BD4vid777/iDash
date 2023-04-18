import { Component } from '@angular/core';
import { backgroundImages, primaryBG } from "./utils/internal-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'iDash';
  private bgPrimary = primaryBG
  public bgPhoto = primaryBG
  public bgArray = backgroundImages

  changeBackground(photoLink: string, photoAuthor: string, photoIndex: number) {
    let bgPhotoData = {
      photoLink: photoLink,
      photoAuthor: photoAuthor,
      photoIndex: photoIndex
    }

    this.bgPhoto = bgPhotoData
  }
}
