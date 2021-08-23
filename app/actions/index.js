import axios from 'axios';

export const getFormattedText = (val) => {
  val = val.replaceAll('.', '');
  val = val.replaceAll('/', '');
  val = val.replaceAll('-', '');
  let temp = '';
  for (let i = 0; i < val.length; i++) {
    if (i === 1) {
      temp += `${val[i]}.`;
    } else if (i === 4) {
      temp += `${val[i]}.`;
    } else if (i === 7) {
      temp += `${val[i]}/`;
    } else if (i === 11) {
      temp += `${val[i]}-`;
    } else {
      temp += val[i];
    }
  }
  return temp;
}

export const fetchData = async(val) => {
  val = val.replaceAll('.', '');
  val = val.replaceAll('/', '');
  val = val.replaceAll('-', '');
  try {
    let result = await axios.get(`https://public.fluxoresultados.com.br/v1/cnpj/${val}`);
    if (result.data.status !== 'OK') return null;
    return result.data;
  } catch (e) {
    return null;
  }
}
