let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
let filterList = [];
let underLine = document.getElementById('under-line')

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function render() {
    let resultHTML = ''
    let list = [];

    if (mode == 'all') {
        list = taskList;
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
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
    }
    else if (mode == 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
    }

    render();
}