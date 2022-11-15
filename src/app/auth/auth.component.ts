import { PlaceholderDirective } from "./../shared/placeholder/placeholder.directive";
import { AlertComponent } from "./../shared/alert/alert.component";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    //可以在下方訂閱一次就好
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    //原始程式邏輯
    // if(this.isLoginMode){
    //   this.authService.login(email,password).subscribe(
    //     resData => {
    //       console.log(resData);
    //       this.isLoading = false;
    //     },
    //     errorMessage => {
    //       console.log(errorMessage);
    //       this.error = errorMessage;
    //       this.isLoading = false;
    //     }
    //   );
    // } else {

    // this.authService.signup(email,password).subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }

    // );
    // }

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
