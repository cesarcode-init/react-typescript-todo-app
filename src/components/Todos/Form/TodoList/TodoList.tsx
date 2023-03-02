import { useContext } from 'react';

import styles from './TodoList.module.css';

import { TodosContext } from 'contexts/TodosContext';

import Todo from './Todo/Todo';

const TodoList: React.FC = (): JSX.Element | null => {
  const context = useContext(TodosContext);

  if (!context) return null;

  const { state } = context;

  return (
    <ul className={styles.list}>
      {state && state.length > 0 ? (
        state.map((todo) => <Todo key={todo._id} todo={todo} />)
      ) : (
        <p className={styles.empty}>No tasks yet. Create one!</p>
      )}
    </ul>
  );
};

export default TodoList;
