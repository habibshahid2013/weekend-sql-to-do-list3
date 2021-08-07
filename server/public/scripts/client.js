$(document).ready(readyReady)

function readyReady(){

    addClickHandlers()
    getTasks();
   
}

function addClickHandlers() {
    $("#addBtn").on('click', addTask);
    $(document).on('click', ".deleteBtn", deleteTask);
    $(document).on('click', ".completeBtn", completeTask);
    // TODO - Add code for edit & delete buttons
};

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
//
function renderDom(res){
    $('#seeTasks').empty();

    for (task of res) {
    //It's important to note the the data ID is created
    //In the deleteTask function.
        if (task.iscompleted === false){
        $('#seeTasks').append(`
            <li data-id ="${task.id}"> ${task.task}
            <button class="completeBtn" >Complete</button>
            <button class="deleteBtn" >Delete</button></li>`)
        }
        else if (task.iscompleted === true){
            $('#seeTasks').append(`
            <li data-id ="${task.id}"> ${task.task}
            <button class="incompleteBtn" >Complete</button>
            <button class="deleteBtn" >Delete</button></li>`)
        }

    }
};

function deleteTask() {
    let taskId = $(this).closest('li').data('id')
    console.log('testing ID', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (res) {
        console.log('delete is working 🙀');
        getTasks()
    })
};



function completeTask() {
    let id = $(this).closest('li').data('id');
    let iscompleted = $(this).closest('li').data('iscompleted');

    if (iscompleted === false || iscompleted === null ) {
        iscompleted = true;
    } else if (iscompleted === true || iscompleted === null ) {
        iscompleted = false;
    }

    $.ajax({
        url: `/tasks/${id}`,
        type: 'PUT',
        data: { iscompleted: iscompleted }
    }).then(function (response) {
        console.log('response', response);
        getTasks();
    }).catch(function (error) {
        console.log('error in GET', error);
    });

}