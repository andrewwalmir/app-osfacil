import { PriorityService } from './../../../services/priority.service';
import { UserModelDTO } from './../../../models/usermodel.dto';
import { StatusOsModelDTO } from './../../../models/statusOsModel.dto';
import { ServiceModelDTO } from './../../../models/serviceModel';
import { SectorModelDTO } from './../../../models/sectorModel.dto';
import { PriorityOSModel } from './../../../models/priorityOsModel.dto';
import { FormModelDTO } from './../../../models/formModel.dto';
import { CreateOrderService } from './../../../services/createOrder.service';
import { Component, OnInit } from '@angular/core'; //perae
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { regexValidators } from '../../../utils/ionic/validators/validators';

@IonicPage()
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html'
})
export class CreateOrderPage implements OnInit {
  //Objetos
  private os: FormModelDTO;
  private listPriorities: PriorityOSModel[] = [];

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public createOrderService: CreateOrderService,
    public priorityService: PriorityService
  ) {}

  ngOnInit() {
    this.os = new FormModelDTO();
    this.carregarListaPrioridades();
  }

  carregarListaPrioridades() {
    this.priorityService.listarPrioridades().subscribe(
      lista => {
        this.listPriorities = lista;
      },
      error => {
        console.log('deu pau');
        console.log(error);
      }
    );
  }

  saveOrder(formulario) {
    //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco
    let sectorRequesterTemp = new SectorModelDTO();
    sectorRequesterTemp.id = 1;
    this.os.sectorRequester = sectorRequesterTemp;
    let serviceTemp = new ServiceModelDTO();
    serviceTemp.id = 1;
    this.os.service = serviceTemp;
    let statusTemp = new StatusOsModelDTO();
    statusTemp.id = 1;
    this.os.status = statusTemp;
    let requesterTemp = new UserModelDTO();
    requesterTemp.id = 1;
    this.os.userRequester = requesterTemp;
    //Colocando estatícamente objetos obrigatórios (NOT NULL) pra ver se a caralha pelo menos salva no banco

    console.log('vamos ver como estáá o objeto os:');
    console.log(this.os);

    this.createOrderService.saveOrder(this.os).subscribe(
      retorno => {
        console.log('retorno:');
        console.log(retorno);
      },
      error => {
        console.log('deu pau');
        console.log(error);
      }
    );
  }
}
