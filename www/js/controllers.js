headerLogo = "<img src=\"img/logo-49x40.png\">";

api_host = "http://ibldv.com.br"; //"http://localhost:8000";

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('PostsCtrl', function($scope, $http) {
  $scope.pageTitle = headerLogo + ' <b>Notícias</b>';
  $http({
    method: 'GET',
    url: api_host+"/wp-json/wp/v2/posts"
  }).
  success(function(response){
    // console.log(response);
    $scope.posts = response;
  }).
  error(function(response){
    $scope.message = "Ops! Erro ao conectar com o servidor"
  });
})

.controller('PostCtrl', function($scope, $stateParams, $http, $cordovaSocialSharing) {
  $http({
    method: 'GET',
    url: api_host+"/wp-json/wp/v2/posts/"+$stateParams.postId
  }).
  success(function(response){
    // console.log(response);
    post = response;
    $scope.post = post;
    $http.get(post._links.author[0].href)
    .success(function(response){
      $scope.author = response
    });
  }).
  error(function(response){
    $scope.message = "Ops! Erro ao conectar com o servidor"
  });

  $scope.shareAnywhere = function(message, subject, link) {
    ionic.Platform.ready(function(){
      $cordovaSocialSharing.share(message, subject, null, link);
    });
  }
})

.controller('ChurchServicesCtrl', function($scope, $http) {
  $scope.day_of_week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  $scope.services = {
    0:{
      dayname: 'Domingo',
      services: []
    },
    6:{
      dayname: 'Sábado',
      services: []
    }
  };
  $scope.pageTitle = headerLogo + ' <b>Cultos</b>';
  $http({
    method: 'GET',
    url: "https://churchmetrics-api-client.herokuapp.com/services"
  }).
  success(function(response){
    // console.log(response);
    services = response;
    for(i=0; i < services.length;  i++){
      service = services[i];
      $scope.services[service.day_of_week].services.push({hour: service.time_of_day.substring(11,16), name: service.event.name});
    }
  }).
  error(function(response){
    $scope.message = "Ops! Erro ao conectar com o servidor"
  });
})

.controller('ContactsCtrl', function($scope) {
  $scope.pageTitle = headerLogo + ' <b>Contatos</b>';
})

.controller('DonationsCtrl', function($scope) {
  $scope.pageTitle = headerLogo + ' <b>Doações</b>';
})

