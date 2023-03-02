import { createContext, useReducer, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { getLocalStorage, setLocalStorage } from 'utils/services/helpers';

type Context = {
  state: ArrayOfType<Todo>;
  actions: Actions;
  states: {
    editMode: {
      editMode: EditModeType;
      setEditMode: React.Dispatch<React.SetStateAction<EditModeType>>;
    };
    completedTodos: ArrayOfType<Todo>;
    errorState: {
      error: string | null;
      setError: React.Dispatch<React.SetStateAction<null | string>>;
    };
  };
} | null;

type TodosProviderType = {
  children: React.ReactNode;
};

type ArrayOfType<T> = T[];

interface Todo {
  _id: string;
  todo: string;
  completed: boolean;
}

const enum ACTION_TYPES {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
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
        _id: string;
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.DELETE_TODO | ACTION_TYPES.COMPLETE_TODO;
      payload: {
        _id: string;
      };
    };

type EditModeType = {
  status: boolean;
  payload: {
    _id: string | null;
    todo: string | null;
  };
};

interface Actions {
  createTodo: (todo: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: string) => void;
  completeTodo: (id: string) => void;
}

export const TodosContext = createContext<Context>(null);

const initialState: State = [];

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTION_TYPES.ADD_TODO:
      return [
        ...state,
        {
          _id: nanoid(10),
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

    case ACTION_TYPES.COMPLETE_TODO:
      return state.map((todo) => {
        if (todo._id === payload._id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

    default:
      return state;
  }
};

export const ProvideTodos: React.FC<TodosProviderType> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, (): any => {
    return getLocalStorage('todos') ? getLocalStorage('todos') : initialState;
  });

  const [editMode, setEditMode] = useState((): EditModeType => {
    const ret = {
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    };
    return ret;
  });

  const [completedTodos, setCompletedTodos] = useState(
    (): ArrayOfType<Todo> => {
      const ret: ArrayOfType<Todo> = [];
      return ret;
    }
  );

  const [error, setError] = useState<null | string>((): null => {
    const ret = null;
    return ret;
  });

  const createTodo = (todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.ADD_TODO,
      payload: { todo },
    };

    dispatch(action);
  };

  const deleteTodo = (id: string): void => {
    const action: Action = {
      type: ACTION_TYPES.DELETE_TODO,
      payload: {
        _id: id,
      },
    };

    dispatch(action);

    setEditMode({
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    });
  };

  const updateTodo = (id: string, todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.UPDATE_TODO,
      payload: {
        _id: id,
        todo,
      },
    };

    dispatch(action);
  };

  const completeTodo = (id: string): void => {
    const action: Action = {
      type: ACTION_TYPES.COMPLETE_TODO,
      payload: { _id: id },
    };

    dispatch(action);
  };

  useEffect(() => {
    const completedTodos = state.filter((todo) => todo.completed);

    setCompletedTodos(completedTodos);
  }, [state]);

  useEffect(() => {
    setLocalStorage('todos', state);
  }, [state]);

  const actions: Actions = { createTodo, deleteTodo, updateTodo, completeTodo };

  const states = {
    editMode: { editMode, setEditMode },
    completedTodos: completedTodos,
    errorState: { error, setError },
  };

  const values: Context = {
    state,
    actions,
    states,
  };

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
};
