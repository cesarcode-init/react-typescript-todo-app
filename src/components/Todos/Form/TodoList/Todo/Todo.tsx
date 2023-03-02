import { useContext } from 'react';
import { motion } from 'framer-motion';

import styles from '../TodoList.module.css';

import { TodosContext } from 'contexts/TodosContext';

import { TodoI } from 'utils/constants/types';
import { TodoIcons } from 'utils/constants/icons';

type Props = {
  todo: TodoI;
};

const Todo: React.FC<Props> = ({ todo }): JSX.Element => {
  const context = useContext(TodosContext);

  const { Edit, Delete } = TodoIcons;

  const handleUpdateToggle = (id: string, todo: string): void => {
    context?.states.editMode.setEditMode({
      status: true,
      payload: { _id: id, todo },
    });
  };

  const handleDeleteTodo = (id: string): void => {
    context?.actions.deleteTodo(id);

    context?.states.errorState.setError(null);
  };

  const handleCompleteTodo = (id: string) => {
    context?.actions.completeTodo(id);

    context?.states.editMode.setEditMode({
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    });
  };

  return (
    <motion.li
      className={styles.item}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ stiffness: 10 }}
    >
      <p
        className={todo.completed ? styles.crossed : styles.uncrossed}
        onDoubleClick={() => handleCompleteTodo(todo._id)}
      >
        {todo.todo}
      </p>

      <div className={styles.icons}>
        <div style={{ cursor: todo.completed ? 'not-allowed' : '' }}>
          <span
            role="button"
            onClick={() => handleUpdateToggle(todo._id, todo.todo)}
            className={todo.completed ? styles.disabled_block : styles.clicks}
          >
            <Edit
              className={todo.completed ? styles.disabled_edit : styles.edit}
            />
          </span>
        </div>

        <span
          className={styles.clicks}
          role="button"
          onClick={() => handleDeleteTodo(todo._id)}
        >
          <Delete className={styles.delete} />
        </span>
      </div>
    </motion.li>
  );
};

export default Todo;
