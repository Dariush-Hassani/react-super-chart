import { createContext, useReducer, Dispatch, useContext } from 'react';
import { DataActionType, DataContextType } from '../types/DataContextType';
import { dateArrayNormalizer } from '../helperFunctions';
import * as d3 from 'd3';

const initData: DataContextType = {
  initData: [],
  shownData: [],
  shownRange: {
    start: 0,
    end: 0,
  },
  minMaxInitDate: {
    min: 0,
    max: 0,
  },
  minMaxInitPrice: {
    min: 0,
    max: 0,
  },
  minMaxShownDate: {
    min: 0,
    max: 0,
  },
  minMaxShownPrice: {
    min: 0,
    max: 0,
  },
};

const DataContext = createContext<DataContextType>(initData);
const DataDispatchContext = createContext<Dispatch<DataActionType>>(() => {});

function dataReducer(state: DataContextType, action: DataActionType) {
  switch (action.type) {
    case 'changeInitData': {
      let newInitData = action.initData;
      let newShownData = action.initData;

      let initDates = newInitData.map((x) => x.date);
      let normalizeInitDates = (dateArrayNormalizer(initDates) ?? []).sort(
        (a, b) => a - b
      );
      newInitData.forEach((x, i) => (x.date = normalizeInitDates[i]));

      let newMinMaxInitPrice = d3.extent([
        ...newInitData.map((x) => x.high),
        ...newInitData.map((x) => x.low),
        ...newInitData.map((x) => {
          return x.position?.sl || 0;
        }),
        ...newInitData.map((x) => {
          return x.position?.tp || 0;
        }),
      ]);
      let newMinMaxShownPrice = newMinMaxInitPrice;

      let lastIndex = normalizeInitDates.length - 1;

      let newState: DataContextType = {
        initData: newInitData,
        shownData: newShownData,
        minMaxInitDate: {
          min: normalizeInitDates[0] ?? 0,
          max: normalizeInitDates[lastIndex] ?? 0,
        },
        minMaxShownDate: {
          min: normalizeInitDates[0] ?? 0,
          max: normalizeInitDates[lastIndex] ?? 0,
        },
        shownRange: {
          start: normalizeInitDates[0] ?? 0,
          end: normalizeInitDates[lastIndex] ?? 0,
        },
        minMaxInitPrice: {
          min: newMinMaxInitPrice[0] ?? 0,
          max: newMinMaxInitPrice[1] ?? 0,
        },
        minMaxShownPrice: {
          min: newMinMaxShownPrice[0] ?? 0,
          max: newMinMaxShownPrice[1] ?? 0,
        },
      };
      return newState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const DataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initData);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}
