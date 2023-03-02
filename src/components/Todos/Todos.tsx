import styles from './Todos.module.css';

import Form from './Form/Form';
import TodoList from './Form/TodoList/TodoList';

const Todos: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Todo List</h4>

      <Form />

      <TodoList />
    </div>
  );
};

export default Todos;
