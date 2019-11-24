import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  public fechaActual;
  public fechaMes;
  public fechaAno;
  public fechaDia;
  public fechaValidate = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {

    this.usuarioForm = this.formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
    });
    
    const fecha = new Date();
    this.fechaMes = fecha.getMonth() + 1,
    this.fechaAno = fecha.getFullYear();
    this.fechaDia =  fecha.getDate();

    this.fechaActual = `${this.fechaDia}-${this.fechaMes}-${this.fechaAno}`;

  
  }

  ngOnInit() {
  
  }





  limpiar() {
    this.usuarioForm.reset();
  }


  guardar() {

    console.log(this.usuarioForm.value);
    this.usuarioService.saveUser(this.usuarioForm.value).subscribe(resp => {
      this.info('se guardo');
      this.limpiar();
      this.router.navigate(['login']);
    }, error => {
      console.error('error', error);
        this.error('huvo un problema');
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
      timer: 3000
    });

    Toast.fire({
      type: 'info',
      title: text,
    });
  }

  CalcularDate(event){
    //console.log("feceha for" , event.target.value);
    //console.log("fecha Actual",this.fechaActual)

    const fechaNacimiento = event.target.value;

    const fecha1 :any = moment(fechaNacimiento);
    const fecha2 = moment();
    const edad = fecha2.diff(fecha1,'years');
    // console.log(edad);
    if(edad > 18){
     this.fechaValidate = true;
    }else{
      this.fechaValidate = false;
      this.error('Debe ser mayor de edad');
    }
    
  
  }

}
