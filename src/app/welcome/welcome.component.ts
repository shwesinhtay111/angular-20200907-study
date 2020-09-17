import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message = 'Some welcome message';
  welcomeMessageFromService: string;
  name = '';
  // ActivateRoute
  constructor(private route: ActivatedRoute,
              private service: WelcomeDataService) { }

  ngOnInit() {
    console.log(this.message);
    console.log(this.route.snapshot.params.name);
    this.name = this.route.snapshot.params.name;
  }
  getWelcomeMessage() {
    // console.log(' Welcome message ' );
    console.log(this.service.executeHelloWorldBeanService());
    // can subscribe many times, check in chrome Inspect->Network
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      );

    console.log('last line of getWelcomeMessage');
  }
  getWelcomeMessageWithPathVariable() {
    // console.log(' Welcome message ' );
    console.log(this.service.executeHelloWorldBeanService());
    // can subscribe many times, check in chrome Inspect->Network
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      );
  }
  handleSuccessfulResponse(response) {
    // console.log(response);
    // console.log(response.message);
    this.welcomeMessageFromService = response.message;
  }
  handleErrorResponse(error) {
    console.log(error);
    console.log(error.error);
    console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
 }

}
export class Class1 {

}

export class Class2 {
}
