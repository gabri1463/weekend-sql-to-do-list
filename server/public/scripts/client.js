$( document ).ready( renderDOM );

function renderDOM() {
    console.log( 'in renderDOM' );
    getTasks();
    // click listeners
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.completeTaskButton' , completeTask)
    $( '#tasksOut' ).on( 'click', '.deleteTaskButton' , deleteTask)
    $( '#tasksOut' ).on( 'click', '.editTimeButton' , editTime)

} // end renderDOM

function addTask() {
    console.log( 'in addTask' );
    // get user input
    let objectToSend = {
        task: $( '#taskIn' ).val(),
        completed: false,
        timecompleted: ''
    }
    // make ajax request
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ) {
        console.log( 'back from PUT with:', response);
        getTasks();
        clearInput();
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
                <td>
                ${array[i].timecompleted}
                <span data-id="${array[i].id}" class="editTimeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                    </svg>
                </span>
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
    swal({
        title: "Are you sure you want to delete this task",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then( willDelete => {
        if( willDelete ) {
            swal('The task has been deleted', {
                icon: "success",
            });
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
        } // end if deleted selected
        else {
            swal( 'The task will not be deleted');
        }
    });
} // end deleteTask

function clearInput() {
    $( '#taskIn' ).val( '' );
}

function editTime() {
    console.log( 'in editTime' );
    let regexTimeFormat = /\d{2}\:\d{2}\s{1}[PA][M]/;
    let myID = $( this ).data( 'id' );
    swal.fire({
        title: 'Edit time completed',
        text: 'Format: (hh:mm AM/PM)',
        input: 'text',
        showCancelButton: true
    }).then( function( results ) {
        if( regexTimeFormat.test( results.value ) ){
            $.ajax({
                method: 'PUT',
                url: `/editTime/${ myID }?newTime=${ results.value }`
            }).then( function( response ) {
                console.log( 'back from /tasks/editTime PUT with:', response);
                getTasks();
            }).catch( function( err ) {
                alert( 'error updating time' );
                console.log( err );
            })
        }
        // console.log( $(this.parent()));
    }).catch( function( err ) {
        alert( 'there was an erroring updating the time, use hh:mm AM/PM format' );
        console.log( err );
    })
}