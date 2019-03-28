import Storage from '@/utils/storage';
import { urlPrefix } from '@/utils/request';

/**
 * 导出表格
 * export table file
 * @param {string} url 后端接口
 * @param {object} params 查询字段
 * @param {number} removeTime 超时时间，到达超时时间后清除请求
 */
const exportFile = (url, params, removeTime = 4000) => {
  const urlParams = Object.keys(params)
    .map(key => {
      const value = params[key];
      if (value) {
        return { key, value };
      }
      return '';
    })
    .filter(item => item);
  urlParams.push({ key: 'Authorization', value: Storage.session.get('newAuthorization') });

  const exportForm = document.createElement('form');
  exportForm.method = 'get';
  exportForm.action = `${urlPrefix}${url}`;
  exportForm.style.display = 'none';
  urlParams.forEach(v => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = v.key;
    input.value = v.value;
    exportForm.appendChild(input);
  });

  document.body.appendChild(exportForm);

  exportForm.submit();

  setTimeout(() => {
    // 移除dom，避免越来越多
    document.body.removeChild(exportForm);
  }, removeTime);
};

export default exportFile;
