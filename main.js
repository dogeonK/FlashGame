let tabs = document.querySelectorAll('.task-tabs div');
let mode = 'all';
let filterList = [];
let underLine = document.getElementById('under-line')

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)});
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