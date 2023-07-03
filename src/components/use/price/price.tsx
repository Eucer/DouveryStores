import numeral from 'numeral';
const formCurrency = '$0,0.00';
export const UsePrice = ({ price }: any) => (
  <>{numeral(price).format(formCurrency)}</>
);
