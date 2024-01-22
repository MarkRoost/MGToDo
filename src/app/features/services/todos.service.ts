import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../model/todo";

@Injectable()
export class TodosService {
  http = inject(HttpClient);
  todos = signal<Todo[]>([])
  error = signal(false)
  totalCompleted = computed(() => this.todos().filter(t => t.completed).length)
  totalTodos = computed(() => this.todos().filter(t => !t.completed).length)


  load(){
    this.http.get<Todo[]>('http://localhost:3000/todos')
      .subscribe( {
        next: res => {
          this.todos.set(res)
        },
        error: () => {
          this.error.set(true)
        }
      })
  }
  addTodo(input: HTMLInputElement) {
    this.error.set(false)
    //meglio usare i reactive form con i validators
    // if (input
    if(!input.value) return;
    // const newTodo: Todo = {
    //   id: Date.now(),
    //   title: input.value,
    //   completed: false
    // }

    // this.todos.update(todos => [...todos, newTodo])
    this.http.post<Todo>('http://localhost:3000/todos',{
      title: input.value,
      completed: false
    })
      .subscribe({
        next: newTodo => {
          this.todos.update(todos => [...todos, newTodo])
          input.value = ''
        },
        error: ()=> {
          this.error.set(true)
        }
      })
  }

  removeTodo(todoToRemove: Todo) {
    this.error.set(false)
    this.http.delete(`http://localhost:3000/todos/${todoToRemove.id}`)
      .subscribe({
        next: () => {
          this.todos.update(
            todos => todos.filter(todo => todo.id !== todoToRemove.id)
          )
        },
        error: () => {
          this.error.set(true)
        }
      })

  }

  toggleTodo(todoToToggle: Todo) {
    this.error.set(false)
    this.http.patch<Todo>(`http://localhost:3000/todos/${todoToToggle.id}`,
      {
        ...todoToToggle,
        completed : !todoToToggle.completed
      })
      .subscribe({
        next: res => {
          this.todos.update(todos => {
              return todos.map(t => t.id === todoToToggle.id ? res : t);
            }
          )
        },
        error: () => {
          this.error.set(true)
        }
      })

    // this.todos.update(todos => {
    //   return todos.map(
    //     t => t.id === todoToToggle.id ? {...t, completed: !t.completed} : t
    //   )
    // })
  }

}
