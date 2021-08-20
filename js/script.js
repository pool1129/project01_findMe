const cursor = document.querySelector(".cursor");
const body = document.querySelector("body");
const bodyBg = document.querySelector(".bg");
const reset = document.querySelector('.reset');
const input = document.querySelector('.text input');
const txt = document.querySelector('.text p');
const inTxt = document.querySelector('.text >p >span');

// TODO : 커서부분
const circle = cursor.getBoundingClientRect();
// const width = cursor.offsetWidth;
// const height = cursor.offsetHeight;

function follow(e){
    gsap.to(cursor, {duration: .3, left: e.pageX - circle.width/2, top: e.pageY - circle.height/2});
}

document.addEventListener("mousemove", follow);

// TODO : 카운트 다운
const count = document.querySelector('.count');
var i = 20;

var countDown = setInterval(() => {

    if(i < 0){
        txt.innerHTML = `정답은 <span style="color: ${body.dataset.style};">${body.dataset.type}</span>입니다!`;
        txt.style.textShadow = '2px 2px #000';
        bodyBg.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        input.style.display = 'none';

        clearInterval(countDown);
        i = 20;
    }else{
        document.onkeypress = inputCheck
        count.innerHTML = i
        i--
    }

}, 1000);

// TODO : 이미지 랜덤 불러오기
function randomSource(){

    var num = Math.floor(Math.random()*randomImg.length+1);

    // console.log(randomImg[num-1].data);

    cursor.style.background = `url(./img/${num}.jpg) no-repeat center center fixed`;
    body.style.background = `url(./img/${num}.jpg) no-repeat center center`;
    body.dataset.style = `${randomImg[num-1].color}`;
    body.dataset.type = `${randomImg[num-1].data}`;
}

randomSource();

// TODO : 인풋박스 정답 비교
function inputCheck(e){

    const value = input.value;

    if(e.keyCode == 13){ //엔터키를 누르면 인풋값 전송
        // console.log(input.value);

        if(value == body.dataset.type){
            // console.log('정답');
            txt.innerHTML = '정답 입니다!';
            txt.style.textShadow = '2px 2px #000';
            input.style.display = 'none';
            bodyBg.style.backgroundColor = 'rgba(0, 0, 0, 0)';

            clearInterval(countDown);
            i = 20;
        }else{
            // console.log('오답');
            input.value = null;
            txt.innerHTML = '다시 해볼까요?';
            cursor.style.width = '20vh'; 
            cursor.style.height = '20vh';
        }

        return false;
    }
}

// TODO : 리셋버튼 새로고침
reset.addEventListener('click',function(){
    window.location.reload();
})


