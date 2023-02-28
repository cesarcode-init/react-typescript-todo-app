import { useState, useContext, useEffect } from 'react';

import TodoInput from './TodoInput/TodoInput';

import { TodosContext } from 'contexts/TodosContext';

import styles from './Form.module.css';
import Tracker from './Tracker/Tracker';

const Form = (): JSX.Element => {
  const context = useContext(TodosContext);

  const [input, setInput] = useState((): string => {
    const ret = '';
    return ret;
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setInput(value);
  };

  const handleUpdateTodo = (id: string, todo: string) => {
    context?.actions.updateTodo(id, todo);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!input.trim().length) {
      context?.states.errorState.setError('Enter a task.');
      return false;
    }

    if (
      context?.states.editMode.editMode.status &&
      context.states.editMode.editMode.payload._id
    ) {
      const { states } = context;
      const { editMode } = states;

      handleUpdateTodo(editMode.editMode.payload._id!, input);

      context?.states.errorState.setError(null);
    } else {
      context?.states.errorState.setError(null);

      context?.actions.createTodo(input);
    }

    context?.states.editMode.setEditMode({
      status: false,
      payload: { _id: null, todo: null },
    });

    setInput('');
  };

  useEffect(() => {
    if (context?.states.editMode.editMode.status) {
      setInput(context.states.editMode.editMode.payload.todo!);
    }
  }, [context?.states.editMode]);

  useEffect(() => {
    if (!context?.states.editMode.editMode.status) {
      setInput('');
    }
  }, [context?.states.editMode.editMode.status]);

  useEffect(() => {
    if (input.trim().length > 0) {
      context?.states.errorState.setError('');
    }
  }, [input, context?.states.errorState]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div>
        <TodoInput input={input} action={handleInputChange} />
      </div>

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
