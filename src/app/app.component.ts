import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';


@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  public mode = 'list';
  public todos: Todo[] = []; //variavel todo, para tipar usar " : " tipo any (qualquer coisa)
  public title: String='Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) { // toda vez que chamar appComponente, chama o 'todos' e o construtor
    this.form = this.fb.group({ // pegando referencia do form, criando grupo no form builder
      title: ['', Validators.compose([ // title é um item do grupo
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.required // obrigatorio de ser preenchido
      ])]
    });
    this.load(); 
  }

  add() { // adiciona tarefa
    const title = this.form.controls['title'].value; // recuperando valor
    const id = this.todos.length + 1;// identificador unico
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() { // limpa campo de digitação
    this.form.reset();
  }

  remove(todo: Todo) { // metodo , nao precisa marcar como publico
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
       this.todos.splice(index, 1); // metodo deletando, pega index e quantos deletar
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() { //metodo para salvar lista no storage do navegador
    const data = JSON.stringify(this.todos); // converte json em string
    localStorage.setItem('todos', data);

  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode:string) {
    this.mode = mode;
  }
}
