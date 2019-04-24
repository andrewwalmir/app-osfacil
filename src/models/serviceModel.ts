import { SectorModelDTO } from "./sectorModel.dto";
import { FormModelDTO } from "./formModel.dto";
export class ServiceModelDTO {
  id: number;
  description: string;
  forms: FormModelDTO[];
  sector: SectorModelDTO;

  /**
     * @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String description;

	@JsonIgnoreProperties("service")
	@OneToMany(mappedBy = "service", fetch = FetchType.LAZY)
	private List<FormModel> forms;

	@JsonIgnoreProperties("services")
	@ManyToOne
	@JoinColumn(name = "idsector", nullable = true)
	private SectorModel sector;

     */
}
