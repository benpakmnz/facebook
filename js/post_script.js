import num from './test';
import css from '../css/normalize.css';
import style from '../css/styles.css';
import Feed from './feed_script';
console.log(`I imported ${num} from another module`);

let mainEl = document.querySelector('.main');
new Feed(mainEl, 7);
