let tabs = document.querySelectorAll('.task-tabs div');
let gameList = [];
let filterList = [];
let mode = 'all';
let underLine = document.getElementById('under-line')

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)});
}

for (let i = 0; i < games.length; i++) {
    let game = {
        id: randomIDGenerate(),
        gameName: games[i].gameName,
        gameImg: games[i].gameImg,
        gameCategory: games[i].gameCategory
    }

    gameList.push(game);
}

// 화면 렌더링
function render() {
    let resultHTML = ''
    let list = [];

    if (mode == 'all') {
        list = gameList;
    }
    else if (mode == 'ongoing' || mode == 'done') {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
        </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// 카테고리 별 렌더링
function filter(event) {
    if (event) {
        mode = event.target.id;
        underLine.style.left = event.currentTarget.offsetLeft + "px";
        underLine.style.width = event.currentTarget.offsetWidth + "px";
    }
    
    filterList = [];
    
    if (mode == 'all') {
        render();
    }
    else if (mode == 'ongoing') {
        for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].gameCategory == false) {
                filterList.push(gameList[i])
            }
        }
    }
    else if (mode == 'done') {
        for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].gameCategory == true) {
                filterList.push(gameList[i])
            }
        }
    }

    render();
}

// 랜덤 아이디 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}