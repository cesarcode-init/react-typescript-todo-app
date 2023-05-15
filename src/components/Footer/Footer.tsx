import styles from './Footer.module.css';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/cesarcode-init"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://github.com/cesarcode-init/react-typescript-todo-app"
          target="_blank"
          rel="noreferrer"
        >
          App
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/kaissar-mouelhi/"
          target="_blank"
          rel="noreferrer"
        >
          Kaissar Mouelhi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
