import { Photo } from "./Photo"

export interface FilmRoll {
   id: string,
   owner: string,
   title: string,
   photos?: Photo[]
}