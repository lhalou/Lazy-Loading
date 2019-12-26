
//打开页面（未滚动前）先进行判断，避免打开页面没有内容显示
lazyRender();
//设置一个定时器，对浏览器性能进行优化，防止滚动式触发好几次事件。
var clock;
// 窗口触发滚动事件
$(window).on('scroll',function(){
    if(clock){
        clearTimeout(clock);
    }
    clock = setTimeout(function(){
        lazyRender();
    },500)
});

function lazyRender(){
    $('.container img').each(function(){
        //img出现在窗口并且未加载 ，则加载img
        if(checkShow($(this)) && !isLoaded($(this))){
            loadImg($(this));
        }
    });
}

function checkShow($img){
    // 判断是否出现，返回true or false
    var scrollHeight = $(window).scrollTop();
    var windowHeight = $(window).height();
    //自身偏移高度
    var offsetTop = $img.offset().top;
    if((offsetTop < scrollHeight + windowHeight) && (offsetTop > scrollHeight)){
        return true
    }
    return false;
}

function isLoaded($img){
    // 如果data-src === src，则加载过
    return $img.attr('data-src') === $img.attr('src');
}

function loadImg($img){
    //只需要使src得值为data-src的值即可。
    $img.attr('src',$img.attr('data-src'));
}