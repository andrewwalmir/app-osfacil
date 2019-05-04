import { ServiceModelDTO } from './serviceModel';
import { FormModelDTO } from './formModel.dto';
import { UserModelDTO } from './usermodel.dto';
export class SectorModelDTO {
  id: number;
  nameSector: string;
  users: UserModelDTO[];
  formProvider: FormModelDTO[];
  formResponsible: FormModelDTO[];
  services: ServiceModelDTO[];

  /*
	@JsonIgnoreProperties("sectorRequester")
	@OneToMany(mappedBy = "sectorRequester", fetch = FetchType.LAZY)
	private List<FormModel> FormResponsible;

	@JsonIgnoreProperties("sector")
	@OneToMany(mappedBy = "sector", fetch = FetchType.LAZY)
	private List<ServiceModel> services;
     *
     */
}
