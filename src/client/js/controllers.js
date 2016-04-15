app.controller('addStudentController', ['$scope', 'studentDataService', function($scope, studentDataService) {
  $scope.student = {};
  $scope.addStudent = function() {
    studentDataService.addStudent(this.student);
    $scope.updateStudents();
    $scope.student = {};
  };
  $scope.updateStudents = function() {
    studentDataService.getAllStudents()
    .then(function(students) {
      $scope.students = students.data.data;
    });
  };
  $scope.deleteStudent = function(id) {
    studentDataService.deleteStudent(id)
    .then(function(student) {
      $scope.updateStudents();
    });
  };
  $scope.editStudent = function(id) {
    studentDataService.editStudent(id, this.student)
    .then(function(student) {
      $scope.updateStudents();
    });
  };
  $scope.updateStudents();
  $scope.edit = false;
}]);


app.controller('signupController', ['$scope', '$location', 'authService', function($scope,  $location, authService) {
  $scope.user = {};
  $scope.register = function() {
      authService.register($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
        })
        .catch(function(err) {
          // TODO - check status code and show appropriate message.
          console.log(err);
        });
  };
}]);

app.controller('loginController', ['$scope', '$location', 'authService', function($scope, $location, authService) {
  $scope.user = {};
  $scope.login = function() {
      authService.login($scope.user)
        .then(function(user) {
          authService.setUserInfo(user);
          $location.path('/');
        })
        .catch(function(err) {
          // TODO - check status code and show appropriate message.
          console.log(err);
        });
  };
}]);
