'use strict'
var gNumsSize = 16;
var gGameNums = []
var gCurrNumIdx = 1;
var gTimerInterval;
var gStartTime;
var gWrongHits = 0;


function play() {
    gCurrNumIdx = 1;
    gWrongHits = 0;
    renderWrongHit(gWrongHits)
    gGameNums = getShuffledNums()
    renderBoard(gGameNums)
    renderNextNum()
}

function renderBoard(nums) {
    var colsPerRow;
    if (gNumsSize === 25) colsPerRow = 5;
    else if (gNumsSize === 36) colsPerRow = 9
    else colsPerRow = 4;

    var size = Math.sqrt(gNumsSize)

    var strHTML = ''
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            var num = nums.pop()
            strHTML += `<td onclick="touchNum(this)" data-id="${num}">${num}</td>`
        }
        strHTML += '</tr>'
    }
    // var colCount = 0
    // for (var i = 0; i < gNumsSize; i++) {
    //     colCount++;
    //     var rowEnd = ''
    //     if (colCount === colsPerRow) {
    //         rowEnd = '</tr><tr>'
    //         colCount = 0;
    //     }
    //     strHTML += `<td onclick="touchNum(this)" data-id="${nums[i]}">${nums[i]}</td>${rowEnd}`
    // }

    var board = document.querySelector('.table');
    board.innerHTML = strHTML;
    document.querySelector('.next-number').classList.remove('hidden')
    document.querySelector('.table').classList.add('rotate')
    setTimeout(() => {
        document.querySelector('.table').classList.remove('rotate')
    }, 1000)
}

function createNums(size) {
    var nums = [];
    for (var i = 0; i < size; i++) {
        nums.push(i + 1)
    }
    return nums;
}

function touchNum(el) {
    var num = +el.innerText;
    if (num === gCurrNumIdx) {
        el.classList.add('marked')
        if (gCurrNumIdx === 1) {
            startTimer()
        }
        gCurrNumIdx++
        //finish board
        if (gCurrNumIdx === gNumsSize + 1) {
            clearInterval(gTimerInterval)
            var buttonDiv = document.querySelector('.buttons');
            document.querySelector('.next-number').classList.add('hidden')
            buttonDiv.style.visibility = 'visible'
            document.querySelector('.table').classList.add('rotate')
            setTimeout(() => {
                document.querySelector('.table').classList.remove('rotate')
            }, 1000)
            return
        }
        renderNextNum()
    } else {
        gWrongHits++
        renderWrongHit(gWrongHits)
    }
}

function getShuffledNums() {
    var nums = createNums(gNumsSize);
    for (var i = 0; i < 10; i++) {
        nums = nums.sort(() => Math.random() - 0.5)
    }
    return nums
}

function changeSize(size, el) {
    gNumsSize = size;
    var elButtons = document.querySelectorAll('.button')
    elButtons.forEach(e => {
        e.classList.remove('selected');
    });

    el.classList.add('selected')
    var buttonDiv = document.querySelector('.buttons');
    buttonDiv.style.visibility = 'hidden';
    play()
}

function startTimer() {
    gStartTime = Date.now()
    var elTimer = document.querySelector('.timer span')
    gTimerInterval = setInterval(function () {
        var passedSeconds = (Date.now() - gStartTime) / 1000
        elTimer.innerText = passedSeconds.toFixed(3)
    }, 100);
}

function renderNextNum() {
    document.querySelector('.next-number p span').innerText = gCurrNumIdx;
}
function renderWrongHit(count) {
    document.querySelector('.wrong-hits p span').innerText = count;
}