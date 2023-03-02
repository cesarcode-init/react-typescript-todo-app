import { useContext } from 'react';

import styles from './Tracker.module.css';

import { TodosContext } from 'contexts/TodosContext';

const Tracker: React.FC = () => {
  const context = useContext(TodosContext);

  return (
    <div className={styles.counter}>
      <small className={styles.blocks}>
        {context?.state.length === 1
          ? `${context?.states.completedTodos.length} out of ${context?.state.length} task`
          : `${context?.states.completedTodos.length} out of ${context?.state.length} tasks`}
      </small>

      <small className={styles.blocks}>
        {`${
          context?.state.length! - context?.states.completedTodos.length!
        } left`}
      </small>
    </div>
  );
};

export default Tracker;
