"use strict";
// global variables
var scrollbarWidth = 0;
var gotoTopTagTop = 0;
// console.log(window.pageYOffset );
var Ypos = () => window.pageYOffset;



//window.scrollTo(0, 300)

// global variables style
// グローバルはアッパーキャメルケース
// 動的に取得するとメンテが楽
const TagVisubleVolume = 480;
const NavHiddenVolume = 24000;
const containerInnerWidth = 930;
const mediaQueryLg = 992;
var ifMqGr = (mqwidth) => window.matchMedia( "(max-width: 700px)" ).matches;
var ifMqLs = (mqwidth) => window.matchMedia( "(min-width: 700px)" ).matches;

var debugShowStyles = (element) => console.log(window.getComputedStyle(element));
var getAbsPos = (element) => window.pageYOffset + element.getBoundingClientRect().top;
// var getAbsPos = (element) => window.pageYOffset + element.getBoundingClientRect().top - window.innerHeight;

var GnavTop;


// ================= class test =================
/*
class test{

    constructor(elementId , rootElemetId = null){
        this.id = elementId;
        if (rootElemetId === null) {
            this.root = document;
        }else{
            this.root = document.getElementById(rootElemetId);
        }
    }

    getId(){
        return this.id;
    }
}

    let obj = new test('stickyNav');
    console.log(obj.getId());
    obj = null;
//*/
// ===============================================


window.onload = function() {

    // stickyNavJs用
    GnavTop = Ypos() + document.getElementById('stickyNav').getBoundingClientRect().top;
    // all pages
    gotoTopTagTop = parseInt(getCssValue(document.querySelector('.goto_top_tag'), 'height'), 10);
    addClassActivePageLink();

    let currentPage = location.pathname.replace('/','');

    if ('jstest.html' === currentPage){
        entryFormEventListner();
    }

    // debug
    // console.log(document.getElementsByClassName('jsdebug'));

};

// =================== Depends on jQuery=========================
$(document).ready(function() {
});
$(window).on('load', function() {
});

// Scroll event
var scrollTimer = 0;
$(window).scroll(function() {
    let mainVisualHeight = parseInt($('#mainVisual').css('height'), 10);
    let scrollVolume = $(this).scrollTop();

    stickyNavJs(scrollVolume,'stickyNav',containerInnerWidth, mediaQueryLg);
    fadein(scrollVolume, 500, 'fadeIn0');

    // 処理負荷軽減
    clearTimeout(scrollTimer);
    var anchorLink = location.hash;
    if(anchorLink){
        let anc = document.getElementsByClassName('addClsActiveLink');
        console.log(anc);
        anc[2].classList.add('nav_active_anchor');
        // target[0].ClassList.add('nav_active_abchor');
    }
    //  anchorLinkを消すテスト
    window.history.replaceState(null, '', location.pathname + location.search);
    scrollTimer = setTimeout(function() {
        // console.log('-------')
        chgClassWhenScrolling(scrollVolume, TagVisubleVolume, 'goto_top_tag', 'sidetab-fadein', 'sidetab-fadeout');
    }, 250);
});


// jquery functions
function stickyNav(scrollVolume, gnavY) {
    if (gnavY < scrollVolume) {
        $(".stickyNav").css({
            "position": "fixed",
            "top": 0 + "px",
            "left":200 + "px",
            "z-index": "9999",
            "box-shadow": "0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.5)",
        });
    } else {
        $(".stickyNav").css({
            "position": "static",
            "top": gnavY - scrollVolume + "px",
            "z-index": "auto",
            "box-shadow":  "0 0",
        });
    }

    /*
    // 表示を消す必要がある場合
    if(NavHiddenVolume < scrollVolume) {
;        $(".stickyNav").css({
            "position": "static",
            "visibility": "hidden",
        });
    } else {
        $(".stickyNav").css({
            "visibility": "visible",
        });
    }
    //*/
}


function gotoTop(scrollVolume, threshold) {
    if (scrollVolume > threshold) {
        $(".goto_top_tag").css({
            "display": "block",
            "left": document.body.clientWidth - gotoTopTagTop
        });
    } else {
        $(".goto_top_tag").css({
            "display": "none"
        });
    }
}

