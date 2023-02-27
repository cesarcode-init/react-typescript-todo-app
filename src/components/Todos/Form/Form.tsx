import { useState, useContext } from 'react';

import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';

import { TodosContext } from 'contexts/TodosContext';

import styles from './Form.module.css';

const Form = (): JSX.Element => {
  const context = useContext(TodosContext);

  const [input, setInput] = useState((): string => {
    const ret = '';
    return ret;
  });

  const [error, setError] = useState<null | string>((): null => {
    const ret = null;
    return ret;
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setInput(value);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!input.trim().length) {
      setError('Enter a task.');
    }

    if (input.trim().length) {
      setError(null);

      context?.actions.createTodo(input);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <TodoInput input={input} action={handleInputChange} />

      {error && <small className={styles.error}>{error}</small>}

      <TodoList />
    </form>
  );
};

export default Form;
