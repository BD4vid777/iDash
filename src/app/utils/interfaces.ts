export interface IDashData {
  userLogin?: string,
  userDevices?: string[],
  userBookmarks?: IBookmark[],
  userTodos?: any[], // TODO: Create interface for todos
  userNotes?: any[], // TODO: Create interface for notes
  userBudget?: any[], // TODO: Create interface for budget
  userBackground?: IBackground
}

export interface IBackground {
  photoLink: string,
  photoAuthor: string,
  photoIndex: number
}

export interface IBookmark {
  title: string,
  src: string,
  target: '_blank' | '_self',
  uid: string
}
