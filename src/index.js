// import './index.scss'; // 全局引入，作用于页面任何元素
import style from './index.scss';
import image1 from "./image/image_1.jpg";
import createImg from './createImg.js';
createImg();
var img = new Image();
img.src = image1;
img.classList.add(style.img_1);

var root = document.getElementById('root');
root.append(img);
