import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor( public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    // console.log('Execute Hello World Bean Service');
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldServiceWithPathVariable(name) {
    // console.log('Execute Hello World Bean Service');
    // const basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // const headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`);
    // {headers});
  }

  // createBasicAuthenticationHttpHeader() {
  //   const username ='shwesin';
  //   const password = 'shwesin';
  //   const basicAuthHeaderString = 'Basic' + window.btoa(username + ':' +password);
  //   return basicAuthHeaderString;
  // }
}
