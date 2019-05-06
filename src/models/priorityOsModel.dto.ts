import { FormModelDTO } from './formModel.dto';
export class PriorityOSModel {
  id: number;
  level: number;
  priorityName: string;
  forms: FormModelDTO[];
}
