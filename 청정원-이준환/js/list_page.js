


$(document).ready(function(){

    let cate_no=get_info("cate")
    cate_no==null?cate_no=0:""
    let filter_chk=false;
    let filter_array;

    
    // 일반 init
    $(".section").attr("id", menu_array[cate_no])
    $(".section").addClass(menu_array[cate_no])
    $(".cate_banner").append(`
        <img src="img/banner/category/2.jpg" alt="">
    `)

    $(`#${menu_array[cate_no]}`).append(
     `
    <div class="sec_title">
        <h1>신제품</h1>
    </div>
    <ul class="item_box">

    </ul>

     <div class="search_box">
        <input type="text" placeholder="청정원 제품을 검색하세요" class="txt_search">
        <div class="btn_search"></div>
     </div>

     <div class="sec_title">
         <h1>제품</h1>

         <ul class="item_box">

         </ul>
     </div>
   `)
    
    let product = PRODUCT[0];
    for(let i=0; i<5; i++){
       let list = `<li class="item item">
                      <div class="item_img item_img">
                        <img src="${product[i].src}" alt="">
                      </div>
                        <div class="item_desc">
                           <h3 class="item_title">
                           ${product[i].title}
                           </h3>
                         <span class="s_price">
                           ${product[i].name}
                          </span>
                             </div>
                    </li>`; $('.item_box').append(list)
    }

    let product_list = PRODUCT_LIST[0];
    for(let i=0; i<20; i++){
       let list = `<li class="item item">
                      <div class="item_img item_img">
                        <img src="${product_list[i].src}" alt="">
                      </div>
                        <div class="item_desc">
                           <h3 class="item_title">
                           ${product_list[i].title}
                           </h3>
                         <span class="s_price">
                           ${product_list[i].name}
                          </span>
                             </div>
                    </li>`; $('.sec_title > ul').append(list)
    }
    
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


    //분류된 아이템 링크
    $(document).on("click", ".item", function(){
        if(filter_chk){
            let tmp_href="item_page.html?cate_no=6&item_no="
            tmp_href+=filter_array[$(this).index()]
            location.href=tmp_href
        }
        //링크: item_page에 연결
        if(!filter_chk){
            let tmp_href="item_page.html?"
            let tmp_cart=menu_array.indexOf($(this).parents(".section").attr("id"))
            let tmp_item=$(this).index()

            tmp_href+="cate_no="+tmp_cart
            tmp_href+="&"
            tmp_href+="item_no="+tmp_item

            location.href=tmp_href
        }
    })


    // 리사이즈 init + chk
    $(window).resize(function(){
        if($(window).width()>=960){
            if(winsize_chk[0]==false){
                resize_chk();
                resize_cate_banner_init(cate_no);
            }
        }
        else if($(window).width()>=720){
            if(winsize_chk[1]==false){
                resize_chk();
                resize_cate_banner_init(cate_no);
            }
        }
        else {
            if(winsize_chk[2]==false){
                resize_chk();
                resize_cate_banner_init(cate_no);
            }
        }
    })
});