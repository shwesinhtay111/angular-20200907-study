Code install in your local
============================
    1)git clone myrepository
    
    2)npm install
    
    3)ng serve
    
    4)localhost:4200 type in your browser, will open angular ui
    
  Code Link
  ==============
   . Frontend is here
   
   . Backend is https://github.com/shwesinhtay111/angular-20200907-study-springboot


My study nodes in angular 9
============================
    -  Angular knowledge Should know:
    ===================================
    ===================================
          -angular template binging
          ===========================
            . For form, #todoForm="ngForm", check by -> *ngIf="todoForm.dirty && todoForm.invalid"
            . For ngModel two way binding, #description="ngModel" [(ngModel)]="todo.description", check by -> description.invalid"
            
              <div class="container">
                  <br />
                  <h1>Todo Task Creation</h1><br />
                  <hr><br />
                  <div class="alert alert-warning" *ngIf="todoForm.dirty && todoForm.invalid">Enter valid values</div>
                  <div class="alert alert-warning" *ngIf="todoForm.dirty && targetDate.invalid">Enter valid targetDate</div>
                  <div class="alert alert-warning" *ngIf="todoForm.dirty && description.invalid">Enter at least 10 length</div>
                  <form (ngSubmit)="!todoForm.invalid && saveTodo()" #todoForm="ngForm">
                      <fieldset class="form-group">
                          <label>Description </label>
                          <input type="text" #description="ngModel" [(ngModel)]="todo.description" name="description" required class="form-control" minlength="10">
                      </fieldset>
                      <fieldset class="form-group">
                          <label>Target Date </label>
                          <input type="date" #targetDate="ngModel" [ngModel]="todo.targetDate | date: 'yyyy-mm-dd'"
                              (ngModelChange)="todo.targetDate = $event" name="targetDate" required class="form-control">
                      </fieldset>
                      <button type="submit" class="btn btn-primary">Save</button>
                  </form>

              </div>
              
              
          -angular build in form css validation
          ======================================
          
            .ng-invalid:not(form){
                border-left: 5px solid red;
            }

          -properties binding, event binding and two-way binding
          =======================================================
            <small *ngIf = 'invalidLogin'>{{errorMessage}}</small>
            <div>
                Username: <input type="text" name="username" [(ngModel)]="username">
                Password: <input type="password" name="password" [(ngModel)]="password">
                Username:{{username}}
                <button (click)=handleLogin()>Login</button>
            </div>
            
          -routing (edit in app-routing.module.ts)
          ========================================
            const routes: Routes = [
                { path: 'login', component: LoginComponent },
                { path: 'welcome', component: WelcomeComponent}
              ];
              
           - route from login to welcome pages
           =====================================
           
              1) constructor(private router: Router) { }
              2) this.router.navigate(['welcome']);
              
            - activate route in welcome
            ================================
            
               1)constructor(private route: ActivatedRoute) { }
               2)ngOnInit() {
                   this.name = this.route.snapshot.params.name;
                  }
                  
             -ngFor
             =========
             
                1)todos = [
                  {id: 1, description: 'Learn to Dance' },
                  {id: 2, description: 'Learn to Angular'},
                  {id: 3, description: 'Learn to Spring Boot'},
                  {id: 4, description: 'Learn to React'}
                   ];
                 2) <tr *ngFor='let todo of todos'>
                      <td>{{todo.id}}</td>
                      <td>{{todo.description}}</td>
                    </tr>
                    
            -link todos in welcome
            ========================
            
              1)<a routerLink='/todos'>Here</a>
              
            -create class in  todo 
            ========================
            
              1)write in (.ts) file above @Component
                export class Todo {
                  constructor(
                      public id: number,
                      public description: string,
                      public done: boolean,
                      public targetDate: Date
                     ) {}
                  }
               2)<tr *ngFor='let todo of todos'>
                      <td>{{todo.id}}</td>
                      <td>{{todo.description}}</td>
                    </tr>
                    
             - Pipe
             ======
             
              <tr *ngFor='let todo of todos'>
                <td>{{todo.id}}</td>
                <td>{{todo.description}}</td>
                <td>{{todo.targetDate | date}}</td>
               <td>{{todo.done}}</td>
              </tr>
            
            - Add bootstrap 4 in angular
            =============================
                In style.css,added as:
                 -link search in chrome as 
                  unpkg bootstrap
                
                @import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
                
             - Service Creation
             =====================
             
               1)In service file write as ---->
               
                  constructor() { }
                  authenticate(username, password) {
                    if (username === 'shwesin' && password === 'shwesin') {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  
               2) constructor(private router: Router,
                  private hardcodedAuthenticationService: HardcodedAuthenticationService) { }
                
               3) From --->
                
                      if (this.username === 'shwesin' && this.password === 'shwesin') {
                      // Redirect to Welcome Page
                      this.router.navigate(['welcome', this.username]);
                      this.invalidLogin = false;
                    } else {
                      this.invalidLogin = true;
                    }
                  }
                  
                 Change To --->
                 
                   if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
                  // Redirect to Welcome Page
                    this.router.navigate(['welcome', this.username]);
                    this.invalidLogin = false;
                  } else {
                    this.invalidLogin = true;
                  }
                }
                
            - Session Storage
            ================
              Check in chrome, Inspect->Application->Session Storage:
              
              1)sessionStorage.setItem('authenticaterUser', username);
              
              -------------------------------------------------------
              
              If you want log in user right or not:
              
                  authenticate(username, password) {
                    console.log('before' + this.isUserLoggedIn());
                    if (username === 'shwesin' && password === 'shwesin') {
                      sessionStorage.setItem('authenticaterUser', username);
                      console.log('after' + this.isUserLoggedIn());
                      return true;
                    } else {
                      return false;
                    }
                }
                isUserLoggedIn() {
                  let user = sessionStorage.getItem('authenticaterUser');
                  return !(user === null);
                }
              
            - Enable menu link based on user authentication token
            =======================================================
            
              1)constructor(public hardcodedAuthenticationService:
                      HardcodedAuthenticationService) { }
                      
              2)<ul class="navbar-nav">
                    <li><a *ngIf="hardcodedAuthenticationService.isUserLoggedIn()" routerLink="/welcome/shwesin" class="nav-link">Home</a></li>
                    <li><a *ngIf="hardcodedAuthenticationService.isUserLoggedIn()" routerLink="/todos" class="nav-link">Todos</a></li>
                </ul>
                <ul class="navbar-nav navbar-collapse justify-content-end">
                    <li><a *ngIf="!hardcodedAuthenticationService.isUserLoggedIn()" routerLink="/login" class="nav-link">Login</a></li>
                    <li><a *ngIf="hardcodedAuthenticationService.isUserLoggedIn()" routerLink="/logout" class="nav-link">Logout</a></li>
                </ul>
                
                3)In chrome Inspect->Application->Session Storage->Clear  --- can test
                
            - Implement logout to remove user authentication token
            ==========================================================
            
            
              1) In hardcodedAuthenticationService,
                  logout() {
                    sessionStorage.removeItem ('authenticaterUser');
                  }
                  
              2) In logout.component.ts
                  constructor(
                    public hardcodedAuthenticationService: HardcodedAuthenticationService) { }

                  ngOnInit() {
                    this.hardcodedAuthenticationService.logout();
                  }

              3) In UI, click logout, occur login
              
              
           - Secure component using routeGuard
           =========================================
            -without login , you can not go other link , making as follows:
            
              1) In route-guard.service.ts
                  export class RouteGuardService implements CanActivate {
                      constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService,
                                  private router: Router) { }
                      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
                        if (this.hardcodedAuthenticationService.isUserLoggedIn()) {
                          return true;
                          
                        } else {
                          this.router.navigate(['login']);
                          return false;
                        }
                      }
                  }

                  
              2) In app-routing.module.ts
              const routes: Routes = [
                  { path: '', component: LoginComponent },
                  { path: 'login', component: LoginComponent },
                  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService]},
                  { path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService]},
                  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
                  { path: '**', component: ErrorComponent}
              ];
              
              
         - Getting welcome message, Connect Angular frontend to spring boot Restful API
         ==================================================================================
              . can subscribe many times, check in chrome Inspect->Network
              . @CrossOrigin(origins="http://localhost:4200") - to use another server
         
            In spring boot ----->
            
                  package com.ssh.angular;
                  import org.springframework.web.bind.annotation.GetMapping;
                  import org.springframework.web.bind.annotation.PathVariable;
                  import org.springframework.web.bind.annotation.RestController;

                  //Controller
                  @CrossOrigin(origins="http://localhost:4200")
                  @RestController
                  public class HelloWoldController {
                    //GET
                    // URI - /hello-world
                    // method - "Hello World"
                    //	@RequestMapping(method = RequestMethod.GET, path = "/hello-world")
                    @GetMapping(path = "/hello-world")
                    public String helloWorld() {
                      return "Hello World";
                    }


                    // hello world bean
                    @GetMapping(path = "hello-world-bean")
                    public HelloWorlBean helloWorldBean() {
                      return new HelloWorlBean("Hello World");
                    }

                    // hello-world/path-variable/shwesin
                    @GetMapping(path = "/hello-world/path-variable/{name}")
                    public HelloWorlBean helloWorldPathVariable(@PathVariable String name) {
                      return new HelloWorlBean(String.format("Hello World, %s", name));
                    }
                  }
                  -------------------------------------------------------------------------------------------
                  package com.ssh.angular;

                  public class HelloWorlBean {

                    private String message;

                    public HelloWorlBean(String message) {
                      this.message = message;
                    }

                    public String getMessage() {
                      return message;
                    }

                    public void setMessage(String message) {
                      this.message = message;
                    }

                    @Override
                    public String toString() {
                      //return "HelloWorlBean [message=" + message + "]";
                      return String.format("HelloWorldBean [message=%s]",message);
                    }
                  }


            In angular ----->
            
            1) in welcome.component.ts:
            
                welcomeMessageFromService: string;
                constructor(private route: ActivatedRoute,
                            private service: WelcomeDataService) { }
                            
                -----------------------------------------------------
                
               getWelcomeMessage() {
                  // console.log(' Welcome message ' );
                  console.log(this.service.executeHelloWorldBeanService());
                  // can subscribe many times, check in chrome Inspect->Network
                  this.service.executeHelloWorldBeanService().subscribe(
                    response => this.handleSuccessfulResponse(response)
                  );

                  console.log('last line of getWelcomeMessage');
                }
                handleSuccessfulResponse(response) {
                  // console.log(response);
                  // console.log(response.message);
                  this.welcomeMessageFromService = response.message;
                }
             
           2)in welcome.component.html:
           
                <h3>Click here to customized welcome message -
                    <button (click)="getWelcomeMessage()" class="btn btn-primary">Welcome Message </button>
                </h3><br />

                <h3 *ngIf='welcomeMessageFromService'>Your customized welcome message -
                    <p class="text-success">{{ welcomeMessageFromService }}</p>
                </h3>
                
           3)in welcome-data.service.ts:
           
                import { Injectable } from '@angular/core';
                import { HttpClient } from '@angular/common/http';

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
                }

                
                
            4)In app.module.ts, imports HttpClientModule :
            
                imports: [
                    BrowserModule,
                    AppRoutingModule,
                    FormsModule,
                    HttpClientModule
                  ],
                  
                  
          - Handle Error Response
          ========================
            1) In spring boot controller,
              @GetMapping(path = "hello-world-bean")
              public HelloWorlBean helloWorldBean() {
                throw new RuntimeException ("Some Error has Happened");
                // return new HelloWorlBean("Hello World Service");
              }
              
            2)In angular welcome.component.ts,
              handleErrorResponse(error) {
                console.log(error);
                console.log(error.error);
                console.log(error.error.message); 
                this.welcomeMessageFromService = error.error.message;
             }
             
             -------------------------------
             
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

        - Call HTTP Service with path variable
            1)In welcome-data.service.ts,
                executeHelloWorldServiceWithPathVariable(name) {
                    // console.log('Execute Hello World Bean Service');
                    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`);
                  }
              
            2) In welcome.component.ts,
                getWelcomeMessageWithPathVariable() {
                    // console.log(' Welcome message ' );
                    console.log(this.service.executeHelloWorldBeanService());
                    // can subscribe many times, check in chrome Inspect->Network
                    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
                      response => this.handleSuccessfulResponse(response),
                      error => this.handleErrorResponse(error)
                      );
                  }
                
             3) In welcome.component.html,
                <h3>Click here to customized welcome message -
                  <button (click)="getWelcomeMessageWithPathVariable()" class="btn btn-primary">Welcome Message </button>
                </h3><br />

          - Designing restful service for todo resource in spring boot
              1) Create todo package(Todo-class,service,controller) in backend

              
              
           
              

            
              
              
    -  Create Components and Services
    ==================================
    ==================================
    
      - Create components
      ====================
      . ng g component name
          - welcome
          - login
          - error
          - listTodos
          - menu
          - footer
          - logout
          - todo
          
     - Create Service
     =================
     
          -ng g service service/hardcodedAuthentication
          -ng g service service/routeGuard
          -ng g service service/data/welcomeData
          -ng g service service/data/todoData






# SshAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