function chgClassWhenScrolling(scrollVolume, threshold, elementName, addClassName = null, removeClassName = null) {
    // 発火回数チェック
    //console.count();
    $('.' + elementName).each(function() {
        if (scrollVolume > threshold) {
            if (addClassName !== null) {
                $(this).addClass(addClassName);
            }
            if (removeClassName !== null) {
                $(this).removeClass(removeClassName);
            }
        } else {
            // 初回リロードでクラスが付与され、アニメーションが走るのを防止
            if ($(this).hasClass(addClassName)) {
                if (addClassName !== null) {
                    $(this).removeClass(addClassName);
                }
                if (removeClassName !== null) {
                    $(this).addClass(removeClassName);
                }
            }
        }
    });
}

// ================= Native JS ===================
//リサイズ時の処理を定義 即時関数を使いスコープの中に包む
(function () {
  var timer = 0;

    window.onresize = function () {
    if (timer > 0) {
        clearTimeout(timer);
    }

    timer = setTimeout(function () {

        console.log('window resized');
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        stickyNavJs(scrollTop,'stickyNav',containerInnerWidth, mediaQueryLg);
    }, 200);
  };
}());

// common functions
function getCssValue(element, property) {
    if (!element || !property) {
        return null;
    }
    let style = window.getComputedStyle(element);
    let value = style.getPropertyValue(property);
    return value;
}
function addClassById(elementId, cssClassName){
    let target = document.getElementById(elementId);
    target.classList.add(cssClassName);
}
function addClassByElement(target, cssClassName){
    target.classList.add(cssClassName);
}

function removeClassById(elementId, cssClassName){
    let target = document.getElementById(elementId);
    target.classList.remove(cssClassName);
}

function stickyNavJs(scrollVolume, elementId , width ,disableWidth = 0){
    let target = document.getElementById(elementId);
    let nav = target.style;
    let bodyWid = document.getElementsByTagName("body")[0].clientWidth;
    let navWid = document.getElementById(elementId).clientWidth;
    // 中央出し
    let navLeft = (bodyWid - navWid) / 2;
    let navTop = getAbsPos(target);

    // console.log(window.outerHeight,getAbsPos(target));

    if (disableWidth > bodyWid){
        // mobile
        nav.removeProperty('position');
        nav.removeProperty('top');
        nav.removeProperty('left');
        nav.removeProperty('z-index');
        nav.removeProperty('width');
        nav.removeProperty('box-shadow');
        return;
    }
    //Fixedにする位置が画面端ちょうど画面端に来ると、FixedとStaticに入れ替わりがずっと発生するバグがある
    // ナビのポジションと残画面領域Yから、Fixedにしないようにする条件が必要
    let mainVisAndGnavHeight = 380;
    if( GnavTop < scrollVolume && document.body.clientHeight - window.innerHeight > mainVisAndGnavHeight){
        //fixed
        nav.position = 'fixed';
        nav.top = '0px';
        // nav.left = navLeft + 'px';
        nav.zIndex = 9999;
        nav.width = '100%';
        nav.boxShadow = '0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.5)';
        addClassById(elementId , 'childLi5Width');
        document.getElementById('offsetPlus').style.height = '180px';
    }else{
        //static
        nav.position = 'static';
        nav.top = '0px';
        // nav.left = '0px';
        nav.zIndex = 'auto';
        nav.width = '100%';
        nav.boxShadow = '0 0';
        // console.log(document.getElementById(elementId).children);
        removeClassById(elementId , 'childLi5Width');
        document.getElementById('offsetPlus').style.height = '100px';
    }
}

function fadein(scrollVolume){

    let targets = document.getElementsByClassName('fadeIn');
    for(let i=0;i<targets.length;i++){
        gachapin(scrollVolume , targets[i] );
    }
}

function gachapin(scrollVolume, target){
    // let target = document.getElementById(elementId);
    let absPos = getAbsPos(target);

    if( absPos < scrollVolume ){
        // console.log(absPos,'>',scrollVolume);
        addClassByElement(target , 'fadeInL2R');
    }else{
        // removeClassById(elementId , 'fadeInL2R');
    }
}



