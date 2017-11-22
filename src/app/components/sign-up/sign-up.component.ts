import { Component, OnInit } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import {AuthService} from '../../services/auth.service';
declare var $: any;
declare var validator: any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [AuthService]
})
export class SignUpComponent implements OnInit {

  captcha: string;
  invalidPhone: boolean;
  invalidPwd: boolean;
  invalidPwd2: boolean;
  invalidCaptcha: boolean;
  constructor( private authService: AuthService, private  http: Http, ) {
    this.captcha = this.authService.captchaUrl;
    this.invalidPhone = false;
    this.invalidPwd2 = false;
    this.invalidCaptcha = false;
  }

  getCaptcha(){
    this.captcha = this.authService.getCaptcha();
  }

  //注册数据传输
  doSubmit(formData: any, obj: any){
    let {phone,pwd,pwd2,captcha} = formData;
    let strData = `phone=${phone}&pwd=${pwd}&pwd2=${pwd2}&captcha=${captcha}`;
    this.makePost(strData,obj);
  }

  makePost(strData: string,obj: any): void {
    //this.loading = true;
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    options.method = 'POST';
    let bodyStr = strData;
    this.http.post(this.authService.apiUrl+'/signup', bodyStr,options)
      .subscribe((res: Response) => {
        if(parseInt(res.json().code)==0){
          // this.captchaAuth = false;
          alert(res.json().msg);
        }
        if(parseInt(res.json().code)==1){
          //alert(res.json().data.phone);
          localStorage.setItem('username', res.json().data);
          obj.click();
        }

        // this.loading = false;
        // this.router.navigate(['/about']);
      });
  }

  //验证手机号
  doValidatorFormPhone(formData: any){
    if(!validator.isMobilePhone(formData.phone,'zh-CN')){
      this.invalidPhone =  true;
      return false;
    }
    else {
      this.invalidPhone =  false;
    }
  }
  //验证密码
  doValidatorFormPwd(formData: any){
    if(!validator.isLength(formData.pwd,{min: 6, max: 20})){
      this.invalidPwd =  true;
      return false;
    }
    else {
      this.invalidPwd =  false;
    }
  }
  //验证两次密码是否相同
  doValidatorFormPwd2(formData: any){
    if(! (formData.pwd == formData.pwd2) ){
      this.invalidPwd2 =  true;
      return false;
    }
    else {
      this.invalidPwd =  false;
    }
  }
  //验证验证码
  doValidatorFormCaptcha(formData: any){
    console.log(this.captcha);
    if(! (this.captcha == formData.captcha) ){
      this.invalidCaptcha =  true;
      return false;
    }
    else {
      this.invalidCaptcha =  false;
    }
  }

  ngOnInit() {
  }

}
