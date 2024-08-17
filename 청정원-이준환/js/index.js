$(document).ready(function(){
    init_o_top(o_top, $(".section"))

    setTimeout(()=>{
        fadeInUp($(".item_title"));
        fadeInUp($(".sec_title"));
    }, 100)




    // 메인배너 init
    for(let i=0; i<5; i++){
        let list=`
            <div class="main_banner_img main_banner_img${i+1}"></div>
        `
        $(".main_banner_container").append(list)
        $(".main_banner_img").eq(i).css({
            backgroundImage: `url(img/banner/main_banner/${i+1}.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        })
    }
    $(".main_banner_img").eq(0).css({
    left: "0%"
    })

    // mb_init();
    // function mb_init(){
    //     if(winsize_chk[2]==true){
    //         for(let i=0; i<$(".main_banner_img").length; i++){
    //             $(".main_banner_img").eq(i).css({
    //                 backgroundImage: `url(img/banner//${i+1}.jpg)`,
    // main_banner
    //             })
    //         }
    //     }
    // }

    // 슬라이드 시작
    let mb_index=1;
    let timer=3000;
    let transition_s=800;
    let mb_count=$(".main_banner_img").length;
    let interval;
    let autoplay=true;

    auto_slide();
    function auto_slide(){
        if(autoplay){
            clearInterval(interval)
            interval=setInterval(function(){
                slide($(".main_banner_img"), transition_s, (mb_index) % mb_count, "100%", (mb_index-1) % mb_count, "-100%")
                mb_index+=1;
                indi_chk((mb_index-1) % mb_count);
            }, timer);
        }
    }
    // 인디케이터 init
    indi_init();
    function indi_init(){
        let list;
        for(let i=0; i<$(".main_banner_img").length; i++){
            list=`<div class="indicator indicator${i+1}"></div>`
            $(".main_banner .indicator_box").append(list)
        }
        $(".main_banner .indicator").eq(0).addClass("active")
    }
    function indi_chk(current_index){
        $(".main_banner .indicator").removeClass("active").eq(current_index).addClass("active")

        $(".main_banner .index_count").css({display: 'none'}).eq(current_index).css({display: 'block'})

        timer_bar();
    }
    $(".main_banner .indicator").click(function(){
        let tmp_index=$(this).index();
        if(mb_index!=(tmp_index+1)){
            clearInterval(interval)
            slide($(".main_banner_img"), transition_s, tmp_index, "100%", (mb_index-1) % mb_count, "-100%")
            mb_index=tmp_index+1;
            indi_chk((mb_index-1) % mb_count);

            btn_init($(".main_banner .indicator"), transition_s)
            auto_slide();
        }
    })
    let indi_count_array=['정원아, 오늘도 부탁해', '민족을 요리하다', '안주야를 만나는 순간', '맛있는 발효숙성', '여왕의 방식 프리미엄 카레']
    indi_count_init();
    function indi_count_init(){
        let list;
        for(let i=0; i<$(".main_banner_img").length; i++){
            list=`<span class="index_count index_count${i+1}">${i+1} / ${$(".main_banner_img").length}, ${indi_count_array[i]}</span>`
            $(".index_count_box").append(list)
        }
        $(".index_count").css({display: 'none'}).eq(0).css({display: 'block'})
    }
    // 메인배너 게이지
    let pos_x=-100;
    let interval_pos_x;
    timer_bar();
    function timer_bar(){
        if(autoplay){
            $(".timer_line div").stop().animate({left: "-100%"}, 0).animate({left: "0%"}, timer);
        }
        else{
            $(".timer_line div").stop()
        }
    }
    $(".btn_play").eq(0).addClass('active')
    $(".btn_play_box").click(function(){
        if(autoplay){
            $(".btn_play").toggleClass('active')
            autoplay=false;
            clearInterval(interval)
            time_bar_pos=$(".timer_line div").offset().left
        }
        else {
            $(".btn_play").toggleClass('active')
            autoplay=true;
        }
        timer_bar();
    });


         // 섹션3: init
         $(".sec3 .sec3_contents").append(`
         <div class="sec_title">
             <h1>베스트 아이템</h1>
             <a href="list_page.html"> <span class="more_btn">더보기</span> </a>
             <div class="indicator_box"></div>
         </div>
         <div class="sec_body">
             <ul class="item_box">
             
            </ul>
         </div>
     `)

     let bs_list = BEST_LIST[0];
     for(let i=0; i<4; i++){
         let list =`<li class="item" id="best_img"> 
                    <a href="${bs_list[i].a}">
                      <img src="${bs_list[i].src}" alt="">
                    </a>
                    <div class="item_desc">
                     <p class="item_title">${bs_list[i].name}</p>
                     <span class="o_price">${bs_list[i].o_price}</span>
                     <span class="s_price">${bs_list[i].s_price}</span>
                     <a href="${bs_list[i].a}">
                     <img src="img/icon/tag/best.jpg" class="item_tag" alt="베스트 아이템">
                     </a>
                     </div>
                   </li>
                     
                    `; $('.item_box').append(list)
     }

// 섹션3: 한칸 슬라이드
let sec3_index=0;
let sec3_count=$(".sec3 .item").length;
let sec3_width=$(".sec3 .item").outerWidth();
let sec3_timer=200;
//left init
function sec3_init(){
    sec3_count=$(".sec3 .item").length;
    sec3_width=$(".sec3 .item").outerWidth();
    setTimeout(()=>{
        for(let i=0; i<sec3_count; i++) {
            $('.sec3 .item').eq(i).css({ left: (sec3_width * i)})
        }
    }, 300)
}
$(window).resize(function(){
    sec3_init();
})
//버튼
$(document).on('click', '.sec3 .btn_R', function(){
    btn_init($(".sec3 .btn"), sec3_timer);

    $('.sec3 .item').animate({
        left: '-='+sec3_width
    }, sec3_timer)
    setTimeout(()=>{
        list=$('.sec3 .item').eq(0).detach()
        $(list).appendTo('.sec3 .item_box').css({
            left: (sec3_count-1) * sec3_width
        })
    }, sec3_timer+50)
    sec3_index+=1;
    sec3_indi_init(sec3_index % sec3_count);
})
$(document).on('click', '.sec3 .btn_L', function(){
    btn_init($(".sec3 .btn"), sec3_timer);

    list = $('.sec3 .item').eq(sec3_count - 1).detach();
    $(list).prependTo('.sec3 .item_box').css({left: -sec3_width });
    $('.sec3 .item').animate({
        left: '+='+sec3_width
    }, sec3_timer+50)

    sec3_index-=1;
    sec3_indi_init(sec3_index % sec3_count);
})




    // 섹션4: init, mouseover
    $(".sec4").append(`
        <div class="contents_area">
            <div class="sec4_left sec_title">
                <div class="sec4_left_pan"></div>
                <h1>
                    <span class="txt_sm">
                        식단관리를 도와주는
                    </span>
                    <div></div>
                    다이어트 제품들
                </h1>
              
            </div>

        
        <ul class="sec4_right item_box">     
        </ul>
        </div>
    `) 

    let rs_best = ITEM_LIST[0];
    for(let i=0; i<16; i++){
        let list =`<li class="item"> 
                    <img src="${rs_best[i].src}" alt=""> </li> `;
                   $('.sec4_right').append(list)
    }



      
            
            



    




    $(".sec4 .item").mouseenter(function(){
        $(".sec4 .item_desc").stop().animate({opacity: "0"}, 0);
        $(".sec4 .item").eq($(this).index()).find(".item_desc").stop().animate({opacity: "1"}, 500)
        
        $(".sec4 .item img").stop().animate({opacity: "1"}, 0);
        $(".sec4 .item").eq($(this).index()).find("img").stop().animate({opacity: "0.7"}, 400)
    });

    // 섹션5: init
    $(".sec5").append(`
        <div class="sec_title">
            <h1>정원e샵에서 알뜰쇼핑하세요</h1>
           <a href="list_page.html"> <span class="more_btn">더보기</span> </a>
        </div>
        <div class="sec_body">
            <ul class="item_box">
            </ul>
        </div>
    `)
    for(let i=0; i<1; i++){
        let sec5_src="img/banner/event/"
        let list=`
        <li class="event_banner event_banner${i}">
            <a href="list_page.html">
                <img src="${sec5_src}/event_${1}_${0}.jpg"   style="width: 550px;
                height: 260px;"  alt="이벤트배너${i}">
            </a>
        </li>

        <li class="event_banner event_banner${i}">
            <a href="list_page.html">
                <img src="${sec5_src}/event_${1}_${1}.jpg"   style="width: 550px;
                height: 260px;" alt="이벤트배너${i}">
            </a>
        </li>
        
        
        `

        
        $(".sec5").find(".item_box").append(list)
    }
    // 링크---------------------
    $(document).on("click", ".sec3 .more_btn", function(){
        let tmp_href="#"
        //추천상품 리스트 만들면 링크수정
        location.href=tmp_href
    })
    // 카테고리 링크: list_page에 연결: 인덱스
    $(document).on("click", ".sec2 .item", function(){
        let tmp_href="#"
        let tmp_cart=$(this).index()
    
        tmp_href+="cate_no="+tmp_cart
        location.href=tmp_href
    })
})