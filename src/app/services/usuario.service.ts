import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = 'http://localhost:8090/usuarios/';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }


  saveUser(data) {
    return this.http.post(`${url}saveUser/`, data);
  }

  login(data) {

    return this.http.post(`${url}login`, data);
  }

  authenctic(){
    const data = localStorage.length;
    // console.log(data);
    if(data){
      return true;
    }else{
      return false
    }
  }


}
