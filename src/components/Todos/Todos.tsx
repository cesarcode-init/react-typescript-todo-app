import Form from './Form/Form';

import styles from './Todos.module.css';

const Todos = (): JSX.Element => {
  return (
    <div className={styles.Todo}>
      <h4 className={styles.heading}>Todos</h4>

      <Form />
    </div>
  );
};

export default Todos;
