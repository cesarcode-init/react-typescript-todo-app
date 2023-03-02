import styles from '../Form.module.css';

type Props = {
  input: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoInput: React.FC<Props> = ({ input, action }): JSX.Element => {
  return (
    <input
      type="text"
      className={styles.input}
      value={input}
      onChange={action}
    />
  );
};

export default TodoInput;
