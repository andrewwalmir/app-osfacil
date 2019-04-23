import { SectorModelDTO } from "./sectorModel.dto";
import { FormModelDTO } from "./formModel.dto";
import { actionModelDTO } from "./actionModel.dto";
import { FunctionModelDTO } from "./functionModel.dto";
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

  /*
  *
            @JsonIgnoreProperties("user") // quando é RESTFul precisa desta annotation
            @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
            private List<ActionModel> action;// correto professor 
            @JsonIgnoreProperties("userResponsible") // quando é RESTFul precisa desta annotation
            @OneToMany(mappedBy = "userResponsible", fetch = FetchType.LAZY)
            private List<FormModel> formResponsible;// correto

            @JsonIgnoreProperties("userRequester") // quando é RESTFul precisa desta annotation
            @OneToMany(mappedBy = "userRequester", fetch = FetchType.LAZY)
            private List<FormModel> formRequester;// correto

            @JsonIgnoreProperties("users")
            @ManyToOne
            @JoinColumn(name = "function_id", nullable = false) // an
            private FunctionModel function;

            @JsonIgnoreProperties("users")
            @ManyToOne
            @JoinColumn(name = "sector_id", nullable = true)
            private SectorModel sector;

  */
}