function addClassActivePageLink(){
    let target = document.getElementsByClassName('addClsActiveLink');
    let currentPage = location.pathname.replace('/','');
    if (currentPage === '') {
        currentPage = 'index.html';
    }
    // console.log(target , currentPage);

    for (let i=0;i < target.length; i++){
        if (true === target[i].hasAttribute('href') && target[i].attributes.href.value === currentPage){
            target[i].classList.add('nav_active_page');
            return;
        }
    }
}
/*
function parallaxBackgroud(scrollVolume , areaId , entityId , reverse = true) {
    // the img moves from bottom top when down scroll.
    let viewAreaHeight = parseInt(getCssValue(document.getElementById(areaId),'height'),10);
    let imgHeight = parseInt(getCssValue(document.getElementById(entityId),'height'),10);
    let areaAbsPos = window.pageYOffset + document.getElementById(areaId).getBoundingClientRect().top;
    let scrollVolumeFromThis = scrollVolume - areaAbsPos + window.innerHeight;
    let displayRange = viewAreaHeight + window.innerHeight;

    if (true !== reverse){
        // 1pxスクロールあたりの画像スクロール量が、1px未満になると破綻するため、表示エリア分を足す
        let initPos = viewAreaHeight - imgHeight;
        let moveRangeWindowRatio = (imgHeight - viewAreaHeight) / displayRange;
        var newTop = initPos + moveRangeWindowRatio * scrollVolumeFromThis;
    } else {
        let initPos = -(imgHeight - viewAreaHeight);
        var newTop = initPos / displayRange * scrollVolumeFromThis;
    }
    document.getElementById(entityId).style.top = newTop + "px";
}

// ==================== form ========================
function entryFormEventListner(){
    // イベントリスナーでフォーム要素を監視

    // debug用
    const entryEventLister = true;
    if (true === entryEventLister){
        const formName = document.getElementById('formName');
        formName.addEventListener('keyup',function(){
            validateName(formName);
        },false);

        const formMail = document.getElementById('formMail');
        formMail.addEventListener('keyup',function(){
            validateMail(formMail);
        },false);

        const formSelect = document.getElementById('formSelect');
        formSelect.addEventListener('change',function(){
            console.log(formSelect);
            validateOption(formSelect);
        },false);
    }

    // let endtime = performance.now();
    // console.log('function validateName ' + (endtime - starttime) + ' ms');
}

// default validate
    const regPtnName = /^[a-zA-Z ]{4,15}$/;
    const regPtnMail = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

function validateName(target){
    if (undefined === target.attributes.pattern){
        regPtn = regPtnName;
    }else{
        regPtn = target.attributes.pattern;
    }
    let ret = target.value.match(regPtn);
    if (null === ret){
        target.classList.remove('inputCorrect');
        target.classList.add('inputIncorrect');
    }else{
        target.classList.remove('inputIncorrect');
        if (target.value.length > 4){
            target.classList.add('inputCorrect');
        }
    }
}

function validateMail(target){
    console.log(target.attributes.pattern);
    if (undefined === target.attributes.pattern){
        regPtn = regPtnMail;
    }else{
        regPtn = target.attributes.pattern;
    }
    console.log(regPtn);
    let ret = target.value.match(regPtn);
    console.log(ret);
    if (null === ret){
        target.classList.add('inputIncorrect');
        target.classList.remove('inputCorrect');
    }else{
        target.classList.add('inputCorrect');
        target.classList.remove('inputIncorrect');

    }
}

function validateOption(target){
    let selected = target.selectedIndex;
    console.log(selected);
    if ("0" === target.value){
        target.classList.add('selectedInvalid');
    }else{
        target.classList.remove('selectedInvalid');
    }
}

function chkForm(target){
    // まとめてバリデーションする場合はFormのチェンジを拾う
    console.log(target.length);
    return;
    let kas = target.getElementsByTagName('input');
    for (let i=0;i<kas.length;i++){
        if (target[i].id === 'formName'){
            validateName(target[i]);
        }
        if (target[i].id === 'formMail'){
            validateMail(target[i]);
        }
    }
}


function instantValidation(target , type, length){
}
//*/
