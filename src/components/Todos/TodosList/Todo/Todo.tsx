import { useContext, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from '../TodoList.module.css';

import { TodosContext } from 'contexts/TodosContext';

import { TodoInterface } from 'utils/constants/types';
import { TodoIcons } from 'utils/constants/icons';

type Props = {
  todo: TodoInterface;
};

const Todo: React.FC<Props> = ({ todo }): JSX.Element | null => {
  const { Options } = TodoIcons;

  const [optionsToggle, setOptionsToggle] = useState((): boolean => {
    const ret = true;
    return ret;
  });

  const optionsReference = useRef<null | HTMLDivElement>(null);

  const context = useContext(TodosContext);

  useEffect(() => {}, []);

  if (!context) return null;

  const {
    states: {
      editMode: { setEditMode },
      errorState: { setError },
    },
    actions: { deleteTodo, completeTodo },
  } = context;

  const { Edit, Delete } = TodoIcons;

  const handleUpdateToggle = (id: string, todo: string): void => {
    setEditMode({
      status: true,
      payload: { _id: id, todo },
    });

    setError(null);
  };

  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id);

    setError(null);
  };

  const handleCompleteTodo = (id: string) => {
    completeTodo(id);

    setEditMode({
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

      <div ref={optionsReference} className={styles.optionsContainer}>
        <span role="button" className={styles.optionsBtn}>
          <Options />
        </span>

        {optionsToggle && (
          <div className={styles.optionsTable}>
            <span role="button" className={styles.btn}>
              <span className={styles.editbtn}>
                <Edit />
              </span>
              <span className={styles.buttonText}>Edit</span>
            </span>

            <span role="button" className={styles.btn}>
              <span>
                <Delete />
              </span>
              <span className={styles.buttonText}>Delete</span>
            </span>
          </div>
        )}
      </div>

      {/* <div className={styles.icons}>
        <div style={{ cursor: todo.completed ? 'not-allowed' : '' }}>
          <span
            role="button"
            onClick={() => handleUpdateToggle(todo._id, todo.todo)}
            className={todo.completed ? styles.disabled_block : styles.buttons}
          >
            <Edit
              className={todo.completed ? styles.disabled_edit : styles.edit}
            />
          </span>
        </div>

        <span
          className={styles.buttons}
          role="button"
          onClick={() => handleDeleteTodo(todo._id)}
        >
          <Delete className={styles.delete} />
        </span>
      </div> */}
    </motion.li>
  );
};

export default Todo;
