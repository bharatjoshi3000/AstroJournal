export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SEARCH_TODO = 'SEARCH_TODO';

export const addTodo = text => ({
  type: ADD_TODO,
  payload: text,
});

export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: {id, text},
});

export const completeTodo = id => ({
  type: COMPLETE_TODO,
  payload: id,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: id,
});

export const searchTodo = text => ({
  type: SEARCH_TODO,
  payload: text,
});
