var w=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
var h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
var vw = window.screen.availWidth;

var g_scale = 0.8;
if (w>600) {
    g_scale = 1.5;
}  else {
    $('body').addClass('regular');
}

var btn=document.getElementById("btn");
var overlay=document.getElementById("overlay");
var cross=document.getElementById("cross-overlay");
var zcm_w = 300;
var zcm_h = 282;
var bom_w = 300;
var _ratio = w/1200;

const aspect_ratio = w/h;
if (aspect_ratio > 0.6) {
    $('body').addClass('shrink');
    g_scale = 1.4;
    zcm_h = 260;
} 
if (aspect_ratio > 0.71) {
    $('body').addClass('pad');
    g_scale = 1.1;
}
var yb_scale = g_scale*0.7;
var bomb_scale = g_scale*0.5;

var zcm = {
    speed: 200,
    x: 0,
    y: 0
};

function c_yb() {
    var speed = 10,
        x = 0,
        y = 0,
        angle=0,
        type=1;
};
c_yb.prototype.init = function () {
    this.speed = 12;
    this.y = -canvas.height * Math.random();
    var _w = getPos();
    
    this.x = _w;
    if (_w >= canvas.width) {
        this.x = canvas.width*0.66;
    } else if (_w <= 0) {
        this.x = 100;
    }
    this.type = Math.floor(Math.random()*5);
    this.angle = (( Math.floor(Math.random()*2) == 0 ) ? 75 : -75);
}
var ybs = [];

function bom() {
    var speed = 3,
        x = 0,
        y = 0,
        type=1;
}
bom.prototype.bomb = function() {
    this.speed = 15;
    this.y = -canvas.height * 2 * Math.random();
    var _w = getPos();

    this.x = _w;
    if (_w >= canvas.width) {
        this.x = 50;
    } else if (_w <= 0) {
        this.x = 50;
    }
    this.type = Math.floor(Math.random()*5);
}
var bomB = new bom();

let counter = 0;
let prevPos = 0;
// to seperate drop position
function getPos() {
    // var _w = canvas.width * ((Math.floor(Math.random()*100)%2+1)/3) ;
    // var _w = canvas.width*(counter%3)/3;
    counter ++;
    var newPos = counter%3;
    return canvas.width*0.3*newPos + 50;
}

var gtime = 0, gscore = 0 , ybsl = 4, gstop = true, bomb=1;

