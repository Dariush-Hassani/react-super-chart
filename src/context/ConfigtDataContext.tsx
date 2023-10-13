import { createContext, useContext, useReducer, Dispatch } from 'react';
import {
  ConfigDataActionType,
  ConfigDataContextType,
} from '../types/ConfigDataContextType';

const ConfigDataContext = createContext<ConfigDataContextType>({
  decimal: 0,
  height: 0,
  width: 0,
});
const ConfigDispatchContext = createContext<Dispatch<ConfigDataActionType>>(
  () => {}
);

function dataReducer(
  state: ConfigDataContextType,
  action: ConfigDataActionType
) {
  if (action.type === 'changeDiagramDimension') {
    let newState = state;
    state.diagramHeight = action.diagramHeight;
    state.diagramWidth = action.diagramWidth;
    return {
      ...newState,
    };
  } else {
    return state;
  }
}

export const ConfigDataProvider: React.FC<{
  children: React.ReactNode;
  configData: ConfigDataContextType;
}> = ({ children, configData }) => {
  const [data, dispatch] = useReducer(dataReducer, configData);

  return (
    <ConfigDataContext.Provider value={configData}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigDataContext.Provider>
  );
};

export function useConfigData() {
  return useContext(ConfigDataContext);
}


export function useConfigDispatch() {
  return useContext(ConfigDispatchContext);
}
