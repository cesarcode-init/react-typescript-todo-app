import { useContext } from 'react';

import { TodoI } from 'utils/constants/types';

import styles from '../TodoList.module.css';

import { TodoIcons } from 'utils/constants/icons';

import { TodosContext } from 'contexts/TodosContext';

type Props = {
  todo: TodoI;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const Todo = ({ todo, setError }: Props): JSX.Element => {
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

    setError(null);
  };

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

        <span className={styles.clicks}>
          <Delete
            className={styles.delete}
            onClick={() => handleDeleteTodo(todo._id)}
          />
        </span>
      </div>
    </li>
  );
};

export default Todo;
