// app/controllers/taskAddController.js
app.controller('taskAddController', ['$scope', '$window', 'taskService', function($scope, $window, taskService) {
    $scope.task = {};

    // Submit new task
    $scope.submitTask = function() {
        taskService.createTask($scope.task)
            .then(function(response) {
                // Show success message
                alert('Task created successfully');
                $window.location.href = "../../index.html"; // Redirect back to the task list
        }, function(error) {
            alert('Error adding task');
            console.error('Error adding task:', error);
        });
    };
}]);