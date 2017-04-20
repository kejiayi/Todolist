

import React from 'react';
import ReactDOM from 'react-dom';
import LocalDb from 'localdb';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoMain from './TodoMain';

class App extends React.Component {
  constructor() {
    super(); // 调用父类的构造函数
    this.allChecked = this.allChecked.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.clearDone = this.clearDone.bind(this);
    this.changTodoState = this.changTodoState.bind(this);
    this.changeTodoItemtText = this.changeTodoItemtText.bind(this);
    this.data = new LocalDb('ReactDemo');
    this.state = {  // 定义组件状态
      todos: this.data.get('todos') || [],
      isAllChecked: false,
    };
  }

// 判断是否所有任务的状态都完成，同步底部的全选框
  allChecked() {
    let isAllChecked = false;
    if (this.state.todos.every(todo => todo.isDone)) {
      isAllChecked = true;
    }
    this.setState({
      todos: this.state.todos,
      isAllChecked,
    });
  }

  // 添加任务，传递给Header组件的方法
  addTodo(todoItem) {
    this.state.todos.push(todoItem); // todo列表
    this.data.set('todos', this.state.todos);
    this.allChecked();
  }

  // 删除当前任务
  deleteTodo(index) {
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos });
    this.data.set('todos', this.state.todos);
  }

  // 清除已完成的任务
  clearDone() {
    const todos = this.state.todo.filter(todo => !todo.isDone);  // 过滤数组中todo.isDone为true的item
    this.setState({
      todos: [todos],
      isAllChecked: false,
    });
    this.data.set('todos', todos);
  }

  // 改变任务状态
  changTodoState(index, isDone, isChangAll = false) {
    if (isChangAll) {  // 操作全部
      this.setState({
        todos: this.state.todos.map(todo => {
          const newTodo = todo;
          newTodo.isDone = isDone;
          return newTodo;
        }),
      });
    } else {  // 操作其中一个todo
      this.state.todos[index].isDone = isDone;
      this.allChecked();
    }
    this.data.set('todos', this.state.todos);
  }

  changeTodoItemtText(index, value) {
    this.state.todos[index].text = value;
    this.setState({
      todos: this.state.todos,
    });
    this.data.set('todos', this.state.todos);
  }

  // 组件渲染
  render() {
    const info = {
      isAllChecked: this.state.isAllChecked,
      todoCount: this.state.todos.length || 0,
      todoDoneCount: (this.state.todos &&
        this.state.todos.filter(todo => todo.isDone)).length || 0,
    };
    return (
      <div className="todo-wrap">
        <TodoHeader addTodo={this.addTodo} />
        <TodoMain
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          changTodoState={this.changTodoState}
          changeTodoItemtText={this.changeTodoItemtText}
        />
        <TodoFooter {...info} changTodoState={this.changTodoState} clearDone={this.clearDone} />
      </div>
    );
  }
}
export { App, TodoHeader, TodoMain, TodoFooter };

ReactDOM.render(<App />, document.getElementById('app'));
