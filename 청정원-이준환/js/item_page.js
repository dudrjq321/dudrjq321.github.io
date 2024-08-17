    //정보: getInfo
    let cate_no=get_info("cate")
    let item_no=get_info("item")   
    let tab_o_top=[];

$(document).ready(function(){
    // 네비게이션
    let navi_list=`
    <p>
        <span class="home">
            <a href="index.html">
                청정원
            </a>
        </span>
        >
        <span class="category">
            정원e샵
        </span>
    </p>

 

    
    `
    $(".navi_box").append(navi_list)
    $(".navi_box .category").click(function(){
        let tmp_href=`list_page.html?cate_no=${cate_no}`
        location.href=tmp_href
    })


    //함수: 옵션추가: dataset=init count
    function new_opt(titletletle, price, dataset){
        if(dataset>=0){
            price = price * (1 - opt_discount)
        }
        else{
            price=unmoney($('#s_price'))
        }
        $(".selected_option_box").append(`
        <div class="selected_opt" data-oi="${dataset}">
            <div class="left">
                <p>- ${titletletle}</p>
            </div>
            <div class="middle">
                <button class="btn_min">-</button>
                <input type="text" value="1" class="qty" maxlength="3" 
                event.returnValue=false>
                <button class="btn_plus">+</button>
                <button class="btn_close">
                    <span>x</span>
                </button>
            </div>
            <div class="right">
                <span class="opt_price">
                    ${money(price)}
                </span>원
                <p class="opt_point">(적립 <span>${point(price, point_per)}</span>원)</p>
            </div>
        </div>
        `)
    }
    //함수: 옵션 가격조정
    function let_opt_price(opt_count, baby, single_price){
        let opt_price=baby.parents(".selected_opt").find(".opt_price")
        let tmp_price = opt_count * single_price
        opt_price.text(tmp_price.toLocaleString())
        baby.parents(".selected_opt").find(".opt_point").children("span").text(point(tmp_price, point_per))
    }
    // ----
    
    //init: 섹션하단 +이미지 추가
    let tab_menu_array=["상품정보","배송문의", "상품후기", "상품문의"]

    for(let i=0; i<tab_menu_array.length; i++){
        let tmp = `${tab_menu_array[i]}
        가 없습니다.`;
        if(i==0){
            tmp=""
            for(let j=0; j<=7; j++){
                tmp+=`<img src="img/desc/routine/${j}.jpg" alt="상품정보">`
            }
        }
        let tmp_li="";
        for(let j=0; j<tab_menu_array.length; j++){
            tmp_li+=`
            <li ${j==i?`class= "active"`:""}>
                <a href="#${tab_menu_array[j]}">
                    ${tab_menu_array[j]}
                </a>
            </li>`
        }
        let list=`
            <div class="tab_section section" id=tab${i+1}>
                <ul class="tab_menu_ul">
                ${tmp_li}
                </ul>
            <div class="tab_body contents_area">
            ${tmp}
            </div>
        </div>`
        $(".section.bottom").append(list)
        init_o_top(tab_o_top, $(".tab_section"))
    }    
    //기능: a태크 클릭=탭이동
    $(document).on("click", ".tab_menu_ul a", function(){
        event.preventDefault();
    })
    $(document).on("click", ".tab_menu_ul li", function(){
        init_o_top(tab_o_top, $(".tab_section"))
        $("html, body").animate({
            scrollTop: tab_o_top[$(this).index()]
        }, 0)
    })
    // 배송요일 ship_day
    let radio_chk=false;
    $(document).on("click", "input[name=shipping]", function(){
        radio_chk=true
        if(radio_chk){
            if($(this).attr("id")=="ship_night"){
                $(this).parents('section').removeClass("day").addClass("night")
                
                $(".ship_info").removeClass("active")
                $(".ship_info.night").addClass("active")
                $(".ship_night").css({
                    display: "block"
                })
            }
            else{
                $(this).parents('section').removeClass("night").addClass("day")
    
                $(".ship_info").removeClass("active")
                $(".ship_info.day").addClass("active")
                $(".ship_night").css({
                    display: "none"
                })
                // 
                $(".red_alert").css({display: "none"})
                $(".print_selected_day").text("")
            }
        }
    })


 

    // 배송가능일 구하기
    let dt=new Date()
    // dt.setDate(dt.getDate()+3) //확인용
    let ship_day=dt.getDay()+1
    if(dt.getHours()>11){
        ship_day+=1
        console.log("11:00 이후: day+1")
    }
    if(dt.getDay()>4 || ship_day<=0){
        ship_day=1
        console.log("nextweek")
    }
    $(".next_day").text(k_day[ship_day])
    console.log("오늘: "+dt.getDay()+" // 배송일: "+ship_day)

    $(document).on("click", ".btn_buy", function(){
        if(!radio_chk){
            alert("배송방법을 필수로 선택해주세요.")
        }
    })

});






