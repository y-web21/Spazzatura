// global variables
scrollbarWidth = 0;
gotoTopHeight = 0
window.onload = function() {
    gotoTopHeight = parseInt(getCssValue(document.querySelector('.goto_top_tag'), 'height'), 10);
    // console.log(document.querySelector('.goto_top_tag'));
    addClassActivePageLink();
    document.getElementsByTagName('body')[0].style.visibility = "visible";
    console.log(document.getElementsByTagName('body'));
    // target[i].classList.add('nav_active_page');

};

// Depends on jQuery
$(document).ready(function() {
    // 下にスクロールした状態で、リロードするとナビ位置がずれるため、初回にも暫定的に走らせる
    // ちらつくため、要デバッグ
    let gnavHeight = parseInt($('.sticky_menu').css('height'), 10);
    let scrollVolume = $(this).scrollTop();
    stickyNav(scrollVolume, gnavHeight);
});
$(window).on('load', function() {
    // 取得する値が安定しないため、CSSの固定値決め打ちで対応
    // scrollbarWidth = window.innerWidth - document.body.clientWidth;
    //  $(".goto_top_tag").css({
    //      "left": document.body.clientWidth - gotoTopHeight
    //  })
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
    let gnavHeight = parseInt($('.sticky_menu').css('height'), 10);
    let scrollVolume = $(this).scrollTop();
    stickyNav(scrollVolume, gnavHeight);

    //処理負荷軽減
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
        console.log('-------')
        // $('#imo').text($(this).scrollTop());
        // gotoTop(scrollVolume, 600);

        chgClassWhenScrolling(scrollVolume, 700, 'goto_top_tag', 'sidetab-fadein', 'sidetab-fadeout');
        // chgClassWhenScrolling(scrollVolume, 700, 'sticky_menu', 'z-index9999');
        console.log(scrollTimer + 'ms');
        console.log(scrollVolume);
    }, 250);
});


// jquery functions
function stickyNav(scrollVolume, gnavY) {
    if (scrollVolume > gnavY) {
        $(".stickyNav").css({
            "top": 0 + "px",
            "z-index": "9999",
        });
    } else {
        $(".stickyNav").css({
            "top": gnavY - scrollVolume + "px",
            "z-index": "auto",
        });
    }
}

function gotoTop(scrollVolume, threshold) {
    if (scrollVolume > threshold) {
        $(".goto_top_tag").css({
            "display": "block",
            "left": document.body.clientWidth - gotoTopHeight
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
            console.log('hage');
            if (addClassName !== null) {
                $(this).removeClass(addClassName);
            }
            if (removeClassName !== null) {
                $(this).addClass(removeClassName);
            }
        }

    });
}

// common functions
function getCssValue(element, property) {
    if (!element || !property) {
        return null;
    }
    let style = window.getComputedStyle(element);
    let value = style.getPropertyValue(property);
    return value;
}

// Native JS
function addClassActivePageLink(){
    let target = document.getElementsByClassName('addClsActiveLink');
    let currentPage = location.pathname.replace('/','');

    // a要素にはhrefが存在すると決め打ち
    for (let i=0;i < target.length; i++){
        if (target[i].attributes.href.value === currentPage){
            target[i].classList.add('nav_active_page');
        }
        // href属性が存在するかチェック
        // for (let j=0;j < target[i].attributes.length;j++){
        // }
    }
}
