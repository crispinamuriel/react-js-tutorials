import React from "react"
import { observer } from "mobx-react"


@observer
export default class TodoList extends React.Component {
  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }

  filter(e) {
    this.props.store.filter = e.target.value
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  render() {
    //expose the store's variables
    const { clearComplete, filter, filteredTodos, todos } = this.props.store

    //map through todos [ { }, { }, { } ]
    const todoLis = filteredTodos.map(todo => (
      //output an array of JSX <li> [ ] buy milk </li>    //with onChange toggleComplete (this, todo)
      <li key={todo.id}>
       <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
       <span>{todo.value}</span>
      </li>
    ))
    console.log(todoLis);
    return (
      <div>
        <h1>todos</h1>
        <input className="new" onKeyPress={this.createNew.bind(this)} />
        <input className="filter" value={filter} onChange={this.filter.bind(this)} />
        <ul>{todoLis}</ul>
        <a href="#" onClick={clearComplete}>Clear Complete</a>
      </div>
    );
  }
}
