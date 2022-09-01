import { createContext } from 'react';
import AllUseStates from '../hook/AllUseStates';

const Context = createContext({});

export function ContextProvider(props) {

  const valuesProvider = AllUseStates();

  return (
    <Context.Provider value={valuesProvider}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;