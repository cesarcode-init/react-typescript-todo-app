// Providers
import { ProvideTodos } from 'contexts/TodosContext';

// Components
import Todos from 'components/Todos/Todos';

const App = (): JSX.Element => {
  return (
    <ProvideTodos>
      <Todos />
    </ProvideTodos>
  );
};

export default App;
