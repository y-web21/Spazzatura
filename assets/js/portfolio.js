// global variables
scrollbarWidth = 0;
gotoTopTagTop = 0;

var y = window.pageYOffset ;
console.log(y);

// mainVisual IDから取得するとメンテが楽だけど処理負荷的にはこれでも
const TagVisubleVolume = 480;
const NavHiddenVolume = 24000;

window.onload = function() {
    // all pages
    gotoTopTagTop = parseInt(getCssValue(document.querySelector('.goto_top_tag'), 'height'), 10);
    addClassActivePageLink();


    //
    let currentPage = location.pathname.replace('/','');

    if ('jstest.html' === currentPage){
        entryFormEventListner();
    }

    // console.log(document.getElementsByTagName('li'));
    // document.getElementsByClassName('hidOnload')[0].style.visibility = "visible";
    // document.getElementsByTagName('body')[0].style.visibility = "visible";
    // target[i].classList.add('nav_active_page');

    // debug
    console.log(document.getElementsByClassName('jsdebug'));

};

// =================== Depends on jQuery=========================
$(document).ready(function() {
});
$(window).on('load', function() {
    // 取得する値が安定しないため、スクロールバー幅はCSSの固定値決め打ちで対応
    // scrollbarWidth = window.innerWidth - document.body.clientWidth;
});

// --------- timer event --------------
// setInterval(function(){
//  console.log('imo')
// },10);

// var log = function(){
// console.log("test");
// };
// setTimeout(log, 30000);
// ------------------------------------

// Scroll event
var scrollTimer = 0;
$(window).scroll(function() {
    let mainVisualHeight = parseInt($('#mainVisual').css('height'), 10);
    let scrollVolume = $(this).scrollTop();
    stickyNav(scrollVolume, mainVisualHeight);
    parallaxBackgroud(scrollVolume , 'parallaxBg1' , 'parallaxBg1Entity');

    // 処理負荷軽減
    clearTimeout(scrollTimer);
    // anchor event test
    console.log(location.hash);
    anchorLink = location.hash;
    if(anchorLink){
        let anc = document.getElementsByClassName('addClsActiveLink');
        console.log(anc);
        anc[2].classList.add('nav_active_anchor');
        // target[0].ClassList.add('nav_active_abchor');
    }
    //  anchorLinkを消すテスト
    window.history.replaceState(null, '', location.pathname + location.search);
    scrollTimer = setTimeout(function() {
        console.log('-------')
        // $('#imo').text($(this).scrollTop());
        chgClassWhenScrolling(scrollVolume, TagVisubleVolume, 'goto_top_tag', 'sidetab-fadein', 'sidetab-fadeout');
    }, 250);
});


// jquery functions
function stickyNav(scrollVolume, gnavY) {
    if (gnavY < scrollVolume) {
        $(".stickyNav").css({
            "position": "fixed",
            "top": 0 + "px",
            "z-index": "9999",
        });
    } else {
        $(".stickyNav").css({
            "position": "static",
            "top": gnavY - scrollVolume + "px",
            "z-index": "auto",
        });
    }

    // 表示を消す必要がある場合。とりあえず消して動きをチェック
    if(NavHiddenVolume < scrollVolume) {
        $(".stickyNav").css({
            "position": "static",
            "visibility": "hidden",
        });
    } else {
        $(".stickyNav").css({
            "visibility": "visible",
        });
    }
}

function parallaxBackgroud(scrollVolume , areaId , entityId) {
    let areaHeight = parseInt(getCssValue(document.getElementById(areaId),'height'),10);
    let imgHeight = parseInt(getCssValue(document.getElementById(entityId),'height'),10);
    let areaAbsPos =window.pageYOffset + document.getElementById(areaId).getBoundingClientRect().top;
    let scrollVolumeFromThis = scrollVolume - areaAbsPos + window.innerHeight;
    let displayRange = areaHeight + window.innerHeight;
    // console.log(areaHeight,imgHeight,areaAbsPos,scrollVolumeFromThis,displayRange);
    //本来的には画面の高さ分マージンを取る
    let topThreshold = 0;//bgpos-1000;
    let btmThreshold = 59000;//bgpos+height+1000;
    if ((topThreshold < scrollVolume) || (btmThreshold > scrollVolume)) {
        let newTop = -((imgHeight - areaHeight) / displayRange * scrollVolumeFromThis);
        document.getElementById(entityId).style.top = newTop + "px";
    } else {
    }
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



function chgClassWhenScrolling2(scrollVolume, elementName, addClassName = null, removeClassName = null) {
    $('.' + elementName).each(function() {
        let elementTop = $(this).offset().top;
        let windowHeight = $(window).height();
        console.log(scrollVolume);
        console.log(elementTop - windowHeight);

        if (scrollVolume > elementTop - windowHeight) {
            if (addClassName !== null) {
                $(this).addClass(addClassName);
            }
            if (removeClassName !== null) {
                $(this).removeClass(removeClassName);
            }
        } else {
            if (addClassName !== null) {
                $(this).removeClass(addClassName);
            }
            if (removeClassName !== null) {
                $(this).addClass(removeClassName);
            }
        }

    });
}

// ================= Native JS ===================
// common functions
function getCssValue(element, property) {
    if (!element || !property) {
        return null;
    }
    let style = window.getComputedStyle(element);
    let value = style.getPropertyValue(property);
    return value;
}

function addClassActivePageLink(){
    let target = document.getElementsByClassName('addClsActiveLink');
    let currentPage = location.pathname.replace('/','');
    console.log(target , currentPage);

    // a要素にはhrefが存在すると決め打ち
    for (let i=0;i < target.length; i++){
        if (true === target[i].hasAttribute('href') && target[i].attributes.href.value === currentPage){
            target[i].classList.add('nav_active_page');
            return;

        } else if(target[i].baseURI === 'hiroshima') {

        }
        // href属性が存在するかチェックするには、hasClassがある
        // for (let j=0;j < target[i].attributes.length;j++){
        // }
    }
}


// ==================== form ========================
function entryFormEventListner(){
    // イベントリスナーでフォーム要素を監視
    const formName = document.getElementById('formName');
    let starttime = performance.now();
    formName.addEventListener('keyup',function(){
        validateName(formName);
    },false);

    const formSelect = document.getElementById('formSelect');
    formSelect.addEventListener('change',function(){
        console.log(formSelect);
        validateOption(formSelect);
    },false);

    let endtime = performance.now();
    console.log('function validateName ' + (endtime - starttime) + ' ms');
}



function validateName(target){
    console.log(target + 'aho');
    const regPtnName = /^[a-zA-Z ]{4,15}$/;
    ret = target.value.match(regPtnName);
    if (null === ret){
        target.classList.add('inputInvalid');
    }else{
        target.classList.remove('inputInvalid');
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
    // console.log(target[0].value);
}


function instantValidation(target , type, length){
}

// ぱららさんぷる
// $(function() {
// $(window).scroll(function(){
// var y = $(this).scrollTop();
// $('#bg01').css('background-position', '0 ' + parseInt( -y / 5 ) + 'px');
// $('#bg02').css('background-position', '0 ' + parseInt( -y / 50 ) + 'px');
// $('#bg03').css('background-position', '0 ' + parseInt( -y / 200 ) + 'px');
// });
// });