export interface Author {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  date: string
}

export interface Books {
  id: number,
  author: string,
  title: string,
  publisher: string,
  year: string
}
