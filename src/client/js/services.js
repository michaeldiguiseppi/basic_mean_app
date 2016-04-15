app.service('studentDataService', ['crudService', function(crudService) {
  return {
    getAllStudents: function() {
      return crudService.getAll('students').then(function(students) {
        return students;
      });
    },
    addStudent: function(student) {
      crudService.addOne('students', student).then(function(student) {
        return student;
      });
    },
    deleteStudent: function(student_id) {
      return crudService.deleteOne('students', student_id).then(function(student) {
        return student;
      });
    },
    editStudent: function(student_id, student) {
      return crudService.editOne('students', student_id, student).then(function(student) {
        return student;
      });
    }
  };
}]);
app.service('crudService', ['$http', function($http) {
  return {
    getAll: function(resource) {
      return $http({
        method: 'GET',
        url: '/'+resource,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    addOne: function(resource, data) {
      return $http({
        method: 'POST',
        url: '/'+resource,
        data: data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    deleteOne: function(resource, data) {
      return $http({
        method: 'DELETE',
        url: '/'+resource + '/' + data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    },
    editOne: function(resource, id, data) {
      return $http({
        method: 'PUT',
        url: '/'+resource + '/' + id,
        data: data,
      }).then(function(resources) {
        return resources;
      }).catch(function(err) {
        return err;
      });
    }
  };
}]);

/**
1. login a User
2. log out
3. register
4. set user info into localstorage
5. get user info from localstorage

**/
app.service('authService', ['$http', '$window', function($http, $window) {
  var user = {};
  return {
    login: function(user) {
      return $http({
        method: 'POST',
        url: '/auth/login',
        data: user
      });
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
    },
    register: function(user) {
      return $http({
        method: 'POST',
        url: '/auth/register',
        data: user
      });
    },
    setUserInfo: function(userData) {
      $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
      $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
    },
    getUserInfo: function() {
      $window.localStorage.getItem('user');
    }
  };
}]);

app.service('authInterceptor', ['$window', '$q', function($window, $q){
  return {
    // always make sure to return anything you use here!
    request: function(config){
      // check for token in headers
      // config.headers['X-requested-with'] = XMLHttpRequest;
      var token = $window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = "Bearer " + token;
        // return $q.resolve(config);
      }
      return config;
    },
    responseError: function(err){
      // if header auth is not present throw an error
      return err;
    }
  };
}]);
