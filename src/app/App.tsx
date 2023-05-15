import { ProvideTodos } from 'contexts/TodosContext';

import Todos from 'components/Todos/Todos';
import Footer from 'components/Footer/Footer';

const App = (): JSX.Element => {
  return (
    <ProvideTodos>
      <Todos />

      <Footer />
    </ProvideTodos>
  );
};

export default App;
