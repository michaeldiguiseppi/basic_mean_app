app.service('studentDataService', ['crudService', function(crudService) {
  return {
    getAllStudents: function() {
      crudService.getAll('students').then(function(students) {
        return students;
      });
    }
  };
}]);

app.service('crudService', ['$http', function($http) {
  return {
    getAll: function(resource) {
      $http.get({
        url: '/'+resource,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    }
  };
}]);