function on_canvas_touch_start(event) {
    event.preventDefault();
    zcm.x=event.changedTouches[0].clientX - (zcm_w*g_scale)/2;
    // zcm.y=h-(zcm_h*g_scale);
    if(zcm.x<=0){
       zcm.x=0;
    }
    if(zcm.x>=w-(zcm_w*g_scale)){
        zcm.x=w-(zcm_w*g_scale);
    }
}
function on_canvas_touch_end(event) {
    event.preventDefault();
    zcm.x=event.changedTouches[0].clientX - (zcm_w*g_scale)/2;
    // zcm.y=h-(zcm_h*g_scale);
        if(zcm.x<=0){
        zcm.x=0;
    }
    if(zcm.x>=w-(zcm_w*g_scale)){
        zcm.x=w-(zcm_w*g_scale);
    }
}
function on_canvas_touch_move(event) {
    event.preventDefault();
    zcm.x=event.changedTouches[0].clientX - (zcm_w*g_scale)/2;
    // zcm.y=h-(zcm_h*g_scale);
     if(zcm.x<=0){
       zcm.x=0;
    }
    if(zcm.x>=w-(zcm_w*g_scale)){
        zcm.x=w-(zcm_w*g_scale);
    }
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

this.canvas.addEventListener('touchstart', (e) => { on_canvas_touch_start(e) }, false);
this.canvas.addEventListener('touchend', (e) => { on_canvas_touch_end(e) }, false);
this.canvas.addEventListener('touchmove', (e) => { on_canvas_touch_move(e) }, false);

var zcmReady = false;
var zcmImage = new Image();
zcmImage.onload = function () {
    zcmReady = true;
};
zcmImage.src = "img/recyclebin.png";

var ybReady = false;
var ybImage = new Image();
ybImage.onload = function () {
    ybReady = true;
};
ybImage.src = "img/item.png";


var bomReady=false;
var bomImage=new Image();
bomImage.onload=function(){
    bomReady=true;
}
bomImage.src="img/bomb.png";

var scoreReady = false;
var scoreBg = new Image();
scoreBg.onload = function () {
    scoreReady = true;
};
scoreBg.src = "img/score-bg.png";

var scoreBarBg = new Image();
scoreBarBg.src = "img/score-bar-bg.png";

var scoreBar = new Image();
scoreBar.src = "img/score-bar.png";

// var bgReady = false;
// var gameBg = new Image();
// gameBg.onload = function () {
//     bgReady = true;
// };
// gameBg.src = "img/game-bg.jpg";

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//reset
var reset = function () {
    gstop = false;
    gtime = 300;
    gscore = 0;
    ybsl = 1;
    zcm.x = canvas.width / 2 - ((zcm_w/2)*g_scale);
    zcm.y = canvas.height - (zcm_h*g_scale);
    for (var i = 0; i < ybsl; i++) {
        ybs[i] = new c_yb();
        ybs[i].init();
    } 
    bomB.bomb();
}
var update = function (modifier) {

    if (37 in keysDown) { // 用户按的是←
        if(zcm.x<=0){
            zcm.x=0;   
        }else{
            // zcm.x-=zcm.speed*modifier;
             zcm.x-=(20*g_scale);
        }
    }
    if (39 in keysDown) { // 用户按的是→
        if (zcm.x < (canvas.width - 150)){
            // zcm.x += zcm.speed * modifier;
            zcm.x +=(20*g_scale);
        }
        if(zcm.x>=(canvas.width)-(zcm_w*g_scale)){
            zcm.x = canvas.width-(zcm_w*g_scale);
        }
    }
    var collision_zcm = (zcm_w/2*g_scale);
    var collision_yb = (zcm_w/2*yb_scale);
    var collision_bomb = (zcm_w/2*bomb_scale);

    if (gtime > 0 && gscore < 10) {
        for (var i = 0; i < ybsl; i++) {
            // collision detect
            if (bomB.y > (canvas.height - zcm_h)) {
                if (Math.abs((zcm.x + collision_zcm) - (bomB.x + collision_bomb)) < 80) {
                    cross.style.display="block";
                    setTimeout(() => {
                        cross.style.display="none";
                    }, 1000)
                }
                bomB.bomb();
            } else {
                bomB.y += (bomB.speed);
            }
            if (ybs[i].y > (canvas.height - zcm_h)) {
                if (Math.abs((zcm.x + collision_zcm) - (ybs[i].x + collision_yb)) < 120) {
                    gscore+=1;
                }
                ybs[i].init();
            } else {
                ybs[i].y += (ybs[i].speed);
            }
        }
    } else {
        gstop = true;
        ybImage.src = " ";
        bomImage.src=" ";

        // Game finish
        overlay.style.display="block";
        // setTimeout(() => {
        //     $('#success-text').fadeIn('slow');
        // }, 1000);
    }

}

function drawImage (ctx, img, x, y, angle = 0, scale = 1) {
    // scale = g_scale;
    ctx.save();
    ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
    ctx.rotate(angle);
    ctx.translate(- x - img.width * scale / 2, - y - img.height * scale / 2);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    ctx.restore();
}

var render = function () {
    //背景
    ctx.fillStyle = "#e8e5df";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";

    bottomY = (canvas.height - zcm_h*g_scale);
    
    // if (bgReady) {
    //     drawImage(ctx, gameBg, 0, 0, 0, _ratio);
    // }
    if (ybReady) {
        for (var i = 0; i < ybsl; i++) {
            if (ybs[i].y < bottomY) {
                ybImage.src = "img/item-"+ybs[i].type+".png";
                // ctx.drawImage(ybImage, ybs[i].x, ybs[i].y);
                drawImage(ctx, ybImage, ybs[i].x, ybs[i].y, ybs[i].angle, yb_scale);
            }
        }
    }
    if(bomReady && bomB.y < bottomY){
        bomImage.src = "img/bomb-"+bomB.type+".png";
        // ctx.drawImage(bomImage,bomB.x,bomB.y);
        drawImage(ctx, bomImage, bomB.x, bomB.y, 75, bomb_scale);
    }
    if (zcmReady) {
        drawImage(ctx, zcmImage, zcm.x, zcm.y, 0, g_scale);
    }
    if (scoreReady) {
        drawImage(ctx, scoreBg, 0, 0, 0, _ratio);
        // score bar
        ctx.drawImage(scoreBarBg, 200*_ratio, 44*_ratio, 760*_ratio, 118*_ratio)
        ctx.drawImage(scoreBar, 325*_ratio, 70*_ratio, 612*_ratio*(gscore/10), 65*_ratio)
    }

    ctx.shadowBlur=40;
    ctx.shadowColor="white";
    ctx.textAlign="center";
    ctx.fillStyle="#ffeeb2";
    ctx.font="40px Verdana";
    ctx.fillText(gscore+"／10", 1050*_ratio, 120*_ratio);
    // ctx.fillText("Time: " + gtime.toString().substring(0, 4), canvas.width/2, canvas.height/15);

}

var main = function () {
    var now = Date.now();
    var delta = now - then;
    gtime = (gtime * 1000 - delta) / 1000;
    update(delta / 500);
    render();
    then = now;

    this.loop = requestAnimationFrame(main);
};

var then = Date.now();
reset();
// main();

function showText(id, delay) {
    var elem = $(id);
    setTimeout(function () {
        elem.css('opacity', 1);
        // show start game button
        if (delay == 3) {
            $('#action .title-btn').fadeIn('slow');
        };
    }, delay * 600)
}
// Start catch game
$('#action #start').click(function(e) {
    $('#action').fadeOut('medium');
    reset();
    main();
});
// Box falling animation
let _margin = 0;
var redirectGame = function() {
    setTimeout(() => {
        $('#action').fadeIn(); 
        let endLine = $('#trashCan').offset().top - ($('#fallingBox').height()/5);
        let intervalid = setInterval(( () => {
                _margin += 25;
                $('#fallingBox').css('margin-top', _margin+'px');
                if (_margin > endLine ) {
                    clearInterval(intervalid);
                    // $('#action .action-text, #action .title-btn').fadeIn('slow');
                    for (var i=1; i<=3; i++) {
                        showText('#action .action-text.text'+i, i);
                    }
                }
        } ), 30);
    }, 800);
}
// First enter page, text zoom-in
// redirect to 開始遊戲畫面
redirectGame();
