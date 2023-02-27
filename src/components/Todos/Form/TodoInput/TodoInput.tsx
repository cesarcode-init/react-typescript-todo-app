import styles from '../Form.module.css';

type Props = {
  input: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoInput = ({ input, action }: Props): JSX.Element => {
  return (
    <input
      type="text"
      className={styles.input}
      value={input}
      onChange={action}
      autoFocus
    />
  );
};

export default TodoInput;
