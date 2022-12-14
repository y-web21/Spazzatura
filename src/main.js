"use strict";

import appConf from 'appConf';
import {addClass,  rmClass,  bodyWidth,  getCurrentY} from './common.js';

const spazzatura = {
  home: 'index.html',
  mainVisPosId: 'mainVisual',
  globalNaviId: 'stickyNav',
  mainVisPos: undefined,
  globalNavi: undefined,
  isMobile: () => 992 > bodyWidth(),
  enableSticky: () => spazzatura.mainVisPos.absBottom < getCurrentY(),
};

// イベントリスナ列挙
window.addEventListener('DOMContentLoaded', () => {
  // DOM関連変数初期化
  spazzatura.mainVisPos = new Pos(document.getElementById(spazzatura.mainVisPosId));
  spazzatura.globalNavi = document.getElementById(spazzatura.globalNaviId);
});

window.addEventListener('DOMContentLoaded', () => {
  addClassActivePageLink();
});

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('pageshow',()=>{
    setGlobalNaviPosition();
  });

  window.addEventListener('resize', () => {
    spazzatura.mainVisPos.update();
  });

  window.addEventListener('scroll', () => {
    setGlobalNaviPosition();
  });
});

/**
 * 指定位置でアニメーションをするクラスを持つ要素をオブザーバーに登録
 */
window.addEventListener('DOMContentLoaded', ()=> {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };
  const observer = new IntersectionObserver(doWhenIntersect, options);
  for (const el of document.querySelectorAll(".fadeIn")){
    observer.observe(el);
  }
});

/**
 * 特定のタイミングでの画面表示領域内での要素の絶対位置(DOMRect)と
 * HTML全体での要素内ので絶対位置を保持するデータオブジェクト
 * @class Pos
 */
class Pos {
  /**
   * Creates an instance of Pos.
   * @param {HTMLElement} el
   * @memberof Pos
   */
  // el
  constructor(el) {
    this.el= el;
    this.#setValue();
  }
  #setValue(){
    this.top = this.el.getBoundingClientRect().top;
    this.left = this.el.getBoundingClientRect().left;
    this.bottom = this.el.getBoundingClientRect().bottom;
    this.right = this.el.getBoundingClientRect().right;
    this.absTop = this.top + window.scrollY;
    this.absLeft = this.left + window.scrollX;
    this.absBottom = this.bottom + window.scrollY;
    this.absRight = this.right + window.scrollX;
  }
  update(){
    this.#setValue();
  }
}

/**
 * イベントの連続発火を抑制します。
 *
 * @param {callback} callback 発火するイベント
 * @param {number} [interval=200] default 200ms 次にイベントが許可されるまでの時間
 * @return {void}
 */
const throttle = (callback, interval = 200) => {
  let timerId;
  return () => {
    if (timerId !== undefined) return;
    // 通常実行
    callback();
    // 次処理受付待ちタイマ起動。timerIdを破棄して受け入れコールバック受け入れ状態にする
    timerId = window.setTimeout(() => timerId = undefined , interval);
  };
};

/**
 * 現在のページに対応するグローバルナビにCSSクラスを付与します
 *
 * @return {void}
 */
const addClassActivePageLink = () => {
  const className = 'nav_active_page';
  for (const el of document.querySelectorAll('#gnav a')){
    if (pageCategory().replace('/','') === el.getAttribute('href').replace('/','')){
      addClass(el, className);
      return;
    }
  }
};

/**
 * 現在ページの状態に応じてグローバルナビゲーションを表示する
 */
const setGlobalNaviPosition = () => {
  if (spazzatura.isMobile()) {
    mobileNaviThrottle();
  }else{
    stickyNaviThrottle();
  }
};

/**
 * PC用ナビゲーションのスタイルを適用
 */
const stickyNaviThrottle = throttle( () => {
  const nav = spazzatura.globalNavi.style;
  if (spazzatura.enableSticky()) {
    //fixed (sticky)
    nav.position = 'fixed';
    nav.top = '0px';
    nav.width = '100%';
    nav.zIndex = 9999;
    nav.boxShadow = '0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.5)';
    // global nav の高さ 80px 分の調整
    document.getElementById('offsetPlus').style.height = '180px';
    return;
  }
  // static
  nav.position = 'static';
  nav.top = '0px';
  nav.width = '100%';
  nav.zIndex = 'auto';
  nav.boxShadow = '0 0';
  // global nav の高さ 80px 分の調整
  document.getElementById('offsetPlus').style.height = '100px';
} , 15);

/**
 * モバイル用ナビのスタイルを適用
 */
const mobileNaviThrottle = throttle( () => {
  const nav = spazzatura.globalNavi.style;
  nav.removeProperty('position');
  nav.removeProperty('top');
  nav.removeProperty('left');
  nav.removeProperty('z-index');
  nav.removeProperty('width');
  nav.removeProperty('box-shadow');
});

/**
 * 登録したオブザーバーからイベントを呼び出す
 * @param {IntersectionObserverEntry} entries
 */
const doWhenIntersect = entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      startFadeInAnim(entry.target);
    }
  }
};

/**
 * 予め定義したアニメーションCSSを付与します
 *
 * @param {HTMLElement} el
 */
const startFadeInAnim = el => {
  /** @type {Number} ms. CSSアニメーションの長さと合わせる */
  const animationTime = 300;
  /** @type {string} animation class name */
  const animationClass = 'fadeInAnim';
  if (! el.classList.contains(animationClass)){
    addClass(el, animationClass);
    setTimeout(() => rmClass(el,animationClass), animationTime);
  }
};

/**
 * ドメイン名直後の/までの文字列を返します。
 * / と '' は、index.html とみなします。
 * @return {string}
 */
const pageCategory = () => {
  const current = solvePathPrefix(appConf.hasUrlPathPrefix);
  if (current === '' || current === '/'){
    return spazzatura.home;
  }
  return current;
};

/**
 * false であれあばドメイン直下、true であればその次のパス文字列を返します。
 * @param {boolean} prefix [false]
 * @return {string}
 */
const solvePathPrefix = (prefix = false) => {
  if (prefix){
    return location.pathname.split('/')[2];
  }
  return location.pathname.split('/')[1];
};

