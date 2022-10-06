// global variables
scrollbarWidth = 0;
gotoTopTagTop = 0;

var y = window.pageYOffset ;
console.log(y);

// mainVisual IDから取得するとメンテが楽だけど処理負荷的にはこれでも
const TagVisubleVolume = 480;
const NavHiddenVolume = 2400;

window.onload = function() {
    gotoTopTagTop = parseInt(getCssValue(document.querySelector('.goto_top_tag'), 'height'), 10);
    // console.log(document.querySelector('.goto_top_tag'));
    addClassActivePageLink();

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

    // console.log(document.getElementsByTagName('li'));


    // document.getElementsByClassName('hidOnload')[0].style.visibility = "visible";
    // document.getElementsByTagName('body')[0].style.visibility = "visible";
    // target[i].classList.add('nav_active_page');

    // debug
    console.log(document.getElementsByClassName('jsdebug'));

};

// =================== Depends on jQuery=========================
$(document).ready(function() {
    // 下にスクロールした状態で、リロードするとナビ位置がずれるため、初回にも暫定的に走らせる
    // ちらつくため、要デバッグ
    let mainVisualHeight = parseInt($('#mainVisual').css('height'), 10);
    let scrollVolume = $(this).scrollTop();
    stickyNav(scrollVolume, mainVisualHeight);
});
$(window).on('load', function() {
    // 取得する値が安定しないため、CSSの固定値決め打ちで対応
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
    parachan(scrollVolume);

    //処理負荷軽減
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
        console.log('-------')
        // $('#imo').text($(this).scrollTop());
        // gotoTop(scrollVolume, 600);

        chgClassWhenScrolling(scrollVolume, TagVisubleVolume, 'goto_top_tag', 'sidetab-fadein', 'sidetab-fadeout');
        // chgClassWhenScrolling(scrollVolume, TagVisubleVolume, 'sticky_menu', 'z-index9999');
        console.log(scrollTimer + 'ms');
        console.log(scrollVolume);
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

    // 表示を消す必要がある場合
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

function parachan(scrollVolume) {
    let bgpos = window.pageYOffset + document.getElementById('parachan').getBoundingClientRect().top;
    let height = parseInt($('.parallax_background_entity').css('height'), 10);
    //本来的には画面の高さ分マージンを取る
    let topThreshold = 2500;//bgpos-1000;
    let btmThreshold = 4500;//bgpos+height+1000;
    let hage = scrollVolume + scrollVolume * 0.1;
    console.log(bgpos,height,topThreshold,scrollVolume,btmThreshold,hage);

    if ((topThreshold > scrollVolume) || (btmThreshold < scrollVolume)) {
        $(".parallax_background").css({
            // "position": "fixed",
            // "top": 0 + "px",
            // "z-index": "9999",
        });
    } else {
        $(".parallax_background_entity").css({
            "top": (scrollVolume - bgpos - height / 2) * 0.8 + "px",
        });
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

    // a要素にはhrefが存在すると決め打ち
    for (let i=0;i < target.length; i++){
        if (target[i].attributes.href.value === currentPage){
            target[i].classList.add('nav_active_page');
            return;
        }
        // href属性が存在するかチェックするには、hasClassがある
        // for (let j=0;j < target[i].attributes.length;j++){
        // }
    }
}


// ==================== form ========================


// let btn = document.getElementById('body');
// btn.addEventListener('click', function() {
//     console.log('クリックされました！');
// }, false);



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