/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-07-18 20:17:37
 * @LastEditTime: 2023-07-31 10:00:51
 */




// 添加隐藏
function addHidden(target, cName) {
    for (let i = 0; i < target.length; i++) {
        target[i].classList.add(cName);
    }
}

//移除选中效果
function removeCse(target, cName) {
    for (let i = 0; i < target.length; i++) {
        target[i].classList.remove(cName);
    }
}



// 放大镜
let zoom = document.getElementById('zoom');
let zoomPup = document.querySelector('.zoom-pup');
let zoomBox = document.querySelector('.zoom-box');
let zoomImg = document.getElementById('zoom-img');

zoom.onmouseover = function () {
    zoomPup.style.display = 'block';
    zoomBox.style.display = 'block';
}

zoom.onmouseout = function () {
    zoomPup.style.display = 'none';
    zoomBox.style.display = 'none';
}

// 变换放大镜的位置
zoom.addEventListener("mousemove", function (event) {
    // 获取鼠标相对父容器顶部的偏移量
    var offsetY = event.clientY - zoom.getBoundingClientRect().top;
    // 获取鼠标相对父容器左边的偏移量
    var offsetX = event.clientX - zoom.getBoundingClientRect().left;

    let left = offsetX - zoomPup.offsetWidth / 2;
    let top = offsetY - zoomPup.offsetHeight / 2;
    if (left < 0) {
        left = 0;
    }
    if (left >= zoom.clientWidth - zoomPup.clientWidth) {
        left = zoom.clientWidth - zoomPup.clientWidth;
    }
    if (top < 0) {
        top = 0;
    }
    if (top > zoom.clientHeight - zoomPup.clientHeight) {
        top = zoom.clientHeight - zoomPup.clientHeight;
    }

    zoomPup.style.left = left + "px";
    zoomPup.style.top = top + "px";


    // 更换大图

    let movey = top / (zoom.clientHeight - zoomPup.clientHeight);
    let moveTop = movey / 2 * (800 - zoomBox.clientHeight);

    let movex = left / (zoom.clientWidth - zoomPup.clientWidth);
    let moveLeft = movex * (800 - zoomBox.clientWidth);

    zoomImg.style.top = -moveTop + 'px';
    zoomImg.style.left = -moveLeft + 'px';
});

// 轮播图
let lis = document.querySelectorAll('.spec-list-img li')

for (let i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function () {
        lis[i].className = 'img-hover';
    }
    lis[i].onmouseout = function () {
        lis[i].className = '';
    }
}



// 切换图片
let productImg = document.getElementById('zoom-product-img');
let forwardBtn = document.querySelector('.spec-forward');
let backwardBtn = document.querySelector('.spec-backward');
let ulImg = document.querySelector('.spec-list-img');
let i1 = document.querySelector('.spec-forward i');
let i2 = document.querySelector('.spec-backward i');

backwardBtn.addEventListener('click', function () {
    if (ulImg.offsetLeft >= 0) {
        i2.className = "img2-click";
        i1.className = "img1"
        ulImg.style.left = -166 + "px";
    } else {
        return;
    }
});

forwardBtn.addEventListener('click', function () {
    if (ulImg.offsetLeft < 0) {
        console.log(111)
        i2.className = "img2";
        i1.className = "img1-click"
        ulImg.style.left = 0 + "px";
    } else {
        return;
    }
});

// 切换商品图片
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        productImg.src = './images/m' + (i + 1) + "1.jpg";
        zoomImg.src = './images/m' + (i + 1) + "1.jpg";
    }
}

// 实现购物车加减
let productNum = document.querySelector('.count-input-txt');
let redNum = document.querySelector('.btn-reduce');
let adddNum = document.querySelector('.btn-add');

adddNum.onclick = function () {
    productNum.value = productNum.value - 0 + 1;
}

redNum.onclick = function () {
    if (productNum.value - 0 <= 1) {
        productNum.value = 1;
    } else {
        productNum.value = productNum.value - 0 - 1;
    }
}

