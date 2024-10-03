import sunnyDayDefault from './default/sunny-day-default.svg';
import cloudyDayDefault from './default/cloudy-day-default.svg';
import rainyDayDefault from './default/rainy-day-default.svg';
import snowyDayDefault from './default/snowy-day-default.svg';

import sunnyDayFocus from './focus/sunny-day-focus.svg';
import cloudyDayFocus from './focus/cloudy-day-focus.svg';
import rainyDayFocus from './focus/rainy-day-focus.svg';
import snowyDayFocus from './focus/snowy-day-focus.svg';

export const weatherIco = [
  {
    id: 'sunny',
    img: sunnyDayDefault,
    hover: sunnyDayFocus,
  },
  {
    id: 'cloudy',
    img: cloudyDayDefault,
    hover: cloudyDayFocus,
  },
  {
    id: 'rainy',
    img: rainyDayDefault,
    hover: rainyDayFocus,
  },
  {
    id: 'snowy',
    img: snowyDayDefault,
    hover: snowyDayFocus,
  },
];
