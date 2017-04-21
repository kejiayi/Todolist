import React from 'react';
import { findDOMNode } from 'react-dom';
import { assert, expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import { describe, it } from 'mocha';
import App from '../src/components/App';
import TodoHeader from '../src/components/TodoHeader';
import TodoItem from '../src/components/TodoItem';

// function shallowRender(Component) {
//   const renderer = TestUtils.createRenderer();
//   renderer.render(<Component />);
//   return renderer.getRenderOutput();
// }

/*
1.模拟输入value值，增加item
2.点击删除按钮，删除item
3.修改名称，对应的name改变
 */

describe('Dom Rendering', () => {
  it('add an todo item ', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    const appDOM = findDOMNode(app);
    const TodoItemLength = appDOM.querySelectorAll('.todo-item').length;
    const addInput = appDOM.querySelector('.todo-header>input');
    addInput.value = 'add todo';
    TestUtils.Simulate.keyUp(addInput, { key: 'Enter', keyCode: 13, which: 13 });
    assert.equal(appDOM.querySelectorAll('.todo-item').length, TodoItemLength + 1);
  });
});

describe('Dom Rendering', () => {
  it('deleted an todo item ', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    // 添加
    const appDOM = findDOMNode(app);
    const addInput = appDOM.querySelector('.todo-header>input');
    addInput.value = 'add todo';
    TestUtils.Simulate.keyUp(addInput, { key: 'Enter', keyCode: 13, which: 13 });
  // 删除
    const todoItems = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    const todoLength = todoItems.length;
    const deleteButton = todoItems[0].querySelector('.todo-item>button');
    TestUtils.Simulate.click(deleteButton);
    const todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    assert.equal(todoItemsAfterClick.length, todoLength - 1);
  });
});

describe('Dom Rendering', () => {
  it('change an todo item name ', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    // 添加
    const appDOM = findDOMNode(app);
    const addInput = appDOM.querySelector('.todo-header>input');
    addInput.value = 'add todo';
    TestUtils.Simulate.keyUp(addInput, { key: 'Enter', keyCode: 13, which: 13 });
    const changInput = appDOM.querySelector('.recompose');
    changInput.value = 'new todo name';
    TestUtils.Simulate.keyUp(changInput, { key: 'Enter', keyCode: 13, which: 13 });
    const item = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li')[0];
    const TodoItemComponent = TestUtils.scryRenderedComponentsWithType(app, TodoItem)[0];
    assert.isTrue(TodoItemComponent.props.text === 'new todo name');
  });
});
