$(function() {
    //当点击了li，此时不需要执行页面滚动事件里面li的选择，即不需要添加current
    //节流阀（互斥锁）
    var flag = true;
    //1.显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }

    $(window).scroll(function() {
        toggleTool();
        if (flag) {
            //3.页面滚动到某个内容区域，左侧电梯导航li响应添加和删除current类名
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }
    });
    //2.点击电梯导航页面可以滚动到响应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        //.每次点击li就需要计算出页面要去往的位置
        //选出对应索引号的内容区的盒子 计算出它的offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //页面滚动效果
        $("body,html").stop().animate({
                scrollTop: current
            }, function() {
                flag = true;
            })
            //点击之后让当前的li添加current类名，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
})