import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'shwesin';
  password = '';
  errorMessage = 'Invalid Creditial ! Username & Password Wrong';
  invalidLogin = false;
  constructor(private router: Router,
              private hardcodedAuthenticationService: HardcodedAuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService ) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(this.username);
    // if (this.username === 'shwesin' && this.password === 'shwesin') {
     if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
    // Redirect to Welcome Page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin() {
     this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
       data => {
         console.log(data);
         this.router.navigate(['welcome', this.username]);
         this.invalidLogin = false;
       },
       error => {
         console.log(error);
         this.invalidLogin = true ;
       }
     );
    }
    handleJWTAuthLogin() {
      this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true ;
        }
      );
     }
}
