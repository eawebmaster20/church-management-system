import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  email:string = '';
  password:string = '';
  emailRegex =/\w+@[a-z]{2,12}.[a-z]{1,6}/;
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
    ? this.api.signIn({email:this.email, password:this.password}).subscribe({
      next:(value)=>console.log(value),
      error:(err)=>console.log(err),
      complete:()=>console.log('terminated')
    })
    :console.log('invalid input')
  }

}
