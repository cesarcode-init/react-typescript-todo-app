import { TodoI } from 'utils/constants/types';

import styles from '../TodoList.module.css';

type Props = {
  todo: TodoI;
};

const Todo = ({ todo }: Props): JSX.Element => {
  return (
    <li className={styles.item}>
      <p
        style={{
          paddingRight: '10px',
        }}
        className={todo.completed ? styles.crossed : styles.uncrossed}
      >
        {todo.todo}
      </p>
    </li>
  );
};

export default Todo;
