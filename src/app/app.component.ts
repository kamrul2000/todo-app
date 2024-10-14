import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Todo } from './model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoList:Todo []=[];
  todo: Todo = this.initTodo;
  get initTodo():Todo{
    return{
      title: '',
      id: null
    }
  }
  addTodo():void{
    console.log(this.todo)
    if(this.todo.id){
      this.todoList=this.todoList.map(o=>{
        if(o.id==this.todo.id){
          o.title=this.todo.title;
        }
        return o;
      })
    }
    else{
      this.todo.id = Date.now();
      this.todoList.push({ ...this.todo });
    }
    
    console.log(this.todoList);
    this.todo=this.initTodo;
  }
  editTodo(todo:Todo):void{
    this.todo={...todo}
  }
  deleteTodo(id:number):void{
    this.todoList=this.todoList.filter(o=>o.id!=id)
  }
}
