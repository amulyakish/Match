angular.module('directory', ['ionic', 'directory.controllers', 'directory.services','ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('search', {
                url: '/search/:volId',
                templateUrl: 'templates/ngo-list.html',
                params : {'volId': null},
                controller: 'NGOListCtrl'
            })

            .state('post', {
                url: '/ngo-posts/:ngoId',
                templateUrl: 'templates/ngo-posts.html',
                controller: 'NGOPostsCtrl'
            })

            .state('newPost', {
                url: '/new-post/:ngoId',
                templateUrl: 'templates/new-post.html',
                controller: 'NewPostCtrl'
            })

            .state('pre-book', {
                url: '/pre-book',
                templateUrl: 'templates/volunteer-book-details.html',
                controller: 'EmployeePreBookCtrl'
            })

            .state('ngo-profile', {
                url: '/ngo-profile/:ngoId',
                templateUrl: 'templates/ngo-profile.html',
                controller: 'NGOProfileCtrl'
            })

            .state('desc', {
                url: '/desc/:offerId/:ngoId',
                templateUrl: 'templates/volunteer-book-details.html',
                controller: 'OppDescCtrl'
            })

            .state('post-desc', {
                url: '/post-desc/:ngoId/:offerId',
                templateUrl: 'templates/requests.html',
                controller: 'PostRequestsCtrl'
            })

            .state('bookNow', {
                url: '/bookNow/:ngoId/:offerId',
                templateUrl: 'templates/bookNow.html',
                controller: 'BookNowCtrl'
            })

            .state('ngoOffers', {
                url: '/ngoOffers/:ngoId',
                templateUrl: 'templates/ngo-offers.html',
                controller: 'NGOOffersCtrl'
            })

            .state('ngo', {
                url: '/ngo/:ngoId',
                templateUrl: 'templates/ngo-detail.html',
                controller: 'NGODetailCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignUpCtrl'
            })

        $urlRouterProvider.otherwise('/login');

    });