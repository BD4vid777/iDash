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

export interface INote {
  title: string,
  content: string,
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
  createdAt: Date,
  createdBy: string,
  type: 'income' | 'expense',
  tag: string,
  uid: string
}
