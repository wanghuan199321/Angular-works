import { Component, OnInit } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';

import {AuthService} from '../../services/auth.service';
declare var $: any;
declare var validator: any

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthService]
})
export class SignInComponent implements OnInit {

  captcha: string;
  constructor( private authService: AuthService, private  http: Http) {
    this.captcha = authService.captchaUrl;
  }

  getCaptcha(){
    this.captcha = this.authService.getCaptcha();
  }

  //注册数据传输
  doSubmit(formData: any, obj: any){
    let {phone,pwd,captcha} = formData;
    let strData = `phone=${phone}&pwd=${pwd}&captcha=${captcha}`
    this.makePost(strData,obj);
  };

  makePost(strData: string, obj: any): void{
    let  headers: Headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');

    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    options.method = 'POST';
    let bodyStr = strData;
    this.http.post(this.authService.apiUrl+'/sign-in',bodyStr,options).subscribe((res: Response) => {
      if (parseInt(res.json().code)==0){
        alert(res.json().msg)
      }
      if (parseInt(res.json().code)==1){
        console.log(res.json());
        localStorage.setItem('username', res.json().data.phone);
        obj.click();
      }
    });
  }

  ngOnInit() {
  }

}
