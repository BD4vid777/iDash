export interface IUserStorageData {
  userName: string,
  userLogin: string,
  userDevices: string[],
  userBookmarks: IBookmark[],
  userTodos: ITodo[],
  userNotes: INote[],
  userBudget: IBudgetValue[],
  userBackground: IBackground,
  showWelcomeMsg: boolean,
  homePageQuestion: boolean
}

export interface IBackground {
  photoLink: string,
  photoAuthor: string,
  photoIndex: number
}

export interface IBookmark {
  title: string,
  src: URL,
  target: '_blank' | '_self',
  uid: string
}

export interface INote {
  title: string,
  content: string,
  createdAt: Date,
  uid: string
}

export interface ITodo {
  title: string,
  content: string,
  dueDate: Date | undefined,
  priority: 'low' | 'medium' | 'high',
  col: string,
  completed: boolean,
  uid: string
}

export interface IBudgetValue {
  title: string,
  value: number,
  content: string,
  createdAt: Date,
  createdBy: string,
  type: 'income' | 'expense',
  tag: string,
  uid: string
}

export interface ISimpleQuestionDialogData {
  title: string,
  question: string,
}

export interface IAddEditBookmarkDialogData {
  title: string,
  type: 'add' | 'edit',
  titleInput: string,
  srcInput: string
}

export interface IAddEditNoteDialogData {
  title: string,
  type: 'add' | 'edit',
  titleInput: string,
  contentInput: string
}
