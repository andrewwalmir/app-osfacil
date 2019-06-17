import { SectorModelDTO } from './sectorModel.dto';
import { FormModelDTO } from './formModel.dto';
import { actionModelDTO } from './actionModel.dto';
import { FunctionModelDTO } from './functionModel.dto';
export class UserModelDTO {
  id: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  foto: string;
  cpf: string;
  contact: string;
  action: actionModelDTO[];
  formResponsible: FormModelDTO[];
  formRequester: FormModelDTO[];
  function: FunctionModelDTO;
  sector: SectorModelDTO;
  active: boolean;
}
