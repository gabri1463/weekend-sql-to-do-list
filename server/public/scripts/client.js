$( document ).ready( renderDOM );

function renderDOM() {
    console.log( 'in renderDOM' );
    getTasks();
    // click listeners
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.completeTaskButton' , completeTask)
    $( '#tasksOut' ).on( 'click', '.deleteTaskButton' , deleteTask)
} // end renderDOM

function addTask() {
    console.log( 'in addTask' );
    // get user input
    let objectToSend = {
        task: $( '#taskIn' ).val(),
        completed: false
    }
    // make ajax request
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ) {
        console.log( 'back from PUT with:', response);
        getTasks();
    }).catch( function( err ) {
        alert( 'error adding the task' );
        console.log( err );
    })
    // run getTasks
} // end addTask

function getTasks() {
    console.log( 'in getTasks' );
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( function( response ) {
        console.log( 'back from GET with:', response );
        displayTasks( response );
    }).catch( function( err ) {
        alert( 'erroring in getting tasks' );
        console.log( err );
    })
}

function displayTasks( array ) {
    console.log( 'in displayTasks' );
    let el = $( '#tasksOut' );
    el.empty();
    for( let i = 0; i < array.length; i++) {
        let completed = `<button class="completeTaskButton" data-id="${array[i].id}">Complete</button>`
        // if array[i].completed is true, do not append Complete button
        if( array[i].completed ) {
            completed = '';
        }
        el.append(
            `
            <tr>
                <td>${array[i].task}</td>
                <td>${array[i].completed}</td>
                <td>${completed}</td>
                <td><button class="deleteTaskButton" data-id="${array[i].id}">Delete</button></td>
            </tr>
            `
        );
    }
} // end displayTasks

function completeTask() {
    console.log( 'in completeTask' );
    let myID = $( this ).data( 'id' );
    // ajax put call
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + myID
    }).then( function( response ) {
        console.log( 'back from PUT with:', response);
        getTasks();
    }).catch( function( err ) {
        alert( 'error in updating task' );
        console.log( err );
    })
} // end completeTask

function deleteTask() {
    console.log( 'in deleteTask ');
    // make ajax delete call to server
    let myID = $( this ).data( 'id' );
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + myID
    }).then( function( response ) {
        console.log( 'back from DELETE with:', response);
        getTasks();
    }).catch( function( err ) {
        alert( 'error in deleting task' );
        console.log( err );
    });
} // end deleteTask