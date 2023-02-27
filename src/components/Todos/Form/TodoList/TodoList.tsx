import { useContext } from 'react';

import styles from './TodoList.module.css';

import { TodosContext } from 'contexts/TodosContext';

import Todo from './Todo/Todo';

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const TodoList = (props: Props): JSX.Element => {
  const context = useContext(TodosContext);

  return (
    <ul className={styles.list}>
      {context?.state && context?.state.length > 0 ? (
        context.state.map((todo) => (
          <Todo key={todo._id} todo={todo} {...props} />
        ))
      ) : (
        <p className={styles.empty}>No tasks yet. Create one!</p>
      )}
    </ul>
  );
};

export default TodoList;
