document.getElementById("Submit").style.display = "block";
document.getElementById("Update").style.display = "none";

function validateForm(){

    var currentDate = new Date().toISOString().split('T')[0];

    var task_name = document.getElementById("task_name").value;
    var assigned_from = document.getElementById("assigned_from").value;
    var assigned_to = document.getElementById("assigned_to").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;

    if(task_name == ""){
        alert("Task Name is required")
        return false;
    }
    else if(assigned_from == ""){
        alert("Assigned From is required")
        return false;
    }
    else if(assigned_to == ""){
        alert("Assigned to is required")
        return false;
    }
    else if(description == ""){
        alert("Description is required")
        return false;
    }
    else if(date ==""){
        alert("Date is required")
        return false;
    }
    else if(date<currentDate){
        alert('Please enter a date equal to or after the current date.');
    }
    else{
        return true;
    }
}


function showData(){
var infoList;
if(localStorage.getItem("infoList") == null){
    infoList = [];
}
else{
    infoList = JSON.parse(localStorage.getItem("infoList"))
}

var html = "";

infoList.forEach(function (element,index) {
    html += "<tr>";
    html += "<td>" + element.task_name + "</td>";
    html += "<td>" + element.assigned_from + "</td>";
    html += "<td>" + element.assigned_to + "</td>";
    html += "<td>" + element.description + "</td>";
    html += "<td>" + element.date + "</td>";
    html += '<td> <button onclick="deleteData(' + index + ')"> Delete </button> <button onclick = "updateData(' + index + ')">Edit</button></td>';
    html += "</tr>"
});

document.querySelector('#crudTable tbody').innerHTML = html;
}

document.onload = showData();

function AddData(){

var validate = validateForm()

if(validate == true){
    var task_name = document.getElementById("task_name").value;
    var assigned_from = document.getElementById("assigned_from").value;
    var assigned_to = document.getElementById("assigned_to").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;

    var infoList;
    if(localStorage.getItem('infoList') == null){
        infoList = [];
    }
    else{
        infoList = JSON.parse(localStorage.getItem('infoList'))
    }
    
    infoList.push({
        task_name : task_name,
        assigned_from : assigned_from,
        assigned_to : assigned_to,
        description : description,
        date:date
    });

    localStorage.setItem('infoList',JSON.stringify(infoList));
    showData();

    document.getElementById("task_name").value = "";
    document.getElementById("assigned_from").value = "";
    document.getElementById("assigned_to").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
}
}

function deleteData(index){
    var infoList;
    if(localStorage.getItem("infoList") === null) {
        infoList =[];
    }
    else{
        infoList = JSON.parse(localStorage.getItem("infoList"));
    }
    infoList.splice(index,1);
    localStorage.setItem("infoList",JSON.stringify(infoList));
    showData()
}

function updateData(index){

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var infoList;
    if(localStorage.getItem("infoList") == null){
        infoList = [];
    }
    else{
        infoList = JSON.parse(localStorage.getItem("infoList"));
    }

    document.getElementById("task_name").value = infoList[index].task_name;
    document.getElementById("assigned_from").value = infoList[index].assigned_from;
    document.getElementById("assigned_to").value = infoList[index].assigned_to;
    document.getElementById("description").value = infoList[index].description;
    document.getElementById("date").value = infoList[index].date;

    
    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            infoList[index].task_name = document.getElementById("task_name").value;
            infoList[index].assigned_from = document.getElementById("assigned_from").value;
            infoList[index].assigned_to = document.getElementById("assigned_to").value;
            infoList[index].description = document.getElementById("description").value;
            infoList[index].date = document.getElementById("date").value;

            localStorage.setItem("infoList",JSON.stringify(infoList));

            showData();

            document.getElementById("task_name").value = "";
            document.getElementById("assigned_from").value = "";
            document.getElementById("assigned_to").value = "";
            document.getElementById("description").value = "";
            document.getElementById("date").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}