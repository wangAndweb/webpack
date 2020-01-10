// Tree shaking 只支持 ES Module模块引入
// Develoment: sourceMap 比较全， Production: sourceMap会有却是
// Develoment: 未作压缩， Production: 做了压缩


import { add } from './main';
add(1, 9);

