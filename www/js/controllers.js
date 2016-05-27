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

.controller('NewsCtrl', function($scope, $http) {
  $scope.pageTitle = headerLogo;
  $http({
    method: 'GET',
    url: api_host+"/wp-json/wp/v2/posts"
  }).
  success(function(response){
    // console.log(response);
    $scope.news = response;
  }).
  error(function(response){
    console.log("deu pau", response);
  });
})

.controller('ChurchServicesCtrl', function($scope) {
  $scope.pageTitle = headerLogo;
  $scope.services = {
    sunday:{
      dayname: 'Domingo',
      services:
      [
        {hour: '07:00', name: 'CULTO DA ALVORADA'},
        {hour: '09:00', name: 'ESCOLA BÍBLICA'},
        {hour: '10:00', name: 'CULTO DA FAMÍLIA'},
        {hour: '10:00', name: 'EBD INFANTIL'},
        {hour: '17:00', name: 'CULTO DA BENÇÃO'},
        {hour: '19:00', name: 'CULTO DE CELEBRAÇÃO'}
      ]},
    saturday:{
      dayname: 'Sábado',
      services:
      [
        {hour: '15:00', name: 'DESPERTA DÉBORA'},
        {hour: '17:00', name: 'CULTO DE ADOLESCENTES'},
        {hour: '17:00', name: 'ENSAIO DO CORAL'},
        {hour: '19:30', name: 'SABADÃO JOVEM'}
      ]}
  };
})

.controller('ContactsCtrl', function($scope) {
  $scope.pageTitle = headerLogo;
})

.controller('DonationsCtrl', function($scope) {
  $scope.pageTitle = headerLogo;
})

