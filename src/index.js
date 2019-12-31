import styles from './index.css';
import Data from './data.xml';
const root = document.getElementById('root');
console.log(Data);
const divElement = document.createElement('div');
divElement.className = styles['my-class'];
root.append(divElement);
