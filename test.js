

var coursesApi = 'http://localhost:3000/course'


function start() {
    // getCourses(function(courses) {
    //     renderCourses(courses)
    // })
    getCourses(renderCourses)
    
    handleCreateForm()
}

start();



// FUNCTIONS;
function getCourses(callback) {
    fetch(coursesApi) 
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback)
}

function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesApi +  '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-'+id);
            if(courseItem) {
                courseItem.remove();
            }
        }) 
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${course.id})">Xoá</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#Create')

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, function() {
            getCourses(renderCourses)
        })
        
    }
    
}