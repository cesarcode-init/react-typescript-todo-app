import { useContext } from 'react';

import { motion } from 'framer-motion';

import { TodoI } from 'utils/constants/types';

import styles from '../TodoList.module.css';

import { TodoIcons } from 'utils/constants/icons';

import { TodosContext } from 'contexts/TodosContext';

type Props = {
  todo: TodoI;
};

const Todo = ({ todo }: Props): JSX.Element => {
  const context = useContext(TodosContext);

  const { Edit, Delete } = TodoIcons;

  const handleUpdateToggle = (id: number, todo: string): void => {
    context?.states.editMode.setEditMode({
      status: true,
      payload: { _id: id, todo },
    });
  };

  const handleDeleteTodo = (id: number): void => {
    context?.actions.deleteTodo(id);

    context?.states.errorState.setError(null);
  };

  const handleCompleteTodo = (id: number) => {
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
        style={{
          paddingRight: '10px',
        }}
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
