//Classes
class Task
{
    constructor(task, status){
        this.task = task;
        this.status = false
    }
}

//Variables
let taskArray = [];
let frm = document.getElementById('frm-task');

//Actions
document.addEventListener('DOMContentLoaded', listingTasks);
document.getElementById('task').focus();

document.getElementById('btnSave').addEventListener('click', (e)=>{
    e.preventDefault();
    
    let task = document.getElementById('task').value;
    let status = false;
    let tasknew = new Task(task, status);
    addTask(tasknew);
});

//Functions

function editStatus(index)
{
    taskArray[index].status = !taskArray[index].status;
    SaveDB();
    listingTasks();
    
}

const deleteTask = (index) => {
    if(confirm("Desea eliminar?"))
    {
        taskArray.splice(index, 1);
        SaveDB();
        listingTasks();
    }
}

function addTask(tasknew)
{
    //console.log( JSON.stringify(tasknew) );
    if (document.getElementById('task').value === '') 
    {
        showMessage("Falta información", "danger");
        frm.reset();
    }
    else
    {
        taskArray.push(tasknew);
        frm.reset();
        showMessage("Información agregada satisfactoriamente", "success");
        SaveDB();
        listingTasks();
    }
    document.getElementById('task').focus();
}

const SaveDB = () => {
    localStorage.setItem("tasksDB", JSON.stringify(taskArray));
}

function showMessage(text, type){
    let message = `
    <div id="contMessage">
        <div class="alert alert-dismissible alert-${type} my-4 col-6">
            <p class="mb-0">
                ${text}
            </p>
        </div>
    </div>
    `;
    // divMessage = document.getElementById('Message');
    // divMessage.innerHTML(message);
    document.getElementById("Message").innerHTML = message; 
    setTimeout( (e) => {
        document.getElementById("contMessage").remove(); 
    }, 3000 );
}

function listingTasks()
{
    let listTasks = document.getElementById('listTasks');
    listTasks.innerHTML = '';

    taskArray = JSON.parse(localStorage.getItem('tasksDB'));
    
    if( typeof taskArray != "undefined" && taskArray != null && taskArray.length != null && taskArray.length > 0 ){

        taskArray.forEach((element, index) => {
            let iconStatus;
            (element.status === true) ? iconStatus = "on" : iconStatus = "off";
            listTasks.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        ${element.task} 
                    </div>
                    <div>
                        <a class="btn btn-success pull-right" onclick="editStatus(${index})">
                            <i class="fas fa-toggle-${iconStatus} text-white"></i> 
                        </a>
                        <a class="btn btn-danger pull-right" onclick="deleteTask(${index})">
                            <i class="fas fa-trash text-white"></i>
                        </a>
                    </div>
                </li>
            `;
        });
    }else{
        taskArray = [];
    }
}

