import image1 from "./image/image_1.jpg";
let createImg = function () {
  var img = new Image();
  img.src = image1;
  img.classList.add('img_1');

  var root = document.getElementById('root');
  root.append(img);
};
export default createImg;