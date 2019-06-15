import { PriorityOSModel } from './priorityOsModel.dto';
import { ServiceModelDTO } from './serviceModel';
import { SectorModelDTO } from './sectorModel.dto';
import { UserModelDTO } from './usermodel.dto';
import { actionModelDTO } from './actionModel.dto';
import { StatusOsModelDTO } from './statusOsModel.dto';

export class FormModelDTO {
  id: number;
  image: string;
  dateopen: Date;
  description: string;
  reason: string;
  dateclose: Date;
  userResponsible: UserModelDTO;
  userRequester: UserModelDTO;
  actions: actionModelDTO[];
  sectorProvider: SectorModelDTO;
  sectorRequester: SectorModelDTO;
  service: ServiceModelDTO;
  priority: PriorityOSModel;
  status: StatusOsModelDTO;
 foto : string;
  /*

	id: number;
	dateopen: Date;
	description: string;
	reason: string;
	dateclose: Date;
	userResponsible: UserModelDTO;
	userRequester: UserModelDTO;
	actions: ActionModelDTO[]; //veja que o List<> do java virou um vetor de objetos aqui
	private List<ActionModel> actions;
	private SectorModel sectorProvider;
	private SectorModel sectorRequester;
	private ServiceModel service;
	private PriorityOSModel priority;
	private StatusOSModel status;
	*/
}
