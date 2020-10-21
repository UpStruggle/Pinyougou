//页面预加载
window.addEventListener("load", function () {
  var preview_img = document.querySelector(".preview_img");
  var mask = document.querySelector(".mask");
  var big = document.querySelector(".big");

  //1.鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
  preview_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  preview_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  //把鼠标坐标给遮挡层是不合适的，因为遮挡层坐标以父盒子为准
  preview_img.addEventListener("mousemove", function (e) {
    //（1）先计算出鼠标在盒子内的坐标
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    //（2）减去盒子高度宽度的一半
    //（3）mask 移动的距离
    var maskX = x - mask.offsetWidth / 2;
    var maskY = y - mask.offsetHeight / 2;
    //(4)如果坐标小于0 就让他停在 0 的位置(即超出盒子范围就停止)
    var egdeX = preview_img.offsetWidth - mask.offsetWidth;
    var egdeY = preview_img.offsetHeight - mask.offsetHeight;
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= egdeX) {
      maskX = egdeX;
    }
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= egdeY) {
      maskY = egdeY;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY + "px";
    //大图片的移动距离 = 遮挡层移动距离*大图片最大移动距离 / 遮挡层的最大移动距离
    var bigImg = document.querySelector(".bigImg");
    //大图片最大移动距离
    var bigMax = bigImg.offsetWidth - big.offsetWidth;
    //大图片的移动距离 x y
    var bigX = (maskX * bigMax) / egdeX;
    var bigY = (maskY * bigMax) / egdeY;
    bigImg.style.left = -bigX + "px";
    bigImg.style.top = -bigY + "px";
  });
});
