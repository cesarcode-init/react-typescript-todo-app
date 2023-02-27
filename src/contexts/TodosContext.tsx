import { createContext, useReducer } from 'react';

export const TodosContext = createContext(null);

type TodosProviderType = {
  children: React.ReactNode;
};

type ArrayOfType<T> = T[];

interface Todo {
  _id: number;
  todo: string;
  completed: boolean;
}

const enum ACTION_TYPES {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
}

type State = ArrayOfType<Todo>;

type Action =
  | {
      type: ACTION_TYPES.ADD_TODO;
      payload: {
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.UPDATE_TODO;
      payload: {
        _id: number;
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.DELETE_TODO;
      payload: {
        _id: number;
      };
    };

const initialState: State = [];

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTION_TYPES.ADD_TODO:
      return [
        ...state,
        {
          _id: Date.now(),
          todo: payload.todo,
          completed: false,
        },
      ];

    case ACTION_TYPES.UPDATE_TODO:
      return state.map((todo) => {
        if (todo._id === payload._id) {
          todo.todo = payload.todo;
        }
        return todo;
      });

    case ACTION_TYPES.DELETE_TODO:
      return state.filter((todo) => todo._id !== payload._id);

    default:
      return state;
  }
};

export const ProvideTodos = ({ children }: TodosProviderType): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TodosContext.Provider value={null}>{children}</TodosContext.Provider>;
};