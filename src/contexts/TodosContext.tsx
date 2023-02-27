import { createContext, useReducer, useState, useEffect } from 'react';

export const TodosContext = createContext<Context>(null);

type Context = {
  state: ArrayOfType<Todo>;
  actions: Actions;
  states: {
    editMode: {
      editMode: EditModeType;
      setEditMode: React.Dispatch<React.SetStateAction<EditModeType>>;
    };
    completedTodos: ArrayOfType<Todo>;
  };
} | null;

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
        _id: number;
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.DELETE_TODO | ACTION_TYPES.COMPLETE_TODO;
      payload: {
        _id: number;
      };
    };

type EditModeType = {
  status: boolean;
  payload: {
    _id: number | null;
    todo: string | null;
  };
};

interface Actions {
  createTodo: (todo: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todo: string) => void;
  completeTodo: (id: number) => void;
}

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

export const ProvideTodos = ({ children }: TodosProviderType): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const createTodo = (todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.ADD_TODO,
      payload: { todo },
    };

    dispatch(action);
  };

  const deleteTodo = (id: number): void => {
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

  const updateTodo = (id: number, todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.UPDATE_TODO,
      payload: {
        _id: id,
        todo,
      },
    };

    dispatch(action);
  };

  const completeTodo = (id: number): void => {
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

  const actions: Actions = { createTodo, deleteTodo, updateTodo, completeTodo };

  const states = {
    editMode: { editMode, setEditMode },
    completedTodos: completedTodos,
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
