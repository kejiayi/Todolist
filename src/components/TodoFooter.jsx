import React from 'react';

class TodoFooter extends React.Component {
  constructor() {
    super();
    this.handlerSelectAll = this.handlerSelectAll.bind(this);
    this.handlerDeleteDone = this.handlerDeleteDone.bind(this);
  }
  // 改变任务是否已完成的状态
  handlerSelectAll(e) {
    this.props.changTodoState(null, e.target.checked, true);
    // true表示全部操作。
  }
  // 删除全部已完成的任务
  handlerDeleteDone() {
    this.props.clearDone();
  }
  render() {
    return (
      <div className="todo-footer">
        <span>
          <span className="text-success">已完成{this.props.todoDoneCount}</span>
          / 全部{this.props.todoCount}</span>
      </div>
    );
  }
}

TodoFooter.propTypes = {
  changTodoState: React.PropTypes.func.isRequired,
  clearDone: React.PropTypes.func.isRequired,
  isAllChecked: React.PropTypes.bool.isRequired,
  todoDoneCount: React.PropTypes.number.isRequired,
  todoCount: React.PropTypes.number.isRequired,
};

export default TodoFooter;
