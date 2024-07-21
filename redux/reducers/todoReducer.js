import {
  ADD_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  SEARCH_TODO,
} from '../actions/todoActions';

const initialState = {
  todos: [],
  searchQuery: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {id: Date.now().toString(), text: action.payload, completed: false},
        ],
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {...todo, text: action.payload.text}
            : todo,
        ),
      };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? {...todo, completed: true} : todo,
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case SEARCH_TODO:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
