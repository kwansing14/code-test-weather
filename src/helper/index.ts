import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
// helper funcs
export const getTimeDate = (timestamp: number) => {
  const formatted = fromUnixTime(timestamp);
  const date = format(formatted, 'dd-MM-yyyy');
  const time = format(formatted, 'p');
  return `${date} ${time}`;
};

export const getTemp = (temp: number) => {
  return (temp - 273.15).toFixed(0);
};
