import { useState, useContext, useEffect } from 'react';

import styles from './Form.module.css';

import { TodosContext } from 'contexts/TodosContext';

import TodoInput from './TodoInput/TodoInput';
import Tracker from './Tracker/Tracker';

const Form: React.FC = (): JSX.Element => {
  const context = useContext(TodosContext);

  const [input, setInput] = useState((): string => {
    const ret = '';
    return ret;
  });

  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };

  const handleUpdateTodo = (id: string, todo: string): void => {
    if (!context) return;

    const {
      actions: { updateTodo },
    } = context;

    updateTodo(id, todo);
  };

  const handleFormSubmit = (
    evt: React.FormEvent<HTMLFormElement>
  ): boolean | void => {
    evt.preventDefault();

    if (!context) return;

    const {
      states: {
        errorState: { setError },
        editMode: {
          editMode: { status, payload },
          setEditMode,
        },
      },
      actions: { createTodo },
    } = context;

    if (!input.trim().length) {
      setError('Enter a task.');
      return false;
    }

    if (status && payload._id) {
      handleUpdateTodo(payload._id!, input);

      setError(null);
    } else {
      setError(null);

      createTodo(input);
    }

    setEditMode({
      status: false,
      payload: { _id: null, todo: null },
    });

    setInput('');
  };

  useEffect(() => {
    if (!context) return;

    const {
      states: {
        editMode: {
          editMode: { status, payload },
        },
      },
    } = context;

    if (status) {
      setInput(payload.todo!);
    }
  }, [context]);

  useEffect(() => {
    if (!context) return;

    const {
      states: {
        editMode: {
          editMode: { status },
        },
      },
    } = context;
    if (!status) {
      setInput('');
    }
  }, [context]);

  useEffect(() => {
    if (!context) return;

    const {
      states: {
        errorState: { setError },
      },
    } = context;
    if (input.trim().length > 0) {
      setError('');
    }
  }, [input, context]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <TodoInput input={input} action={handleInputChange} />

      {context?.states.errorState.error && (
        <small className={styles.error}>
          {context?.states.errorState.error}
        </small>
      )}

      <Tracker />
    </form>
  );
};

export default Form;
