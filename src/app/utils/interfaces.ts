export interface IUserStorageData {
  userName: string,
  userLogin: string,
  userDevices: string[],
  userBookmarks: IBookmark[],
  userTodos: ITodo[],
  userTodosBoards: IBoard[],
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
  createdAt: Date,
  editedAt: Date,
  dueDate: Date | '',
  priority: 'low' | 'medium' | 'high',
  column: IColumn,
  columnIndex: number,
  board: IBoard,
  completed: boolean,
  uid: string
}

export interface IColumn {
  name: string,
  boardUid: string,
  uid: string
}

export interface IBoard {
  name: string,
  uid: string,
  columns: IColumn[],
  isPrimary: boolean
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

export interface INotePreviewDialogData {
  title: string,
  contentInput: string,
}
