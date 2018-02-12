ymaps.ready(init);
  var myMap,
    myPlacemark1;
  function init(){
    myMap = new ymaps.Map ("map", {
      center: [34.86591303, -111.76364148],
      zoom: 15
    });
  myPlacemark1 = new ymaps.Placemark([34.86591303, -111.763641484], {
    balloonContentHeader: 'Аризона',
    balloonContentBody: 'г. Седона',
    balloonContentFooter: 'Приезжайте',
    hintContent: 'Здесь самые лучшие места'});
  myMap.geoObjects.add(myPlacemark1);
  }
