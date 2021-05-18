import { Component } from '@angular/core'; 
import { Todo } from 'src/models/todo.model';


@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  public todos: Todo[] = []; //variavel todo, para tipar usar " : " tipo any (qualquer coisa)
  public title: String='Minhas Tarefas';

  constructor() { // toda vez que chamar appComponente, chama o todos e o construtor
    this.todos.push(new Todo(1, 'estudar matematica', false)); //se refere ao escopo da classe, acessa todas variaveis e metodos
    this.todos.push(new Todo(2, 'lavar roupa', false)); // push adiciona na lista
    this.todos.push(new Todo(3, 'ir ao mercado', true));
  }

}
