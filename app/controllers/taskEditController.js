app.controller('taskEditController', ['$scope', '$window', 'taskService', function($scope, $window, taskService) {
    var taskId = new URLSearchParams(window.location.search).get('id'); // Get the task ID from the URL

    // Fetch the task details using the taskService
    taskService.getTaskById(taskId)
    .then(function(response) {
        try {
            $scope.selectedTask = response.data;
        } catch (e) {
            alert('Unexpected response format');
        }
    })
    .catch(function(error) {
        var errorMessage = error.data && typeof error.data === 'object' ? error.data.error : 'Failed to load task details.';
        alert(errorMessage);
        $window.location.href = "../../index.html";
    });

    $scope.saveTask = function() {
        taskService.updateTask($scope.selectedTask)
            .then(function(response) {
                console.log('Task updated successfully');
                // Show success message
                alert('Task updated successfully');
                // Redirect back to the task list
                $window.location.href = "../../index.html";
            }, function(error) {
               // Show error message using alert
               alert(error.data.error || 'Failed to update task.');
            });
    };
}]);