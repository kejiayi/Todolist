import React from 'react';
import TodoItem from './TodoItem';
// class TodoMain extends React.Component {
//   render() {
//     if (this.props.todos.length === 0) {
//       return (
//         <div className="todo-empty">恭喜您，目前没有待办任务！</div>
//       );
//     }
//     return (
//       <ul className="todo-main">
//         {
//                         this.props.todos.map(function (todo, index) {
//                             // {...this.props} 用来传递TodoMain的todos属性和delete、change方法。
// return <TodoItem text={todo.text} isDone={todo.isDone} index={index} {...this.props} />;
//                         })
//                     }
//       </ul>
//     );
//   }
// }

const TodoMain = function TodoMain(props) {
  if (props.todos.length === 0) {
    return (
      <div className="todo-empty">恭喜您，目前没有待办任务！</div>
    );
  }
  return (
    <ul className="todo-main">
      {
                        props.todos.map((todo, index) =>
                            // {...props} 用来传递TodoMain的todos属性和delete、change方法。
                          <TodoItem
                            text={todo.text}
                            isDone={todo.isDone} index={index} {...props}
                          />)
                    }
    </ul>
  );
};

TodoMain.propTypes = {
  todos: React.PropTypes.array,
};
TodoMain.defaultProps = {
  todos: 'some default',
};


export default TodoMain;
