import { Component, OnInit } from '@angular/core';
import { creditosService } from 'src/app/services/creditos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {
  public creditos: Object;


  public usuario :any = JSON.parse(localStorage.getItem('usuario'));
  public name ;
  public validacion = false;
  public fechaValidate = false;
  public usuarioForm: FormGroup;
  public stado = false;
  public resultCredito = false;
  public titleState = '';
  public validSalario = false;
  public validFecha = false;
  constructor(
    private EcreditosService: creditosService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.formBuilder.group({
      id: [''],
      nit: ['', [Validators.required]],
      tiempoInicio: ['', [Validators.required]],
      salario : ['', [Validators.required]],
      nombre : ['', [Validators.required]],
      usuario: [{}],
    });
  }

  ngOnInit() {
    this.name = this.usuario[0]['nombre'];
    this.init(this.usuario[0]['id']);
  }

  init(id?) {
    this.EcreditosService.listCredito(id).subscribe((resp : any) => {
    
      // console.log(resp[0]);
      if(resp[0] !== null){
        this.usuarioForm.setValue(resp[0]);
        this.validacion = true;
      }else{
        this.validacion = false;
      }
    });

  }

  limpiar() {
    this.usuarioForm.reset();
  }


  guardar() {
    this.usuarioForm.value.usuario = { id : this.usuario[0]['id'] };

      if (this.validacion) {
      this.EcreditosService.savecreditos(this.usuarioForm.value).subscribe(resp => {
        this.info('proceso correcto');
        this.limpiar();
        this.init(this.usuario[0]['id']);
      }, error => {
        console.log('error', error);
        this.error('error al crear registro');
      });

    } else {

      // console.log('ede');

      this.EcreditosService.updatecreditos(this.usuarioForm.value).subscribe(resp => {
        this.info('Proceso correcto');
        this.limpiar();
        this.init(this.usuario[0]['id']);
      }, error => {
        console.log('error', error);
        this.error('error al actualizar');
      });
    }

  }

  eliminar() {
    this.EcreditosService.deletecreditos(this.usuarioForm.value).subscribe(resp => {
     this.validacion = false;
      this.init(this.usuario[0]['id']);
      this.limpiar();
      this.info('se elmino de forma correcta');
    }, error => {
      console.log('error', error);

    });
  }

  info(mesaje: String) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type: 'success',
      title: mesaje,
    });
  }


  error(text: String) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000
    });

    Toast.fire({
      type: 'error',
      title: text,
    });
  }

  validar(){

    this.resultCredito = true;

     const TiempoEmpresa = this.usuarioForm.value.tiempoInicio

     const fecha1 :any = moment(TiempoEmpresa);
     const fecha2 = moment();
     const tiempo = fecha2.diff(fecha1,'days');
     
    // console.log(tiempo);
    // 547.5 1 año y medio
    // 1. la persona debe tener mas de una 1 y medio trabajando
    // 2 La persona debe terner un ingreso superior a 800000
    // 3. Si el salario ingresado es superior a $800.000 e inferior a $1.000.00.000 el valor de credito aprobado sera de $5.000.000
    // 4.Si el salario ingresado es superior a $1.000.000 e inferior a $ 4.000.000 el credito aprobado sera de $20.000.000
    // 5.Si el salario ingresado es superior a $4.000.000 el credito aprobado sera de $50.000.000

if(tiempo >= 548){

    if(this.usuarioForm.value.salario > 800000){
      this.stado = true;
      if(this.usuarioForm.value.salario > 800000 && this.usuarioForm.value.salario < 1000000){
        this.titleState = 'Su credito fue aprobado por $5.000.000'
      }
      if(this.usuarioForm.value.salario > 1000000 && this.usuarioForm.value.salario < 4000000){
        this.titleState = 'Su credito fue aprobado por $20.000.000'
      }
      if(this.usuarioForm.value.salario > 4000000){
        this.titleState = 'Su credito fue aprobado por $50.000.000'
      }

    }else{
      this.stado = false;
      this.titleState = 'Debe tener un ingreso superior a $800.000'
    }
  }else{
    this.titleState = 'Debe mas de un año y medio en la empresa'
    
  }

    this.tiempo();
  }

  tiempo(){
    setTimeout(() => {
      this.resultCredito = false;
     }, 3500);
  }


validarSalario(event){
  const salario = event.target.value;

  if(salario.indexOf('.') != -1   || salario.indexOf(',') != -1  ){
    this.error('El salario debe ser un numero entero , no puede llevar " , " ni " . "');
    this.validSalario = false;
    }else{

      const  integer = parseInt(salario, 10);

      if(integer < 100000000 && integer > 0 ){
        this.usuarioForm.value.salario = integer;
        this.validSalario = true;
      }else{
        this.error('El salario debe ser entero, positivo y menor que $100.000.000');
        this.validSalario = false;
      }

    }
}

validarFecha(event){

  const fechaInicio  = event.target.value;
  const fechaActual = moment();
  const tiempo = fechaActual.diff(fechaInicio,'days');
  console.log(tiempo);
  if(tiempo <= 0){
    this.error('La fecha de ingreso debe ser inferiror al dia de hoy');
  }else{
    this.validFecha = true;
  }

}


}
