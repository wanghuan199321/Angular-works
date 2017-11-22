import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { DatePipe } from '@angular/common';
import { AuthService } from "../../services/auth.service";
declare var $: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  constructor( private http: Http,
               private authService: AuthService,
               private datePipe: DatePipe ) {}

  makeGetUserList(){
    let url='http://127.0.0.1:3009/api/get-users-list';
    this.http.get(url).subscribe((res:Response)=>{
      let resData = res.json();

      if (parseInt(resData.code) == 1 ){
        let dataArr = this.getDataArr(resData.data);
        this.renderTable(dataArr);
      }
    })
  }

  getDataArr(userSet){
    var _userArr = userSet;
    var jsoncount =_userArr.length;
    var userData =  new Array();

    for(var i=0;i<jsoncount;i++)
    {
      var _arr = new Array();
      _arr[0]= _userArr[i].realName;
      _arr[1]= _userArr[i].nickName;
      if(parseInt(_userArr[i].gender)==1)
      {
        _arr[2]= "男";
      }
      if(parseInt(_userArr[i].gender)==0)
      {
        _arr[2]= "女";
      }
      _arr[3]= _userArr[i].phone;
      _arr[4]= _userArr[i].age;
      _arr[5]= _userArr[i].address;
      _arr[6]= this.datePipe.transform(
        _userArr[i].createAt, 'yyyy-MM-dd HH:mm:ss');
      _arr[7]= '<button class="btn btn-default btn-sm"  data-toggle="modal" data-target="#editModal" onclick="edit(\''+_userArr[i]._id+'\')"> \
			 <span class="glyphicon glyphicon-pencil"></span> \
		  </button>  \
		<button class="btn btn-danger btn-sm" data-toggle="modal" \
		 data-target="#deleteModal" onclick="edit(\''+_userArr[i]._id+'\')"> \
		<span class="glyphicon glyphicon-trash"></span> \
	</button>';
      userData[i]=_arr;
    }

    return userData;
  }

  renderTable(userSet) {
    var columns=[
      { title: "姓名" },
      { title: "昵称" },
      { title: "性别" },
      { title: "手机号码" },
      { title: "出生年月" },
      { title: "地址" },
      { title: "创建时间" },
      { title: "操作",orderable: false }
    ];
    $('#example').DataTable( {
      data:userSet,
      columns: columns
    } );
  }

  ngOnInit() {
    this.makeGetUserList();
  }

}
