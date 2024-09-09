import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: any;
  email:string = '';
  password:string = '';
  formValid: boolean = true;
  emailRegex =/\w+@[a-z]{2,12}.[a-z]{1,6}/;
  authSubscription: Subscription;
  constructor(
    private router: Router, 
    private api:ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    console.log(e)
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login(){
    console.log(this.email, this.password)
    this.emailRegex.test(this.email)
    ? this.authSubscription = this.api.signIn({email:this.email, password:this.password}).subscribe({
      next:(value)=>{
        console.log(value);
        localStorage.setItem('isLoggedin', 'true')
        this.router.navigate(['/']);
      },
      error:(err)=>console.log(err),
      complete:()=>console.log('terminated')
    })
    :(this.formValid = false,setTimeout(() => {
      this.formValid = true;
    }, 4000));
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
