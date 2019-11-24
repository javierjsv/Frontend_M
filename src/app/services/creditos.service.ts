import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = 'http://localhost:8090/creditos/';
@Injectable({
  providedIn: 'root'
})
export class creditosService {

  constructor(
    private http: HttpClient
  ) { }


  deletecreditos(data) {
    return this.http.post(`${url}deleteEvento`,data);
  }

  savecreditos(data) {
    return this.http.post(`${url}/saveCredito`, data);
  }

  listCredito(id) {
    return this.http.get(`${url}listCredito/${id}`);
  }

  updatecreditos(data) {
    return this.http.put(`${url}/updateEvento`, data);
  }
}
