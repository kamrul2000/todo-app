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
  todoList: Todo[] = this.loadFromLocalStorage(); 
  todo: Todo = this.initTodo;

  get initTodo(): Todo {
    return {
      title: '',
      id: null,
      priority: 'low',  
      date: '',         
      time: '',         
      completed: false  
    };
  }



  addTodo(): void {
    if (!this.todo.date || !this.todo.time) {
      alert('Please fill out both the date and time.');
      return; 
    }

    
    if (this.todo.id) {
      this.todoList = this.todoList.map(o => {
        if (o.id == this.todo.id) {
          o.title = this.todo.title;
          o.priority = this.todo.priority || 'low';
          o.date = this.todo.date;
          o.time = this.todo.time;
        }
        return o;
      });
    } else {
      this.todo.id = Date.now();
      this.todo.priority = this.todo.priority || 'low';
      this.todoList.push({ ...this.todo });
    }


    this.todoList.sort((a, b) => this.getPriorityValue(b.priority || 'low') - this.getPriorityValue(a.priority || 'low'));

    this.todo = this.initTodo;
  }



  editTodo(todo: Todo): void {
    this.todo = { ...todo };
  }

  deleteTodo(id: number | null): void {
    if (id !== null) {
      this.todoList = this.todoList.filter(o => o.id !== id);
    } else {
      console.error('Invalid task ID');
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveToLocalStorage(); 
  }

  getPriorityValue(priority: string): number {
    switch (priority) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }


  saveToLocalStorage(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  loadFromLocalStorage(): Todo[] {
    const saved = localStorage.getItem('todoList');
    return saved ? JSON.parse(saved) : [];
  }
}
