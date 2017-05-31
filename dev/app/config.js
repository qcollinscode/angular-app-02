// App Config

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    // Routes
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
        })
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: 'projectsController'
        })
        .when('/skills', {
            templateUrl: 'views/skills.html',
            controller: 'skillsController'
        })
        .when('/services', {
            templateUrl: 'views/services.html',
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
        })
        .otherwise({
            redirectTo: '/'
        })
}]);