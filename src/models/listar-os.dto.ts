import { UserModelDTO } from "./usermodel.dto";
export interface ListarOsDTO {
  id: number;
  dateopen: string;
  description: string;
  reason: string;
  dateclose: string;
  userResponsible: string;
  userRequester: string;
  actions: string; // list
  sectorProvider: string;
  sectorRequester: string;
  service: string;
  priority: string;
  status: string;

  /*
	id: number;
	dateopen: Date;
	description: string;
	reason: string;
	dateclose: Date;
	userResponsible: UserModelDTO;
	userRequester: UserModelDTO;
	actions: ActionModelDTO[]; //veja que o List<> do java virou um vetor de objetos aqui
	
	
	
	Em resumo:

	long, int, double, float = number
	Timestamp, Date, DateTime = Date
	Os objetos, continuam sendo objetos... mas pra isso, vc tem que ter todas
	as classes declaradas.... kd a classe ActionModel daqui? vou fazer chefe
	List<Objeto> vira um vetor no front.... 
	e assim sucessivamente, to com preguiça de digitar mais...
	deixa pra mim 
	vou dar jeito nisso aqui
	o negócio é vc deixar os models prontos no front, pra depois pensar em fazer service
	vc ta fazendo service sem ter models prontas ¬¬
	to ficando bom nisso aqui kkkkkkkkkk

	sugestão: mapeie e crie todas as suas models do back pro front.... só depois vá pros services de componentes
	;)
	seguinte aquele negocio que vc falou de retornar um objeto userModel e nao um response
	nao entendi o que é 

	

	private List<ActionModel> actions;

	private SectorModel sectorProvider;

	private SectorModel sectorRequester;

	private ServiceModel service;

	private PriorityOSModel priority;

	private StatusOSModel status;
	

	
        
		
		*/
}
