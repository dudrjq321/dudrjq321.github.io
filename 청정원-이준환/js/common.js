let s_top=$(window).scrollTop()
let s_bot=s_top+$(window).height();
let h_o_top=$("header").offset().top;
let o_top=[];

// 함수 모듬
function init_o_top(array, el){
    for(let i=0; i<el.length; i++){
        array[i]=el.eq(i).offset().top
    }
}

function get_info(key) {
    let url = location.href; // url에 있는 문자열 다 가져오기 // product.html?cate=0&item_no=1&g=female
    url = url.split("?"); // ? 뒤쪽 정보만 가져오기   // [product.html, cate=0&item_no=1&g=female] 

    if(url.length > 1) { // ?뒤가 있냐 없냐 판별
        url = url[1];           // "cate=0&item_no=1&g=female"
        url = url.split('&');   // [cate=0  ,  item_no=1  ,  g=female]

        for(let i=0; i<url.length; i++) {
            let tmp_url = url[i].split("="); // cate=0  =>  [cate  , 0]

            if(tmp_url[0] == key) {
                return tmp_url[1]
            }
        }
        return -1;
    }

    url = url[1]; //"cate=0"
    url = url.split("=");// [cate , 0]

    if(url[0] == key) { 

    }
} 


function s_top_init(){
    s_top=$(window).scrollTop()
    s_bot=s_top+$(window).height();
}
function fadeInUp(el){
    el.animate({
        top: "30px",
        opacity: "0"
    }, 0).animate({
        top: "0px",
        opacity: "1"
    }, 1000);
}
function get_info(key){
    let url=location.href.split("?");
    url=url.length>1?url[1]:null;
    if(url==null){
        return url;
    }
    let tmp_part=url.split("&");
    if(url!=null){
        let crumb;
        for(let i=0; i<tmp_part.length; i++){
            crumb=tmp_part[i].split("=")
            if(crumb[0]==key){
                return crumb[1]
            }
        }
    }
}
//슬라이드: 메인배너
function slide(el, animate_time, in_index, in_pos, out_index, out_pos){
    el.eq(in_index).css({
        left: in_pos,
        zIndex: 99
    }).animate({
        left: "0%"
    }, animate_time)
    el.eq(out_index).stop(true).css({
        zIndex: 9
    }).animate({
        left: out_pos
    }, animate_time)
    btn_init(el, animate_time)
};
// 버튼막기
function btn_init(el, timer){
    el.css({
        pointerEvents: "none"
    })
    setTimeout(() => {
        el.css({
            pointerEvents: "auto"
        })
    }, timer+99);
}



$(document).ready(function(){
    // 스크롤
    $(window).scroll(function(){
        s_top=$(window).scrollTop();
        s_bot=s_top+$(window).height();
        // 헤더픽스 headerFix
        if(s_top > h_o_top){
            $("header, .logo, main, .sub_menu_pan").addClass("fixed")
            $(".sec1, .sec2").addClass("fixed").css({
                backgroundColor: "#90C290"
            })
        }
        else if(s_top <= h_o_top){
            $("header, .logo, main, .sub_menu_pan").removeClass("fixed")
            $(".sec1, .sec2").removeClass("fixed").css({
                backgroundColor: "#fff"
            })
            $('.sec2')
            $(".sec2 .shadow_pan").fadeOut(0)
        }
    });

 
    
    // 링크---------------------
    // 카테고리 링크: list_page에 연결: id
    // $(document).on("click", ".more_btn, .item_title", function(){
    //     let thisSection=$(this).parents(".section").attr("id")
    //     let cartIndex=menu_array.indexOf(thisSection)
        
    //     let tmp_href=`list_page.html?cate_no=${cartIndex}`

    //     location.href=tmp_href
    // })

    // 카테고리 링크: list_page에 연결: 인덱스
    $(document).on("click", ".sub_menu_ul li", function(){
        let tmp_href="list_page.html?"
        let tmp_cart=$(this).index()

        tmp_href+="cate_no="+tmp_cart
        location.href=tmp_href
    })
    // 카테고리 링크: 메뉴
    $(document).on("click", ".main_menu li.routine", function(){
        let tmp_href=`list_page.html?cate_no=6`
        location.href=tmp_href
    })
    // 아이템 링크 cart_sec
    $(document).on("click", ".cart_sec .item", function(){
        let thisSection=$(this).parents(".cart_sec").attr("id")
        let cartIndex=menu_array.indexOf(thisSection)

        let tmp_href=`item_page.html?cate_no=${cartIndex}&item_no=${$(this).index()}`

        location.href=tmp_href
    })

    // // 분류된 아이템 링크
    $(window).resize(function(){
        if($(window).width()>=960){
            if(winsize_chk[0]==false){
                resize_chk();
                resize_banner_init();
            }
        }
        else if($(window).width()>=720){
            if(winsize_chk[1]==false){
                resize_chk();
                resize_banner_init();
            }
        }
        else {
            if(winsize_chk[2]==false){
                resize_chk();
                resize_banner_init();
            }
        }
    })
});
let winsize_chk=[false, false, false]
resize_chk();
function resize_chk(){
    for(let i=0; i<winsize_chk.length; i++){
        winsize_chk[i]=false
    }
    if($(window).width()>=960){
        if(winsize_chk[0]==false){
            console.log("type1, 중앙 메뉴")
            winsize_chk[0]=true
        }
    }
    else if($(window).width()>=720){
        if(winsize_chk[1]==false){
            console.log("type2, 우측 메뉴")
            winsize_chk[1]=true
        }
    }
    else {
        if(winsize_chk[2]==false){
            console.log("type3, 햄버거")
            winsize_chk[2]=true
        }
    }
}
function resize_cate_banner_init(cate_no){ //reszie_chk[2](모바일사이즈) 배너 변경
    if(winsize_chk[2]==true){ //모비일
        // 리스트페이지 배너
        for(let i=0; i<$(".cate_banner").length; i++){
            $(".cate_banner").eq(i).children("img").attr("src", `img/banner/category/${menu_array[cate_no]}_0.jpg`)
        }
        console.log("모바일")
    }
    else{
        for(let i=0; i<$(".cate_banner").length; i++){
            $(".cate_banner").eq(i).children("img").attr("src", `img/banner/category/${menu_array[cate_no]}_1.jpg`)
        }
    }
}
function resize_banner_init(){ //reszie_chk[2](모바일사이즈) 배너 변경
    if(winsize_chk[2]==true){ //모비일
        for(let i=0; i<$(".main_banner_img").length; i++){
            $(".main_banner_img").eq(i).css({
                backgroundImage: `url(img/banner/main_banner/${i+1}_sm.jpg)`
            })
        }
        $(".banner_shipping img").attr("src", `img/banner/desc/shipping_0.png`)
    }
    else{
        for(let i=0; i<$(".main_banner_img").length; i++){
            $(".main_banner_img").eq(i).css({
                backgroundImage: `url(img/banner/main_banner/${i+1}.jpg)`
            })
        }
        $(".banner_shipping img").attr("src", `img/banner/desc/shipping_1.png`)
    }
}