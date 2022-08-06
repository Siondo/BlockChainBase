/**
 *  Vue 组件全局注册方法
 */
import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
// 配置需要自动化注册的规则
const requireComponent = require.context(
  // 对哪个目录下的组件进行注册，它是一个相对目录，相对于当前文件。
  "../components",
  // 是否全盘注册
  true,
  // 文件名规则
  /[\w-]+\.vue$/
);
// 组件的注册
requireComponent.keys().forEach((fileName) => {
  // 获取组件的描述对象
  const componentConfig = requireComponent(fileName);
  // 解析文件名
  const componentName = upperFirst(
    camelCase(
      fileName
        // 删除文件名的开头的 `./`
        .replace(/^\.\/_/, "")
        // 删除文件名的扩展名
        .replace(/\.\w+$/, "")
    )
  );
  // console.log(componentName, 11);
  // 全局注册
  Vue.component(componentName, componentConfig.default || componentConfig);
});
