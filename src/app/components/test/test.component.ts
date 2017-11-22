import { Component, OnInit } from '@angular/core';
import { User } from "../../classes/user";
import { Employee } from "../../enums/employee.enum"



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {

  users: User[];
  employee: string;
  empl: number;

  constructor() {
    this.users = [new User('Jack', '13808013567@163.com', 20, 123456789),
      new User('Jack', '13808013568@163.com', 21, 123456789),
      new User('Jack', '13808013569@163.com', 22, 123456789)];
    this.employee = Employee[1];
    this.empl = Employee.Admin;
  }

  ngOnInit() {
  }

}
