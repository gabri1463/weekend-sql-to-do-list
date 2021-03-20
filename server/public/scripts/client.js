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
        let completed = `<input style="width:30px;height:30px" class="form-check-input completeTaskButton" type="checkbox" data-id="${array[i].id}">`
        // if array[i].completed is true, do not append Complete button
        if( array[i].completed ) {
            completed = `<input style="width:30px;height:30px" class="form-check-input completeTaskButton" type="checkbox" data-id="${array[i].id}" checked disabled>`;
        }
        el.append(
            `
            <tr>
                <td>${array[i].task}</td>
                <td>${completed}</td>
                <td>
                    <button class="btn btn-danger deleteTaskButton" data-id="${array[i].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </button>
                </td>
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