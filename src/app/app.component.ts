import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpErrorComponent} from "./shared/components/http-error.component";
import {TodosSummaryComponent} from "./features/components/todos-summary.component";
import {TodosFormComponent} from "./features/components/todos-form.component";
import {TodosListComponent} from "./features/components/todos-list.component";
import {TodosService} from "./features/services/todos.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpErrorComponent, TodosSummaryComponent, TodosFormComponent, TodosListComponent],
  providers:[
    TodosService
  ],
  template: `
      <div class="centered-page sm flex flex-col gap-3">
        <h1 class="page-title">Todo List</h1>
<!--Error        -->
        @if(todoService.error()){
          <app-http-error
            class=""
            msg = 'Server Error'
          >

          </app-http-error>
        }
<!--Recap-->
        <app-todos-summary
        [completed] = "todoService.totalCompleted()"
        [todos] = "todoService.totalTodos()"
        >

        </app-todos-summary>

<!--Form-->
        <app-todos-form
          (addTodo)="todoService.addTodo($event)"
        >
        </app-todos-form>
<!--List-->
        <app-todos-list
            [todos]="todoService.todos()"
            (toggleTodo)="todoService.toggleTodo($event)"
            (removeTodo)="todoService.removeTodo($event)"
        ></app-todos-list>


      </div>
  `,
})
export class AppComponent implements OnInit{
  todoService = inject(TodosService)
  ngOnInit() {
    this.todoService.load()
  }

}



//=============================================
// First Version
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   styles: [``],
//   template: `
//       <div class="centered-page flex flex-col gap-4 items-center">
//
//         <input
//         type="text"
//         (keydown.enter)="addTodo(input)"
//         #input
//         class="input input-bordered"
//         placeholder="Add new todo"
//         >
//         <div *ngFor="let todo of todos"
//         [ngClass]="{
//             'line-through': todo.completed
//          }"
//         >
//             <input
//             type="checkbox"
//             class="checkbox"
//             [checked]="todo.completed"
//             (change)="toggleTodo(todo.id)"
//             >
//             {{todo.title}}
//             <button class="btn" (click)="removeTodo(todo.id)">remove</button>
//         </div>
//         <button class="btn" (click)="saveAll()">Save</button>
//       </div>
//   `
// })
// export class AppComponent {
//   todos: Todo[] = [
//     { id: 1, title: 'Todo 1', completed: true },
//     { id: 2, title: 'Todo 2', completed: false },
//     { id: 3, title: 'Todo 3', completed: true },
//   ]
//
//   addTodo(input:HTMLInputElement) {
//     const newTodo: Todo ={
//       id: Date.now(),
//       title: input.value,
//       completed: false
//     }
//     /*per rispettare il principio di immutabilità*/
//     /*this.todos.push(newTodo)*/
//     this.todos = [...this.todos,newTodo]
//     input.value = '';
//   };
//   removeTodo(id:number) {
//     //per rispettare il principio di immutabilità
//     //const index = this.todos.findIndex(todo => todo.id === id);
//     //this.todos.splice(index,1);
//     this.todos= this.todos.filter(
//       todo => todo.id !== id
//     )
//   }
//
//   toggleTodo(id:number) {
//     //per rispettare il principio di immutabilità
//     // const index = this.todos.findIndex(todo => todo.id === id);
//     // this.todos[index].completed = !this.todos[index].completed
//     this.todos = this.todos.map(
//       todo => {
//         return todo.id === id ? {...todo, completed: !todo.completed}: todo;
//       }
//     )
//   }
//
//   saveAll() {
//     console.log(this.todos)
//   }
// }
//
// type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
// }
