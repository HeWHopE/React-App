import { IList } from './IList'

export interface IBoard {
  id?: number
  name: string
  lists: IList[]
}
