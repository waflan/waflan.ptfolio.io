//　背景画像
let images = ["pinky.gif","cmk.png","chu.png","skmdl.png"];
let bg = document.getElementsByClassName("HomeContainerBG").item(0);
let rowNum=5,colNum=10;
let pxColumn = parseInt(bg.clientHeight/colNum);
let pxRow = parseInt(bg.clientWidth/rowNum);
let imageIndex =0;
for(let i = 0; i < colNum; i++){
    for (let j = 0; j < rowNum; j++) {
        let cell = document.createElement("div");
        cell.classList.add("BG-Cell");
        cell.style.width=pxRow+"px";
        cell.style.height=pxColumn+"px";
        cell.style.backgroundImage =  "url(../../images/"+ images[imageIndex] +")";
        bg.appendChild(cell);
        imageIndex++;
        if (imageIndex>=images.length) {
            imageIndex=0;
        }
    }
}
let cells=document.getElementsByClassName("BG-Cell");
window.addEventListener("resize", function() {
    pxColumn = parseInt(bg.clientHeight/colNum);
    pxRow = parseInt(bg.clientWidth/rowNum);
    for(let i=0;i<cells.length;i++){
        cells[i].style.width=pxRow+"px";
        cells[i].style.height=pxColumn+"px";
    }
});

// ホバー時の連画像アニメーション
let ill = document.getElementsByClassName("imgBox");
for (let i = 0; i < ill.length; i++) {
    let images = ill[i].children;
    ill[i].setAttribute("opval",0);
    if (images.length>1) {
        for (let j = 1; j < images.length; j++) {
            images[j].style.opacity = '0';
        }
    }
    setInterval(function() {
        if(!ill[i].hasAttribute("switch")){
            ill[i].setAttribute("switch",0);
        }
        let sw =parseInt(ill[i].getAttribute("switch"));
        if(sw!=0){
            let val = parseFloat(ill[i].getAttribute("opval"));
            let leap;
            if(ill[i].hasAttribute("leap")){
                leap =parseFloat(ill[i].getAttribute("leap"));
            }else{
                leap = 0.1;
            }
            leap *=sw;
            val+=leap;
            if(val>1){
                val=1;
                ill[i].setAttribute("switch",0);
            }else if(val<0){
                val=0;
                ill[i].setAttribute("switch",0);
            }
            ill[i].setAttribute("opval",val);
            let v=1.0/(images.length-1);
            for (let j = 0; j < images.length; j++) {
                let op = Math.abs(val-(v*j))/v;
                images[j].style.opacity=""+(1-op);
            }
        }
    },100);
    ill[i].addEventListener("mouseenter",function() {
        ill[i].setAttribute("switch",1);
    });
    ill[i].addEventListener("mouseleave",function() {
        ill[i].setAttribute("switch",-1);
    });
    let parent =  ill[i].parentElement;
    let titles = parent.getElementsByTagName("h1");
    for (let j = 0; j < titles.length; j++) {
        titles[j].addEventListener("mouseenter",function() {
            ill[i].setAttribute("switch",1);
        });
        titles[j].addEventListener("mouseleave",function() {
            ill[i].setAttribute("switch",-1);
        });
    }
}

