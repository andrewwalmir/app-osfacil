import { FormModelDTO } from "./formModel.dto";
import { UserModelDTO } from "./usermodel.dto";


export class actionModelDTO {
  id: number;
  change: string;
  dateChange: Date;
  user: UserModelDTO;
  form: FormModelDTO;
}