// 选择地址
let chooseAdd = document.getElementById('address-choose');
let addWarp = document.querySelector('.address-content-warp');
let addressText = document.querySelector('.address-text');

let chooseBtns = document.querySelectorAll('.switchable-item');
let chooseBtnstext = document.querySelectorAll('.switchable-item em');
let address = document.querySelectorAll('.area-address');

// 选中地区标签
let provinces = document.querySelectorAll('.location-ponce a');
let city = document.querySelectorAll('.location-city a');
let county = document.querySelectorAll('.location-county a');
let town = document.querySelectorAll('.location-town a');

chooseAdd.onmouseover = function () {
    addWarp.style.display = 'block';
}

chooseAdd.onmouseout = function () {
    addWarp.style.display = 'none';
}


for (let i = 0; i < chooseBtns.length; i++) {
    chooseBtns[i].onclick = function () {
        removeCse(chooseBtns, "address-current");
        addHidden(address, 'area-hidden');
        chooseBtns[i].classList.add('address-current');
        address[i].classList.remove('area-hidden');
    }
}

// 更换省
for (let i = 0; i < provinces.length; i++) {
    provinces[i].onclick = function () {
        removeCse(provinces, 'choose-lk');
        provinces[i].classList.add('choose-lk');
        chooseBtnstext[0].innerHTML = provinces[i].innerHTML;
    }
}

// 更换市
for (let i = 0; i < city.length; i++) {
    city[i].onclick = function () {
        removeCse(city, 'choose-lk');
        city[i].classList.add('choose-lk');
        chooseBtnstext[1].innerHTML = city[i].innerHTML;
    }
}

// 更换区
for (let i = 0; i < county.length; i++) {
    county[i].onclick = function () {
        removeCse(county, 'choose-lk');
        county[i].classList.add('choose-lk');
        chooseBtnstext[2].innerHTML = county[i].innerHTML;
    }
}

// 更换镇
for (let i = 0; i < town.length; i++) {
    town[i].onclick = function () {
        removeCse(town, 'choose-lk');
        town[i].classList.add('choose-lk');
        chooseBtnstext[3].innerHTML = town[i].innerHTML;
        addressText.innerHTML = chooseBtnstext[0].innerHTML + chooseBtnstext[1].innerHTML + chooseBtnstext[2].innerHTML + chooseBtnstext[3].innerHTML
    }
}

// 选择颜色
let colorBtns = document.querySelectorAll('.color-item-lk');

for (let i = 0; i < colorBtns.length; i++) {
    colorBtns[i].onclick = function () {
        removeCse(colorBtns, 'color-click');
        colorBtns[i].classList.add('color-click');
    }
}

// 选择白条
let baiTaio = document.querySelectorAll('.baitiao-item');
let baiTaioHide = document.querySelectorAll('.baitiao-tips');

for (let i = 0; i < baiTaio.length; i++) {
    baiTaio[i].onmouseover = function () {
        baiTaioHide[i].classList.remove('hide');
    }
    baiTaio[i].onmouseout = function () {
        baiTaioHide[i].classList.add('hide');
    }
}

// 展开分类
let openBtn = document.querySelector('.sp-open-true');
let categoryItem = document.querySelector('.dd-hide');

openBtn.onclick = function () {
    if (categoryItem.className === "dd-hide") {
        categoryItem.classList.remove('dd-hide');
        openBtn.style.backgroundPosition = "-37px 0";
    }else{
        categoryItem.classList.add('dd-hide');
        openBtn.style.backgroundPosition = "-20px 0";
    }
}

// 选择商品详情
let detailLis = document.querySelectorAll('.detail-tab-main li');

for (let i = 0; i < detailLis.length; i++) {
    detailLis[i].onclick = function () {
        removeCse(detailLis, 'target-this');
        detailLis[i].classList.add('target-this');
    }
}

