import styles from './index.css';
import Data from './data.xml';
import printMe from './print.js';
const root = document.getElementById('root');
console.log(Data);
const divElement = document.createElement('div');
divElement.className = styles['my-class'];
printMe();
root.append(divElement);
