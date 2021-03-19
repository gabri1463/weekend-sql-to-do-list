$( document ).ready( renderDOM );

function renderDOM() {
    console.log( 'in renderDOM' );
    getTasks();
    // click listeners
    $( '#addTaskButton' ).on( 'click', addTask );
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
        el.append(
            `
            <tr>
                <td>${array[i].task}</td>
                <td>${array[i].completed}</td>
            </tr>
            `
        );
    }
} // end displayTasks