import { FormModelDTO } from "./formModel.dto";
export class StatusOsModelDTO {
  id: number;
  nameStatus: string;
  forms: FormModelDTO[];

  /*
    *
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String NameStatus;

	@JsonIgnoreProperties("status")
	@OneToMany(mappedBy = "status", fetch = FetchType.LAZY)
	private List<FormModel> forms;

    */
}
