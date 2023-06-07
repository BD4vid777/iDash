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
  homePageQuestion: boolean,
  highScore: number
}

export interface IBackground {
  photoLink: string,
  photoLinkMobile: string,
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
  progress: number;
  createdAt: Date,
  editedAt: Date,
  dueDate: Date | '',
  timeSpent: number,
  priority: 'Low' | 'Medium' | 'High',
  columnUid: string,
  columnIndex: number,
  boardUid: string,
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
  dialogTitle: string,
  question: string,
  yesButton: string,
  noButton: string
}

export interface IAddEditBookmarkDialogData {
  dialogTitle: string,
  type: 'add' | 'edit',
  titleInput: string,
  srcInput: string
}

export interface IAddEditNoteDialogData {
  dialogTitle: string,
  type: 'add' | 'edit',
  titleInput: string,
  contentInput: string
}

export interface IAddEditTodoDialogData {
  completed: boolean;
  dialogTitle: string,
  type: 'add' | 'edit',
  title: string,
  content: string,
  progress: number,
  dueDate: Date | '',
  timeSpent: number,
  priority: 'low' | 'medium' | 'high',
  boardUid: string,
  columnUid: string
}

export interface IAddEditBudgetDialogData {
  dialogTitle: string,
  type: 'add' | 'edit',
  title: string,
  value: number,
  content: string,
  createdAt: Date,
  createdBy: string,
  typeOfValue: 'income' | 'expense',
  tag: string
}

export interface INotePreviewDialogData {
  dialogTitle: string,
  contentInput: string,
}

export interface ITodoPreviewDialogData {
  dialogTitle: string,
  todo: ITodo
}

export interface ISnackNotificationData {
  message: string,
  icon: 'todo' | 'bookmark' | 'note' | 'budget',
  type: 'success' | 'error' | 'warning' | 'info'
}
