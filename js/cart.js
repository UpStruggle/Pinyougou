$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）以及下面的checkall按钮就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名,改变背景色
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });


    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function() {
        // $(".j-checkbox:checked").length 被选中的小复选框的个数
        // $(".j-checkbox").length 所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }

        // 让当前的商品添加 check-cart-item 类名 改变背景色
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });


    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框(+的兄弟)。
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);

        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  parents(".p-num") 返回指定的祖先级元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); //截取字符串,去掉￥
        //console.log(p);
        var price = (p * n).toFixed(2); // toFixed(2) 可以让我们保留2位小数
        // 小计模块       
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    //减少商品数量模块,同上
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // 当前商品的价格 p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); //截取字符串,去掉￥
        //console.log(p);
        // 小计模块 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });



    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function() {
        // 先得到当前文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); //截取字符串,去掉￥
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });



    // 5. 计算总计和总额模块
    getSum(); //第一次打开调用一次函数,计算当前的总数量和总价
    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) { //遍历表单
            count += parseInt($(ele).val()); //将表单中的值相加=总件数(转换成数字型,整数)
        });
        $(".amount-sum em").text(count); //已选商品总数的文本框

        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1)); //将表单中的值相加=总价钱(转换成浮点型,有小数)
        });
        $(".price-sum em").text("￥" + money.toFixed(2)); //总价钱的文本框
    }



    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        // 删除的是当前的商品 
        $(this).parents(".cart-item").remove();
        //每次删除后都需要重新调用一下总额
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
})