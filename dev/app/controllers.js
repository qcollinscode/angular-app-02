app.controller('projectsController', ['$scope', '$http', function($scope, $http) {
    $scope.projects = [];

     $http.get('data/projects.json')
        .then(function(results) {
            $scope.projects.push(results.data[0])
        //    results.data.forEach(function(projectsObj) {
        //        $scope.projects.push(projectsObj);
        //    });
        })
}]);

app.controller('skillsController', ['$scope', '$http', function($scope, $http) {
    $scope.skills = [];

    $http.get('data/skills.json')
        .then(function(results) {
            results.data.forEach(function(skillObj) {
                $scope.skills.push(skillObj)
            });
        })

}])