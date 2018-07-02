//获取wrap,定图片的宽度是200px，图片的间隙10px；
var wrap = document.querySelector('.wrap');
var heightArr = [];//有几个元素就代表有几列
var count = 0;//记录渲染图片的个数；
var num = 0;
//让大浏览器强行出现滚动条
var htmlEle = document.querySelector('html');
htmlEle.style.height = document.documentElement.clientHeight + 10 + 'px';
//计算页面能存放图片的列数
function columnNum(){
    //重新计算页面中的列数时，需要清空原来没一列的高度
    heightArr = [];
    var colNum = Math.floor(wrap.offsetWidth / 210);
    console.log(colNum);
    for(var i = 0;i < colNum;i++){
        heightArr.push(0);
    }
}

//获取高度最小的列，在heightArr中的下标
function minIndexFn(){
    var min = heightArr[0];
    for(var i = 0; i < heightArr.length;i++){
        min = min < heightArr[i] ? min : heightArr[i];
    }
    return heightArr.indexOf(min);
}

//先加载20张图片到页面上
function createImgFn(){

    for(var i = num;i < num + 20; i++){
        if(i < 97){
            var imgTemp = new Image();

            //当图片下载完成并渲染到img上之后会触发onload事件
            imgTemp.onload = function(){
                count++;
                console.log(count);
                wrap.appendChild(this);
                //当所有图片加载完成之后，给他们进行定位
                if(count >= 20){
                    positionImgFn();
                }
            }
            imgTemp.src = 'img/'+ i + '.jpg';
        }
    }
    num = i;
}
createImgFn();
function positionImgFn(){
    columnNum();
    var imgs = wrap.children;
    for(var i = 0;i < imgs.length;i++){
        //获取高度最小的列
        var minIndex = minIndexFn();
        //设置图片的定位left值
        imgs[i].style.left = minIndex * 210 + 'px';
        //设置图片的定位top值
        imgs[i].style.top = heightArr[minIndex] + 10 + 'px';

        //改变heightArr元素的值
        heightArr[minIndex] += imgs[i].offsetHeight + 10;
    }

}
//跟随浏览器尺寸的变化，重新布置页面
window.onresize = function(){
    positionImgFn();
}

window.onscroll = function(){
    var scrollT = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
    var seeHeight = document.documentElement.clientHeight;
    var totalHeight = document.documentElement.scrollHeight;
    if(scrollT + seeHeight >= totalHeight - 200){
        createImgFn();
        columnNum();
        positionImgFn();
    }
}