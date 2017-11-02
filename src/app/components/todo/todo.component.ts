import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title: string;
  todos: any[];
  choice: number;

  constructor() {
    this.title = 'todo works';
    this.todos = [
      {text: '苹果', completed: true},
      {text: 'angular', completed: false},
      {text: '拯救世界', completed: true}
    ];
    this.choice = 1;
  }

  ngOnInit() {

  }
  remove(index):void{
    if ( this.todos[index].completed) {
      this.todos[index].completed = false;
    }
    else {
      this.todos[index].completed = true;
    }
  }


  addTodo(val): void {
    if (val.trim().length > 0) {
      let obj: object = {
        text: val,
        completed: true
      };
      this.todos.push(obj);
    }
  }

  nextChoice() {
    this.choice += 1;
    if (this.choice > 3) {
      this.choice = 1;
    }
  }
}
