import { createContext } from 'react';

export const TodosContext = createContext(null);

type TodosProviderType = {
  children: React.ReactNode;
};

export const ProvideTodos = ({ children }: TodosProviderType): JSX.Element => {
  return <TodosContext.Provider value={null}>{children}</TodosContext.Provider>;
};
