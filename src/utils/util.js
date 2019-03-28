export const getCookie = name => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) return unescape(arr[2]);
  return null;
};

/**
 * 将url变成数组格式
 * Convert the url to an array
 * @param {string} url 路由
 * /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 */
export const urlToList = url => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
};

/**
 * 验证是否为url
 * Verify if it is a url
 * @param {string} path url
 * @returns return a boolean
 */
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => {
  return reg.test(path);
};

/**
 *  手机号验证正则
 */
export const regMobile = /^1\d{10}/;

/**
 *  座机号码验证正则
 */
export const regTel = /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9})|([123456789]\d{6,7})|(400\d{7})|(400-\d{3}-\d{4})|(400-\d{7}))|(1[3|4|5|7|8]\d{9})$/;
