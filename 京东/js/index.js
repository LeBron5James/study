/*
 * @Descripttion: 
 * @Author: qiyu
 * @version: 
 * @Date: 2023-07-12 22:29:26
 * @LastEditTime: 2023-07-17 20:50:57
 */
// 清除className
function clearClassName(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].className = ""
    }
}

// 实现模糊查询
let keyword = document.querySelector('.keyword');
let searchHelper = document.querySelector('.search-helper')

//模拟搜索内容
let searchArr = ['小米手机', '华为手机', '小米电视', '小米手表', '苹果14', '苹果15', '苹果平板'];

keyword.oninput = function () {
    // 改变后先清空
    searchHelper.innerHTML = ''
    for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i].indexOf(keyword.value) != -1) {
            searchHelper.innerHTML += '<p>' + searchArr[i] + '</p>';
            searchHelper.style.display = 'block';
        }
    }
}

keyword.onblur = function () {
    searchHelper.style.display = 'none';
}

//实现轮播图的切换
let img = document.querySelector('.swiper-img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let swiper = document.querySelector('.banner-swiper');
let lis = document.querySelectorAll('.banner-dot li')

let imgArr = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg'];
let count = 0;
//切换图片
function cutImg() {
    img.src = './images/' + imgArr[count];
    clearClassName(lis);
    lis[count].className = 'active';
}

let timer = setInterval(function () {
    count++;
    if (count > imgArr.length - 1) {
        count = 0;
    }
    cutImg();
}, 3000)

//点击切换
prev.onclick = function () {
    count--;
    if (count < 0) {
        count = imgArr.length - 1;
    }
    cutImg();
}

next.onclick = function () {
    count++;
    if (count > imgArr.length - 1) {
        count = 0;
    }
    cutImg();
}

//鼠标
swiper.onmouseover = function () {
    clearInterval(timer);
}

swiper.onmouseout = function () {
    timer = setInterval(function () {
        count++;
        if (count > imgArr.length - 1) {
            count = 0;
        }
        cutImg();
    }, 3000)
}

for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = () => {
        count = i;
        cutImg();
    }
}


//实现楼层的定位切换
let header = document.querySelector('.header');
let banner = document.querySelector('.banner');
let elevator = document.querySelector('.elevator-list');

let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let searchLogo = document.querySelector('.search-logo');
let shopcar = document.querySelector('.shopcar')

//实现楼层滚动，文字高亮效果
let items = document.querySelectorAll('.content .item');
let elevatorA = document.querySelectorAll('.elevator-list a');

let elevatorArr = []  //存放距离

// 获取基础高度
let baseHight = header.offsetHeight + banner.offsetHeight;
for (let i = 0; i < items.length; i++) {
    baseHight = baseHight + items[i].offsetHeight;
    elevatorArr.push(baseHight);
}

document.onscroll = function () {
    //获取滚动条垂直方向滚动距离
    let top = document.documentElement.scrollTop || document.body.scrollTop;

    //获取header,banner高度
    let headerHeight = header.offsetHeight;
    let bannerHeight = banner.offsetHeight;

    //实现固定定位
    if (top >= headerHeight + bannerHeight) {
        elevator.className = 'elevator-list elevator-fixed';
        search.className = 'search search-fix';
        searchM.style.height = '50px';
        form.style.top = '8px';
        shopcar.style.top = '8px';
        searchLogo.style.display = 'block';
    } else {
        elevator.className = 'elevator-list';
        search.className = 'search';
        searchM.style.height = '60px';
        form.style.top = '25px';
        shopcar.style.top = '25px';
        searchLogo.style.display = 'none';
    }

    //实现字体颜色切换
    if (top >= headerHeight + bannerHeight && top < elevatorArr[0]) {
        clearClassName(elevatorA);
        elevatorA[0].className = 'checkColor'
    } else if (top >= elevatorArr[0] && top < elevatorArr[1]) {
        clearClassName(elevatorA);
        elevatorA[1].className = 'checkColor'
    } else if (top >= elevatorArr[1] && top < elevatorArr[2]) {
        clearClassName(elevatorA);
        elevatorA[2].className = 'checkColor'
    } else {
        clearClassName(elevatorA);
    }
}


//实现鼠标悬浮，切换图标和字体颜色
let liService = document.querySelectorAll('.service-item');
let liImg = document.querySelectorAll('.service-item img');
let txt = document.querySelectorAll('.service-txt');

let liImgArr1 = ['11.png', '21.png', '31.png', '41.png', '51.png', '61.png', '71.png', '81.png', '91.png', '101.png', '111.png', '121.png']
let liImgArr2 = ['12.png', '22.png', '32.png', '42.png', '52.png', '62.png', '71.png', '82.png', '92.png', '102.png', '112.png', '122.png']

for (let i = 0; i < liService.length; i++) {
    liService[i].onmouseover = () => {
        liImg[i].src = './images/' + liImgArr2[i];
        txt[i].style.color = '#c81623';
    }
    liService[i].onmouseout = () => {
        liImg[i].src = './images/' + liImgArr1[i];
        txt[i].style.color = '#333';
    }
}


//实现倒计时
let second = document.querySelector('.timmer-second');
let minute = document.querySelector('.timmer-minute');
let hour = document.querySelector('.timmer-hour');

function updateCountdown() {
    //获取当前时间
    let now = new Date();

    //设置目标时间
    let target = new Date();
    target.setHours(12, 0, 0, 0);

    //判断是否超时
    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    //计算剩余时间
    let residueTime = target - now;

    hour.onclick = () => {
        console.log(residueTime);
    }

    let hours = Math.floor(residueTime / (1000 * 60 * 60));
    let minutes = Math.floor((residueTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((residueTime % (1000 * 60)) / 1000);

    second.innerHTML = seconds;
    minute.innerHTML = minutes;
    hour.innerHTML = hours;
}

updateCountdown();

setInterval(updateCountdown, 1000);

//为你推荐--鼠标进入
let liFeed = document.querySelectorAll('.feed-tab-item');
let spanTxt = document.querySelectorAll('.item-title-txt');
let divLike = document.querySelectorAll('.feed-item-desc');

for (let i = 0; i < liFeed.length; i++) {
    liFeed[i].onmouseover = () => {
        if (i == 0) {
            return;
        } else {
            spanTxt[i].style.color = '#c81623';
            divLike[i].style.color = '#c81623';
        }
    }
    liFeed[i].onmouseout = () => {
        if (i == 0) {
            return;
        } else {
            spanTxt[i].style.color = '#333';
            divLike[i].style.color = '#999';
        }
    }
}