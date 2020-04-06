/*****  Local Storage */

// var dateFormat = require('dateformat');

// import { addDays } from 'date-fns/add_days';
let format = require('date-fns/format');
let addSampDate = require('date-fns/add_days');

class LocalStorage {
    static addProject(project) {
        const projs = LocalStorage.getProjects();
        projs.push(project);
        localStorage.setItem('projs', JSON.stringify(projs));
    }
    static getProjects() {
        let projs;
        if (localStorage.getItem('projs') === null) {
            projs = [];
        } else {
            projs = JSON.parse(localStorage.getItem('projs'));
        }
        //just to clear the list 

        return projs;
    }
    static addTodo(project) {
        const projs = LocalStorage.getProjects();
        projs.forEach(function (proj) {
            if (proj.ptitle === project.ptitle) {
                proj.toDoItems = project.toDoItems;
            }
        });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static delEdTodo(project, dtitle) {
        const projs = LocalStorage.getProjects();

        project.toDoItems.forEach(function (todo_item, index) {
            if (todo_item.title === dtitle) {
                // console.log(todo_item.title + ": " + dtitle);
                project.toDoItems.splice(index, 1);
            }
        });
    }
    static delProj(dtitle) {
        const projs = LocalStorage.getProjects();

        projs.forEach(function (proj, index) {
            if (proj.ptitle === dtitle) {
                console.log(proj.ptitle + ":del " + dtitle);
                projs.splice(index, 1);
            }
        });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static deleteTodo(project, dtitle) {
        const projs = LocalStorage.getProjects();

        projs.forEach(function (proj) {
            // console.log(dtitle + " " + project.ptitle);
            // console.log(proj);


            if (proj.ptitle === project.ptitle)
                proj.toDoItems.forEach(function (todo_item, index) {
                    if (todo_item.title === dtitle) {
                        // console.log(todo_item.title + ": " + dtitle);
                        proj.toDoItems.splice(index, 1);
                    }
                });

        });
        localStorage.setItem('projs', JSON.stringify(projs));
    }

    static initializeApp() {
        projects = [];
        const prs = LocalStorage.getProjects();
        prs.forEach(function (pr) {
            // console.log(pr);
            projects.push(pr);
        });
        renderProjectsList();
        addEventListenerToProjectItem();
        renderProjectName(prs[0].ptitle);

        renderToDoList(prs[0], prs[0].toDoItems);

        // prs[0].classList.add("selected");
    }
    static renderSample() {

        const projs = LocalStorage.getProjects();
        if (projs.length === 0) {
            let defaultProject = project("Sample");
            projects.push(defaultProject);
            // let date1=addSampDate(Date(Date.now()),{days: 7});
// console.log(date1.toString());
            // let date2=addSampDate(Date.now(),{days: 30});
// let splitDate = date1.split("-");
//     let convertedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
//     date1 = format(convertedDate, "DD-MMM-YYYY");
            defaultProject.toDoItems.push(toDoItem("Recharge", "Recharge mobile online", "Urgent", "05-May-2020"));
            defaultProject.toDoItems.push(toDoItem("Submit project", "Submit Js project in time", "Ordinary", "28-Apr-2020"));

            LocalStorage.addProject(defaultProject);
            renderToDoList(defaultProject, defaultProject.toDoItems);
        }

        LocalStorage.initializeApp();
        // projects = [];
        // const prs = LocalStorage.getProjects();
        // prs.forEach(function (pr) {
        //     // console.log(pr);
        //     projects.push(pr);
        // });
        // renderProjectsList();
        // addEventListenerToProjectItem();
        // renderProjectName(prs[0].ptitle);
        // renderToDoList(prs[0], prs[0].toDoItems);
    }

}





const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");

let projects = LocalStorage.getProjects() || [];
// console.log(projects);
const project = (ptitle) => {
    let toDoItems = [];
    return { ptitle, toDoItems };
}


const toDoItem = (title, description, priority, dueDate) => {
    return { title, description, priority, dueDate };
}


function renderProjectsList() {
    const projectListContainer = document.querySelector(".project-list-container");
    // const projects = LocalStorage.getProjects();
    const projectList = getProjectsList(projects);
    projectListContainer.appendChild(projectList);
}



function getProjectsList(projects) {
    const projectList = document.querySelector("#project-list");
    if (projectList.children.length > 0) {
        while (projectList.children.length !== 0) {
            projectList.removeChild(projectList.lastChild);
        }
    }

    for (let i = 0; i < projects.length; i++) {
        const projectItem = document.createElement("li");
        projectItem.setAttribute("id", `${i + 1}`);
        projectItem.innerHTML = projects[i].ptitle;
        projectItem.style.fontSize = "2.2rem";
        projectItem.style.padding = "20px";
        projectItem.style.marginBottom = "10px";
        projectList.appendChild(projectItem);
        if (projects[i].ptitle === 'Sample')
            projectItem.setAttribute('class', 'selected');
    }

    return projectList;
}


// function renderToDoList1(project, toDoItems) {
//     const toDoList = document.querySelector(".item-list");

//     if (toDoList.children.length > 0) {
//         while (toDoList.children.length !== 0) {
//             toDoList.removeChild(toDoList.lastChild);
//         }
//     }
// //const row = document.createElement('tr');

//         // row.innerHTML = `
//         // <td>${book.title}</td>
//         // <td>${book.author}</td>
//         // <td>${book.isbn}</td>
//         // <td>${book.pages}</td>
//         // <td>${book.read}</td>
//         // <td><a href="#" class="delete">X</a></td>
        
//         // `;
//         // list.appendChild(row);

//     if (toDoItems.length > 0) {
        
//         for (let i = 0; i < toDoItems.length; i++) {
//             itemList.style.width = "800px";
// const row = document.createElement('tr');
//             row.insertAdjacentHTML(
//                 "beforeend",
//                 `<div class="item my-3">
                
//       <td>${toDoItems[i].title}</td> 
//       <td>${toDoItems[i].description}</td>
//      <td>${toDoItems[i].priority}</td> 
      
//      <td>${toDoItems[i].dueDate}</td>
    
      
//       <div class="item-icons">
//        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
//        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
//        <a href="#" class="delete-item item-icon"  data-toggle="tooltip" title="Delete item"><i class="far fa-times-circle" ></i></a>
//       </div>
//      </div>`
//             );
// itemList.appendChild(row);
//             handleItem(toDoItems[i], project);
//         }
//     }
// }

function renderToDoList(project, toDoItems) {
    const toDoList = document.querySelector(".item-list");

    if (toDoList.children.length > 0) {
        while (toDoList.children.length !== 0) {
            toDoList.removeChild(toDoList.lastChild);
        }
    }
    if (toDoItems.length > 0) {
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        for (let i = 0; i < toDoItems.length; i++) {
// let c = ();
// let d= c.toLocaleFormat('%d-%b-%Y');
// let d=(toDoItems[i].dueDate).toLocaleDateString("en-US", options);
// let d = toDoItems[i].dueDate;
// let dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) ;
// let [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
            itemList.insertAdjacentHTML(
                "beforeend",
                `<div class="item my-3">
                
      <h5 class="item-name text-capitalize" >${toDoItems[i].title}</h5> 
      <h5 class="item-desc text-capitalize">${toDoItems[i].description}</h5>
     <h5 class="item-prio text-capitalize">${toDoItems[i].priority}</h5> 
      
      <h5 class="item-ddate text-capitalize">${toDoItems[i].dueDate}</h5>
    
      
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>
     </div>`
            );

            handleItem(toDoItems[i], project);
        }
    }
}


/********************* Event Listeners **************/

const deleteProject = document.getElementById("proj-del-btn");
deleteProject.addEventListener("click", (e) => {
let ans=confirm("Delete?");
                if (ans){
    let selectedProjectElement = document.querySelector(".selected");
    if (selectedProjectElement) {
        let project = projects[selectedProjectElement.id - 1];
        console.log(project);
        console.log("in ev lsn" + project.ptitle);
        LocalStorage.delProj(project.ptitle);

        const projectList = document.querySelector("#project-list");
        projectList.removeChild(projectList.childNodes[selectedProjectElement.id - 1]);
        projects = [];
        const prs = LocalStorage.getProjects();
        prs.forEach(function (pr) {
            // console.log(pr);
            projects.push(pr);
        });
        showFeedback("Project deleted", "success");
        // renderProjectsList();
        // addEventListenerToProjectItem();
        LocalStorage.initializeApp();
        e.preventDefault();
    }

                }
});

// function delProj() {
//     console.log("delete?");
// }

const addNewProjectBtn = document.querySelector("#new-project-btn");

addNewProjectBtn.addEventListener("click", () => {
    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("hidden");
    formContainer.classList.add("show");
});

const newProjectForm = document.querySelector("#new-project-form");

newProjectForm.addEventListener("submit", (e) => {
    const projectName = document.querySelector("#project-name").value;
    defaultProject = project(projectName);
    projects.push(defaultProject);

    LocalStorage.addProject(defaultProject);

    renderProjectsList();
    addEventListenerToProjectItem();

    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
    e.preventDefault();
});


function addEventListenerToProjectItem() {
    const projectList = document.querySelectorAll("#project-list > li");

    for (let i = 0; i < projectList.length; i++) {
        projectList[i].addEventListener("click", (e) => {
            renderProjectName(e.target.innerText);

            for (let i = 0; i < projectList.length; i++) {
                if (projectList[i].classList.contains("selected")) {
                    projectList[i].classList.remove("selected");
                }
            }

            e.target.classList.add("selected");

            let project = projects[e.target.id - 1];

            renderToDoList(project, project.toDoItems);
        });
    }
}


const addNewTodoBtn = document.querySelector("#new-todo-btn");

addNewTodoBtn.addEventListener("click", () => {
    const formTodoContainer = document.querySelector(".new-todo-form-container");
    formTodoContainer.classList.remove("hidden");
    formTodoContainer.classList.add("show");
newTodoForm.updToDo.value="Add To Do";
});

const newTodoForm = document.querySelector("#new-todo-form");

newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoTitle = document.querySelector("#todo-title").value;
    const todoDescription = document.querySelector("#todo-description").value;
    // const todoDueDate = document.querySelector("#todo-due-date").value;

    const oldTodoDueDate = document.querySelector("#todo-due-date").value;
    let splitDate = oldTodoDueDate.split("-");
    let convertedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    const todoDueDate = format(convertedDate, "DD-MMM-YYYY");



console.log(Date(Date.now()));


    const em = document.getElementById("prio-select");
    const todoPriority = em.options[em.selectedIndex].text;

    let selectedProjectElement = document.querySelector(".selected");
    // console.log(selectedProjectElement)

    if (selectedProjectElement) {
        let project = projects[selectedProjectElement.id - 1];
        // console.log(project)
        project.toDoItems.push(toDoItem(todoTitle, todoDescription, todoPriority, todoDueDate));
        // console.log(project.toDoItems);
        LocalStorage.addTodo(project);
        renderToDoList(project, project.toDoItems);
    }

    const formContainer = document.querySelector(".new-todo-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
});


/******** Helper methods *******/

function handleItem(todoItem, project) {
    const items = itemList.querySelectorAll(".item");
    items.forEach(function (item) {
        if (item.querySelector(".item-name").textContent === todoItem.title) {
            // complete event listener
            item
                .querySelector(".complete-item")
                .addEventListener("click", function () {
                    item.querySelector(".item-name").classList.toggle("completed");
                    this.classList.toggle("visibility");
                });
            // edit event listener
            item.querySelector(".edit-item").addEventListener("click", () => {
                // console.log(project);
                LocalStorage.delEdTodo(project, todoItem.title);
                // console.log(project, todoItem.title);
                LocalStorage.deleteTodo(project, todoItem.title);
                itemList.removeChild(item);
                const formTodoContainer = document.querySelector(".new-todo-form-container");
                formTodoContainer.classList.remove("hidden");
                formTodoContainer.classList.add("show");
                newTodoForm.updToDo.value="Update";
                document.querySelector("#todo-title").value = todoItem.title;
                document.querySelector("#todo-description").value = todoItem.description;
                document.querySelector("#prio-select").value = todoItem.priority;
                document.querySelector("#todo-due-date").value = todoItem.dueDate;
                // showFeedback("item modified", "success");

            });
            // delete event listener
            item.querySelector(".delete-item").addEventListener("click", function () {
                let ans=confirm("Delete?");
                if (ans){
                itemList.removeChild(item);
                LocalStorage.delEdTodo(project, todoItem.title);
                LocalStorage.deleteTodo(project, todoItem.title);
                showFeedback("item deleted", "success");
                }

            });
        }
    });
}

function showFeedback(text, action) {
    feedback.classList.add("showItem", `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(function () {
        feedback.classList.remove("showItem", `alert-${action}`);
    }, 3000);
}



function renderProjectName(name) {
    const projectName = document.querySelector("#project-name-heading");
    projectName.innerHTML = name;
}

window.addEventListener('load', LocalStorage.renderSample);
window.console.log(LocalStorage.getProjects())
window.onerror = function (msg, url, lineNo, columnNo, error) {
    // ... handle error ...
    this.console.log(msg);
    return false;
}

const newProjectCancelBtn = document.querySelector("#project-cancel-btn");

newProjectCancelBtn.addEventListener("click", () => {
    const formContainer = document.querySelector(".new-project-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
});

const newTodoCancelBtn = document.querySelector("#todo-cancel-btn");

newTodoCancelBtn.addEventListener("click", () => {
    const formContainer = document.querySelector(".new-todo-form-container");
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
});