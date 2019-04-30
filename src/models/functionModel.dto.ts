import { UserModelDTO } from './usermodel.dto';
export class FunctionModelDTO{

    id : number;
    nameFunction : string;
    users : UserModelDTO[];

    /*
    *
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String nameFunction;

	@JsonIgnoreProperties("function")
	@OneToMany(mappedBy = "function", fetch = FetchType.LAZY)
	private List<UserModel> users;

    */

}