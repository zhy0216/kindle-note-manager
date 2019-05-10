import * as moment from "moment";
import {v4String} from "uuid/interfaces";


export type Clip = {
  id: v4String,
  title: string,
  time: number
  content: string,
  editedContent?: string,
}
