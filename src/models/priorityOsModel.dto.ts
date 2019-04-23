import { FormModelDTO } from './formModel.dto';
export class PriorityOSModel{


    id : number;
    level: number;
    priorityName : string;
    forms : FormModelDTO[];

    /**
     * @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private int level;
	@Column
	private String priorityName;

	@JsonIgnoreProperties("priority")
	@OneToMany(mappedBy = "priority", fetch = FetchType.LAZY)
	private List<FormModel> forms;
     */
}