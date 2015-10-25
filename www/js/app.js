// Listings App

(function () {

  angular.module('bookApp', ['ionic', 'ngCordova'])

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'js/views/tabs.html'
        })

        .state('tab.dash', {
          url: '/dash',
          views: {
            'tab-dash': {
              templateUrl: 'js/views/dash.html',
              controller: 'DashCtrl'
            }
          }
        })
        
      // First step - Capture photo of the book.
        .state('tab.add-image', {
          url: '/add-image',
          views: {
            'tab-dash': {
              templateUrl: 'js/views/image.html',
              controller: 'DashCtrl'
            }
          },
          params: {listingParam: null}
        })
        
      // second step - add book details.
        .state('tab.add-book-details', {
          url: '/add-book-details',
          views: {
            'tab-dash': {
              templateUrl: 'js/views/book-details.html',
              controller: 'DashCtrl'
            }
          },
          params: {listingParam: null}
        })
        
      // third step - add listing details
        .state('tab.add-listing-details', {
          url: '/add-listing-details',
          views: {
            'tab-dash': {
              templateUrl: 'js/views/listing-details.html',
              controller: 'DashCtrl'
            }
          },
          params: {listingParam: null}
        })
        
      // third step - add listing details
        .state('tab.view-new-listing', {
          url: '/view-new-listing',
          views: {
            'tab-dash': {
              templateUrl: 'js/views/view-new-listing.html',
              controller: 'ListingViewCtrl'
            }
          },
          params: {listingParam: null}
        })
        
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');
      // $ionicConfigProvider.platform.android.navBar.alignTitle("center");
      $ionicConfigProvider.tabs.position('bottom');

    });


})();