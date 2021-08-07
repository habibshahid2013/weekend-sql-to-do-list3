$(document).ready(readyReady)

function readyReady(){

    //Set up Add Button
    $("#addBtn").on('click', addTask);
}

function addTask() {
    let newTask = {
        task: $("#taskInput").val(),
        iscompleted: false
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then((res) => {
    
    }).catch((err) => {
        console.log('error on client side', err)
    });
};