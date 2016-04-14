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
