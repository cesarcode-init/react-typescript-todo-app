import Form from './Form/Form';

import styles from './Todos.module.css';

import TodoList from './Form/TodoList/TodoList';

const Todos = (): JSX.Element => {
  return (
    <div className={styles.Todo}>
      <h4 className={styles.heading}>Todos</h4>

      <Form />

      <TodoList />
    </div>
  );
};

export default Todos;
