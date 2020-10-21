window.addEventListener("load", function () {
  //预加载
  //1.获取元素
  var arrow_l = document.querySelector(".arrow_l");
  var arrow_r = document.querySelector(".arrow_r");
  var focus = document.querySelector(".focus");
  var focusWidth = focus.offsetWidth; //获取图片宽度

  //2.鼠标经过轮播图区域 左右按钮显示
  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    //停止定时器,停止自动播放
    clearInterval(timer);
    timer = null; //清除定时器变量
  });

  //鼠标离开轮播图区域 左右按钮隐藏
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    //开启定时器，自动播放开始
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });

  //3.动态生成小圆圈 里面有几张图片 就创建几个小圆点
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  for (var i = 0; i < ul.children.length; i++) {
    //创建一个li
    var li = document.createElement("li");
    //记录当前小圆圈的索引号 通过自定义属性来做
    li.setAttribute("index", i);
    //把li插入ol里面
    ol.appendChild(li);

    //4.小圆圈的排他事件 可以在生成小圆圈的同时直接绑定事件
    // 点击当前小圆圈，就添加current 类，其余的就移除这个类
    li.addEventListener("click", function () {
      //（1）干掉所有人 所有li 清除 current 类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      //（2）留下自己 自己添加 current 类名
      this.className = "current";

      //5.点击小圆圈，移动图片 移动的是ul
      //ul移动距离：小圆圈的索引号乘以图片的宽度(是负值)
      //点击了小圆圈，就拿到当前li的索引号
      var index = this.getAttribute("index");
      //当点击了某个li 就把这个li的索引号给 num
      num = index;
      //当点击了某个li 就把这个li的索引号给 circle
      circle = index;
      animate(ul, -(index * focusWidth));
    });
  }

  //第一个ol小圆圈添加类名 current
  ol.children[0].className = "current";
  //6.克隆第一张图片 放到最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);

  //7.点击右侧按钮，图片滚动一张
  var num = 0;
  var circle = 0; //控制小圆圈的播放
  //var flag = true; //节流阀
  arrow_r.addEventListener("click", function () {
    //如果走到了最后复制的一张 ul 要快速复原 left 改为0
    if (num == ul.children.length - 1) {
      ul.style.left = 0;
      num = 0;
    }
    num++;
    animate(ul, -num * focusWidth);
    //8.点击右侧按钮，小圆圈跟着一起变化，可以再声明一个变量控制小圆圈的播放
    //如果circle = 4 ,即走到最后了，复原
    circle++;
    if (circle == ol.children.length) {
      circle = 0;
    }
    circleChange(); //调用函数
  });

  //9.点击左侧按钮，图片滚动一张
  arrow_l.addEventListener("click", function () {
    //如果走到了最后复制的一张 ul 要快速复原 left 改为0
    if (num == 0) {
      num = ul.children.length - 1;
      ul.style.left = -num * focusWidth + "px";
    }
    num--;
    animate(ul, -(num * focusWidth));
    //点击左侧按钮，小圆圈跟着一起变化，可以再声明一个变量控制小圆圈的播放
    circle--;
    //如果 circle < 0 说明是第一张图片 此时小圆圈要改为第四个小圆圈（3）
    if (circle < 0) {
      circle = ol.children.length - 1;
    }
    circleChange(); //调用函数
  });

  function circleChange() {
    //先清除其余小圆圈类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    //留下当前小圆圈的 current 类名
    ol.children[circle].className = "current";
  }

  //10.自动播放功能
  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
});
