$(document).ready(readyReady)

function readyReady(){

    //Set up Add Button
    $("#addBtn").on('click', addTask);
    getTasks();
    $("deleteBtn").on('click', deleteTask)
    $("completeBtn").on('click', completeTask)
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
        getTasks();
    }).catch((err) => {
        console.log('error on client side', err)
    });
};

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then((res) => {
        console.log("this is the response for SQL", res);
        renderDom(res)
    }).catch((err) => {
        console.log('GET is not appending', err);      
})
};

function renderDom(res){
    $('#seeTasks').empty();
    for (task of res) {
        $('#seeTasks').append(`
         <li data-id ="data"> ${task.task} 
         <button class ="completeBtn" ></button>
         <button class ="deleteBtn" ></button></li>`)
    }
};

function deleteTask() {
    let taskID = $(this).closest('tr').data('id')
    console.log('testing ID', taskID);
    $.ajax({
        type: 'DELETE',
        url: `/task/${taskID}`
    }).then(function (res) {
        console.log('delete is working 🙀');
        getKoalas()

    })
}


function completeTask(){

}