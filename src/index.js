// Tree shaking 只支持 ES Module模块引入
// Develoment: sourceMap 比较全， Production: sourceMap会有却是
// Develoment: 未作压缩， Production: 做了压缩
// 1.打包文件会很大，加载时间会很长
// 2 修改业务代码，用户重新加载文件，重新加载很大的文件
// 业务代码
// 同步引入
// import _ from 'lodash';
// import module from './test';
// import $ from 'jquery';
// import test from './test';
// console.log(_.join(['a', 'd', 'c'], '***'));
// // 统一省略10万行
// console.log(_.join(['a', 'd', 'c'], '—'));
// $("body").append('111111111');
// 第二种方式
// 首次访问页面app.js 和 lodash 拆分成两个, 两个都是1MB（浏览器可以并行加载文件）
// 当页面业务逻辑发生变化后，页面只需要加载main.js即可
// Code Splitting 代码分割

//异步引入
// async function getComponent() {
//   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
//   const element = document.createElement("div");
//   element.innerHTML = _.join(['DELL', 'JOHN'], '-');
//   return element;
// }
//
// document.addEventListener('click', () => {
//   // getComponent().then( element => {
//   //   //   document.body.appendChild(element);
//   //   // });
//   import(/* webpackPrefetch: true */ './click').then(({ default: func}) => {
//     func();
//   })
// });


// 代码分割和webpack无关
// webpack中实现代码分割，两种方式
// 1.同步代码分割：只需要在webpack中做optimization的配置
// 2.异步代码分割： import 异步引入 无需做配置，会自动进行代码分割
// test();
// function component() {
//   var element = document.createElement('div');
//   var button = document.createElement('button');
//   var br = document.createElement('br');
//   button.innerHTML = 'Click me and look at the console!';
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.appendChild(br);
//   element.appendChild(button);
//   button.onclick = () => import(/* webpackChunkName: "test" */ './test').then(module => {
//     var print = module.default;
//     print();
//   });
//   return element;
// }
// document.body.appendChild(component());
// function component() {
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.onclick = module.default();
//   console.log('开始运行')
//   return element;
// }
//
// document.body.appendChild(component());
// import './styles.css';
// import './style1.css';
// console.log('Hello world');
// const dom = $('div');
// dom.html(_.join(['Dell', 'Lee'], '--'));
// $('body').append(dom);
// this.alert('测试！！');
console.log('this is dell');

if ('serviceWorker' in navigator) { // PWA访问过一次以后缓存住
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(('./service-worker.js')).
    then( registion => {
      console.log('成功')
    }).then(err => {
      console.log(err);
    })
  })
  // 首先在webpack中配置service-worker
}