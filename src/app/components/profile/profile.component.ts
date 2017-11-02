import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  FormGroup, FormControl} from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
declare var validator: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isFemale: string;
  isMale: string;
  gender: any;
  pictureUrl: string;
  //构造函数
  constructor(private fb: FormBuilder, private authService :AuthService, private http: Http) {
    this.isFemale = '';
    this.isMale = '';
    this.pictureUrl='';
  }

  //自定义验证器emailValidator
  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!validator.isEmail(control.value)) {
      return {invalidEmail: false};
    }
  }

  doShowEmail(str: string, phone: string): string {
    let arr = str.split('@');
    let ret = str;
    if (arr[0] === phone && arr[1] === 'xxx.com') {
      ret = '';
    }
    return ret;
  }

  doShowGender(str: any) {
    if (parseInt(str) === 1) {
      this.isMale = 'checked';
    }
    if (parseInt(str) === 0) {
      this.isFemale = 'checked';
    }
  }

  getGender(val) {
    this.gender = val;
  }

  makeGet(): void {
    // this.loading = true;
    let queryStr = `${this.authService.apiUrl}/profile/${localStorage.getItem('username')}`;
    this.http.get(queryStr).subscribe((res: Response) => {
      if(parseInt(res.json().code)==1){
        let resData = res.json().data;
        this.profileForm = this.fb.group({
          'realName':[resData.realName,
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20)
            ])],
          'phone': [resData.phone,Validators.required],
          'email': [this.doShowEmail(resData.email,resData.phone),
            Validators.compose([
              Validators.required,
              this.emailValidator])],
          'nickName': [resData.nickName, Validators.minLength(2)],
          'age': [resData.age],
          'address': [resData.address]
        });
        this.gender = resData.gender;
        this.pictureUrl = `${this.authService.remotUrl}${resData.picture}`;
        this.doShowGender(resData.gender);
      }
    });
  }

  doSubmit(formData: any){
    console.log(formData);
    let {realName,nickName,gender,phone,email,age,address} = formData;
    let strData = `realName=${realName}&nickName=${nickName}&gender=${this.gender}&phone=${phone}&email=${email}&age=${age}&address=${address}`;
    this.makePost(strData);
  }

  makePost(strData: string): void {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    options.method = 'POST';
    this.http.post(this.authService.apiUrl+'/edit-profile', strData,options)
      .subscribe((res: Response) => {
        if(parseInt(res.json().code)==0){
          alert(res.json().msg);
        }
        if(parseInt(res.json().code)==1){
          alert("修改成功");
        }
        // window.location.href = '/profile';
        // this.loading = false;
        // this.router.navigate(['/about']);
      });
  }


  ngOnInit() {
    this.makeGet();
  }

}
