$(document).ready(readyReady)

function readyReady(){

    addClickHandlers() //Added click handler to pass through the on ready
    getTasks();
   
}

function addClickHandlers() {
    $("#addBtn").on('click', addTask);
    $(document).on('click', ".deleteBtn", deleteTask);
    $(document).on('click', ".completeBtn", completeTask);
    // TODO - Add code for edit & delete buttons
};

function addTask() {
    //Created an object to pass the input variables for ajax
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
        $('#taskInput').val("");
    }).catch((err) => {
        console.log('error on client side', err)
    });
};
//This function gets all the task and pushes them eventually through the rending function
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
            <li class="list-group-item" data-id="${task.id}" data-iscompleted="${task.iscompleted}"> ${task.task}
            <button class="deleteBtn" >Delete</button>
            <button  class="completeBtn" >Complete</button></li>`)
        }
        // Here we create If statements to determining the button appended to the dom.
        //also the button will have differnt classes to determine thee CSS of the class
        else if (task.iscompleted === true){
            $('#seeTasks').append(`
            <li class="list-group-item" data-id="${task.id}" data-iscompleted="${task.iscompleted}"> ${task.task}
            <button  class="deleteBtn" >Delete</button>
            <button class="incompleteBtn" >Complete</button></li>`)
        }

    }
};

function deleteTask() {
    //TaskID variable 
    let taskId = $(this).closest('li').data('id')
    console.log('testing ID', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (res) {
        console.log('delete is working 🙀');
        //You see here that the get task function goes through here to pass the tasks through again. 
        getTasks()
    })
};



function completeTask() {
    let id = $(this).closest('li').data('id');
    let iscompleted = $(this).closest('li').data('iscompleted');
    // Here the iscompleted variable is being changed regardless of what it currently is. 
    //That response then goes through the PUT ajax into the data:
    if (iscompleted === false || iscompleted === null ) {
        iscompleted = true;
    } else if (iscompleted === true) {
        iscompleted = false;
    }

    $.ajax({
        //The URL using /${ID} because of the variable created with the THIS targeting what's rendering on the DOM
        url: `/tasks/${id}`,
        type: 'PUT',
        data: { iscompleted: iscompleted }
    }).then(function (response) {
        console.log('response', response);
        //Again you see how the geTask function is being reused through the various functions 
        getTasks();
    }).catch(function (error) {
        console.log('error in GET', error);
    });

}

