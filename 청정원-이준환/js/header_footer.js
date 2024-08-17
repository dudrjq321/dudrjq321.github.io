$(document).ready(function(){
    // 헤더 init
    let header_list=`
        <div class="sub_menu_pan">
            <div class="contents_area">
                <div class="sub_menu_imgbox"></div>
            </div>
        </div>
        <div class="contents_area">
            <div class="logo">
                <a href="index.html">
                    로고
                </a>
            </div>
            <ul class="main_menu">
                <li class="depth">
                    <a href="list_page.html?cate_no=">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                        브랜드
                    </a>
                    <ul class="sub_menu_ul">
                    <li>
                        <a href="#">
                            청정원
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            호밍스
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            안주야
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            순창
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            카레여왕
                        </a>
                    </li>
    
                    </ul>
                </li>
                <li>
                    <a href="list_page.html?cate_no=0">
                        제품
                    </a>
                </li>
                <li>
                    <a href="#">
                        뉴스
                    </a>
                </li>
                <li>
                    <a href="#">
                        이벤트
                    </a>
                </li>
                <li>
                    <a href="#">
                        고객센터
                    </a>
                </li>
            </ul>
            <div class="header_right">
                <ul class="header_right_top">
                    <li>
                        <a href="#">로그인</a>
                    </li>
                    <li>
                        <a href="#">회원가입</a>
                    </li>
                    <li>
                        <a href="#">주문조회</a>
                    </li>
                </ul>
                <ul class="header_right_bot">
                    <li class="btn_join">
                        <a href="#">
                            브랜드관
                        </a>
                    </li>
                    <li class="btn_shippin_info">
                        <a href="#">
                            정기배송
                        </a>
                    </li>
                    <li class="btn_routine">
                        <a href="#">
                            정기구독
                        </a>
                    </li>
                </ul>
            </div>
            <div class="hamberger">
                <div class="ham_line"></div><div class="ham_line"></div><div class="ham_line"></div>
            </div>
        </div>
    `
    $("header").append(header_list)
    // 서브메뉴 init + img hover
    for(let i=0; i<$(".sub_menu_ul li").length; i++){
        $(".sub_menu_imgbox").append(
            `<img src=img/banner/background_img/${i+1}.jpg alt="메뉴배경 이미지">`)
        if(i==$(".sub_menu_ul li").length-1){
            $(".sub_menu_imgbox img").eq($(".sub_menu_ul li").length-1).css({display: "block"})
        }
    }
    $(".sub_menu_ul li").mouseenter(function(){
        if($(".sub_menu_imgbox img.active").index()!= $(this).index()){
            $(".sub_menu_imgbox img").stop().delay(200).fadeOut(0).removeClass("active");
            $(".sub_menu_imgbox img").eq($(this).index()).stop().addClass("active").fadeIn(100);
        }
    });
    // li.depth
    $(".main_menu li").eq(0).mouseenter(function(){
        $(".sub_menu_pan, .main_menu svg, .sub_menu_ul").addClass("active")
    });
    $(".sub_menu_pan, header").mouseleave(function(){
        $(".sub_menu_pan, .main_menu svg, .sub_menu_ul").removeClass("active")
    });
    $(".sub_menu_pan").hover(function(){
        $("li.depth").addClass("active")
    }, function(){
        $("li.depth").removeClass("active")
    })
    if(!$(".sub_menu_pan").hasClass("active")){
        $(".main_menu li").mouseenter(function(){
            $(".main_menu li").removeClass('active')
        })
    }
    // 애니메이션
    $(".header_right_bot").css({
        transform: "translateX(0)",
        transition: "all .8s",
        transitionDelay: ".5s"
    })

    // 모바일 햄버거
    let ham_chk=false;
    let ham_t="all .2s";

    $(window).resize(function(){
        if($(window).innerWidth() > 710) {
            $(".sub_menu_pan").removeClass("ham");
            if(ham_chk) {
                // $(this).removeClass("active")

                $(".hamberger").trigger('click'); 
                // ham_chk=false;

            }
        }
    })
    $(".hamberger").click(function(){
        if(!ham_chk){
            $(this).addClass("active")
            $(".sub_menu_pan").css({
                transition: "none"
            }).addClass("ham")
            setTimeout(()=>{
                $(".sub_menu_pan").css({
                    transition: ham_t
                }).addClass("ready")
                $("main, footer").css({
                    transition: ham_t
                }).addClass("ham")
                $(".main_menu").css({
                    transition: ham_t,
                    opacity: "1",
                    right: "0"
                })
            }, 100)
            $("header, footer").addClass("ham")
            $(".dimmer").fadeIn(100)
            ham_chk=true;
        }
        else{
            $(this).removeClass("active")
            setTimeout(()=>{
                $(".sub_menu_pan").removeClass("ready")
                $(".main").removeClass("ham")
                $(".main_menu").css({
                    // opacity: "0",
                    right: "-500px"
                })
            }, 100)
            $("header, footer").removeClass("ham")
            $(".dimmer").fadeOut(100)
            ham_chk=false;
        }
    })
    $(".dimmer").click(function(){
        $(".hamberger").trigger("click")
    })

})