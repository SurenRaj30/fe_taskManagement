// app/controllers/taskController.js
// registers this controller with the app module
// scope (special AngularJS object): binds data between controller and views
// window: helps to interact with browser's window
// location: helps to in managing URL in browser's address bar, helps to get query
app.controller('taskController', ['$scope', '$window', '$location', 'taskService', function($scope, $window, $location, taskService) {
    $scope.tasks = [];
    $scope.errorMessage = null;

    // Function to fetch tasks
    $scope.loadTasks = function() {
        taskService.getAllTasks()
            .then(function(response) {
                $scope.tasks = response.data;
            })
            .catch(function(error) {
                $scope.errorMessage = error.message || 'Failed to load tasks.';
            });
    };

     // Load tasks initially
     $scope.loadTasks();

    // Check for error messages in query parameters
    var params = $location.search();
    if (params.error) {
        $scope.errorMessage = decodeURIComponent(params.error);
        alert($scope.errorMessage);
    }

    // Clear the error message
    $scope.clearErrorMessage = function() {
        $scope.errorMessage = null;
    };
    
    // Toggle the dropdown menu
    $scope.toggleDropdown = function(event, task) {
        event.stopPropagation(); // Prevent event from bubbling up
        $scope.tasks.forEach(function(t) {
            if (t !== task) {
                t.isDropdownVisible = false;
            }
        });
        task.isDropdownVisible = !task.isDropdownVisible;
    };

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function() {
        $scope.$apply(function() {
            $scope.tasks.forEach(function(task) {
                task.isDropdownVisible = false;
            });
        });
    });

    // Delete task
    $scope.deleteTask = function(id) {
        taskService.deleteTask(id)
            .then(function(response) {
             // Show success message
             alert('Task deleted successfully');
            $scope.tasks = $scope.tasks.filter(task => task.id !== id);
        }, function(error) {
            alert('Error deleting task');
            console.error('Error deleting task:', error);
        });
    };

    // Update status
    $scope.updateStatus = function(task, newStatus) {
        task.status = newStatus;
        taskService.updateTask(task)
            .then(function(response) {
                //
            })
            .catch(function(error) {
                // Handle error
                $scope.errorMessage = error.message || 'Error updating status.';
                alert($scope.errorMessage); // Show error message
            });
    };

    // Redirect to add task page
    $scope.redirectToAddTask = function() {
        $window.location.href = "app/views/addTask.html";
    };

    // Redirect to the edit page
    $scope.redirectToUpdateTask = function(task) {
        console.log("edit task activated")
        // Redirect to edit page with the task ID
        $location.path('/edit/' + task.id);
    };

}]);