import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuarioForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarioForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {

  }


  login() {

    console.log(this.usuarioForm.value);
    this.usuarioService.login(this.usuarioForm.value).subscribe((resp: any) => {

      console.log(resp);
      if (resp.length !== 0) {
        localStorage.setItem('usuario', JSON.stringify(resp));
        this.router.navigate(['creditos']);
        this.info('Bienvenido');
        console.log(' se encontro');

      } else {
        console.log(' no se encontro');
        this.error('usuario o contraseña incorrecta');

      }
      
    },error =>{
      console.log('error',error);
      this.error('error al conectar con el servidor');
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



}
