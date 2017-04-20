import React from 'react';
// import TodoHeader from './TodoHeader';
// import ReactDOM from 'react-dom';

class TodoItem extends React.Component {
  constructor() {
    super();
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerDelete = this.handlerDelete.bind(this);
    this.handlerKeyUp = this.handlerKeyUp.bind(this);
  }
    // 改变任务是否已完成的状态
  handlerChange() {
    const isDone = !this.props.isDone;
    this.props.changTodoState(this.props.index, isDone);
  }

    // 删除当前任务
  handlerDelete() {
    this.props.deleteTodo(this.props.index);
  }

  handlerKeyUp(event) {
    if (event.keyCode === 13) {
      const value = event.target.value;
      if (!value) {
        return false;
      }
      const newEvent = event;
      newEvent.target.value = '';
      this.props.changeTodoItemtText(this.props.index, value);
    }
    return true;
  }
  render() {
    const className = this.props.isDone ? 'task-done' : '';
    return (
      <li>
        <label htmlFor="secondName">
          <input onKeyUp={this.handlerKeyUp} type="text" placeholder="改名称" />
          <span className={className}>{this.props.text}</span>
        </label>
        <button ref={delButton => { this.TodoItem = delButton; }} className="btn btn-danger" onClick={this.handlerDelete}>删除</button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  isDone: React.PropTypes.bool.isRequired,
  changTodoState: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
  deleteTodo: React.PropTypes.func.isRequired,
  text: React.PropTypes.node.isRequired,
  changeTodoItemtText: React.PropTypes.func.isRequired,
};

export default TodoItem;
