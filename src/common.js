// css 関連ヘルパ
/**
 * @param {HTMLElement} el
 * @param {string} className
 */
 const addClass = (el, className) => el.classList.add(className);
 /**
  * @param {HTMLElement} el
  * @param {string} className
  */
 const rmClass = (el, className) => el.classList.remove(className);
 /**
  * @param {HTMLElement} el
  * @param {string} styleName
  */
 const getCssValue = (el, styleName) => window.getComputedStyle(el).styles.getPropertyValue(styleName);

 // html ヘルパ
 const bodyWidth = () => document.getElementsByTagName("body")[0].clientWidth;
 const getCurrentY = () => window.scrollY;

 export {addClass,  rmClass,  getCssValue,  bodyWidth,  getCurrentY};
