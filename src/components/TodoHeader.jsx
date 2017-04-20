import React from 'react';

class TodoHeader extends React.Component {
  // 绑定键盘回车事件，添加新任务
  constructor() {
    super();
    this.handlerKeyUp = this.handlerKeyUp.bind(this);
  }
  handlerKeyUp(e) {
    if (e.keyCode === 13) {
      const value = e.target.value;
      if (!value) {
        return false;
      }
      const newTodoItem = {
        text: value,
        isDone: false,
      };
      e.target.value = '';
      this.props.addTodo(newTodoItem); // 使用props调用App组件传过来的方法。
    }
    return true;
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handlerKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    );
  }
}
TodoHeader.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
};

export default TodoHeader; // 导出模块
