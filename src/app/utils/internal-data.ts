import { IBookmark, INote, ITodo } from "./interfaces";
import { v4 as uuid4 } from 'uuid'

export const UserDataStorageKey: string = 'iDashUserData'

export const primaryBG = {
  photoLink: '../assets/bgImg/christian-lue-unsplash.jpg',
  photoAuthor: 'Photo by <a href="https://unsplash.com/@christianlue?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Christian Lue</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>\n',
  photoIndex: 0
}

export const backgroundImages = [
  {
    photoLink: '../assets/bgImg/daniel-sessler-unsplash.jpg',
    photoAuthor: 'Photo by <a href="https://unsplash.com/@danielsessler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Daniel Seßler</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>\n',
    photoIndex: 1
  },
  {
    photoLink: '../assets/bgImg/zetong-li-unsplash.jpg',
    photoAuthor: 'Photo by <a href="https://unsplash.com/@zetong?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Zetong Li</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>\n',
    photoIndex: 2
  },
  {
    photoLink: '../assets/bgImg/pramod-tiwari-unsplash.jpg',
    photoAuthor: 'Photo by <a href="https://unsplash.com/@pramodtiwari?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Pramod Tiwari</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>\n',
    photoIndex: 3
  },
  {
    photoLink: '../assets/bgImg/jason-blackeye-unsplash.jpg',
    photoAuthor: 'Photo by <a href="https://unsplash.com/@jeisblack?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Jason Blackeye</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>\n',
    photoIndex: 4
  }
]

// Temporary data for testing

export const tmpBookmarks: IBookmark[] = [
  {
    title: 'Google',
    src: new URL('https://www.google.com/'),
    target: '_blank',
    uid: uuid4()
  },
  {
    title: 'YouTube',
    src: new URL('https://www.youtube.com/'),
    target: '_blank',
    uid: uuid4()
  },
  {
    title: 'GitHub',
    src: new URL('https://www.github.com/'),
    target: '_blank',
    uid: uuid4()
  },
  {
    title: 'Wikipedia Long hehehe',
    src: new URL('https://www.wikipedia.com/'),
    target: '_blank',
    uid: uuid4()
  }
]

export const tmpTodos: ITodo[] = [

]

export const tmpNotes: INote[] = [

]
