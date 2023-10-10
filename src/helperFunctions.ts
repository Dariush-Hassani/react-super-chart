import DataType from './types/DataType';

export const dateArrayNormalizer = (
  data: (string | number)[]
): number[] | undefined => {
  try {
    if(data.length === 0) return [];
    let rv: number[] = [];
    data.forEach((date) => {
      if (typeof date === 'string') rv.push(new Date(date).getTime());
      else rv.push(date);
    });
    return rv;
  } catch (error) {
    throw new Error('Data not suite for date array normalizer!');
  }
};

export const dataNormalizer = (data: any[]): DataType[] => {
  try {
    if(data.length === 0) return [];
    let rv: DataType[] = [];
    data.forEach((x) => {
      rv.push({
        close: x?.close ?? 0,
        date: x?.date ?? 0,
        high: x?.high ?? 0,
        low: x?.low ?? 0,
        open: x?.open ?? 0,
        position: x?.position
          ? {
              sl: x?.position?.sl,
              tp: x?.position?.tp,
              positionType: x?.positionType,
              positionValue: x.positionValue,
            }
          : undefined,
      });
    });
    return rv;
  } catch (error) {
    throw new Error('Data not suite for this chart!');
  }
};
