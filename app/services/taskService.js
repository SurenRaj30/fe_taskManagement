// app/services/taskService.js
// factory is a design pattern that returns an object, which will be used in ctrls and other components
// http: an object used to call the backend API
app.factory('taskService', ['$http', function($http) {
    var baseUrl = 'http://localhost:8080/api/v1/tasks';

    function handleError(response) {
        // Extract error message from response if available
        var errorMessage = response.data && response.data.detail ? response.data.detail : 'An unexpected error occurred.';
        // Return a rejected promise with the error message
        return Promise.reject({ message: errorMessage, status: response.status });
    }

    return {
        getTaskById: function(id) {
            return $http.get(baseUrl + '/getTask/' + id)
                .catch(handleError);
        },
        getAllTasks: function() {
            return $http.get(baseUrl + '/getAll');
        },
        createTask: function(task) {
            return $http.post(baseUrl + '/create', task);
        },
        updateTask: function(task) {
            return $http.put(baseUrl + '/update/' + task.id, task);
        },
        deleteTask: function(id) {
            return $http.delete(baseUrl + '/delete/' + id);
        }
    };
}]);