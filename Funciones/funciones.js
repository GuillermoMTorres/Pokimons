window.onload = function () {

  //Añade OPTIONs al SELECT por cada tipo que existe en la API.
  $.get('http://pokeapi.co/api/v2/type/', function( data ) {

    data.results.forEach(function (element){
      jQuery('<option/>', {
      value: element.url,
      text: element.name
      }).appendTo('#type-selector'); 

    });

  });


  //Genera 10 cartas del tipo indicado en el SELECT.
  var submitType = $('#searchType');
  submitType.on('click', function() {

    $.get( $('#type-selector').val() , function( data ) {

      for (var i = 0; i < 10; i++) {
        generaCarta(data.pokemon[i].pokemon.url);
      }

    });

  });

//Genera 1 carta, según el ID del valor del INPUT
var submit = $('#searchId')
submit.on('click', generaCarta);
// submit.on('click', function(){

//   var id = $('#inputId').val();
//   $.get('http://pokeapi.co/api/v2/pokemon/'+ $('#inputId').val() +'/', function( data ) {

//   //Indice para los distintos tipos
//   var i = 0;

//   //Div contenedor de la carta
//   var carta = jQuery('<div/>', {
//       class: 'tarjeta' + id,
//   })

//   //H2 que contiene el nombre del pokemon
//   var nombre = jQuery('<h2/>', {
//       class: 'nombre' +id,
//       text: data.name 
//   })

//   //String para el/los tipos
//   var cadena = ""

//   data.types.forEach( function (element){

//     cadena = cadena + element.type.name;

//     //Condicional para separar los dos tipos (si tiene)
//     if(i!==1 && data.types.length > 1){
//       cadena = cadena + "/";
//     }
//     i++;
//   });

//     //H3 que contiene el tipo/tipos del pokemon
//     var tipo = jQuery('<h3/>', {
//         class: "tipo",
//         text: cadena
//     })

//     //Petición necesaria para obtener la URL de la descripción
//     $.get('http://pokeapi.co/api/v1/pokemon/'+ id +'/', function( data ) {

//       var url_desc = data.descriptions[0].resource_uri

//       //Busca la descripción del pokemon
//       $.get('http://pokeapi.co/'+ url_desc, function( data ) {

//       //Anidado de la carta al div contenedor, siempre y cuando no exista.
//         if($('.tarjeta' + id).length < 1){

//           carta.appendTo('.ajaxContainer');
//           nombre.appendTo('.tarjeta' + id);
//           tipo.appendTo('.tarjeta' + id);       
//               jQuery('<p/>', {
//               class: 'description' + id,
//               text: data.description
//           }).appendTo('.tarjeta' + id);
//         }
//       });

//     });
//   });
// });

function generaIcono(){

  var self = this
  var count = this.className.substring(this.className.indexOf(" ")+1)
  count++;
  var name = this.parentNode.childNodes[1].innerHTML
    console.log(name);    
  $.get('http://pokeapi.co/api/v2/pokemon/'+ name +'/', function( data ) {
      ttt = data
      array = [data.sprites.front_default,
              data.sprites.back_shiny,
              data.sprites.front_default,
              data.sprites.front_shiny,]
    
      if(count===4){
      self.classList.remove(3)
      count=0;
      }else{
      self.classList.remove(count-1)
      }
      self.classList.add(count);
      self.src=array[count];
  });
}
//Parametro 1: Url del ID del pokemon que devuelve al encontrarlo por tipo
//Funcion: Genera 1 carta con el nombre, el/los tipos y su descripción
//         dándole la url como parámetro
function generaCarta(url){

    console.log("xd " + url);

  var test = "" + url
  if (url == "[object Object]"){
    url = 'http://pokeapi.co/api/v2/pokemon/'+ $('#inputId').val() +'/';
  }
  //Genera la ID recortando la URL del parámetro
  var id = url.substring(34, url.indexOf("/" , 34 ));

  $.get(url, function( data ) {

    qwerty = data;
    var i = 0;

    var carta = jQuery('<div/>', {
        class: 'tarjeta' + id + " " + data.types[0].type.name
    })

    var foto = jQuery('<img/>', {
        class: 'pokemonImg 0' ,
        src: data.sprites.front_default
  })
    foto.on('click', generaIcono);
    var nombre = jQuery('<h2/>', {
        class: 'nombre' +id,
        text: data.name 
  })

  var cadena = ""
  data.types.forEach( function (element){

    cadena = cadena + element.type.name;

    if(i!==1 && data.types.length > 1){
      cadena = cadena + "/";
    }


    i++;
  });

  var tipo = jQuery('<h3/>', {
      class: "tipo",
      text: cadena
  })

  $.get('http://pokeapi.co/api/v1/pokemon/'+ id +'/', function( data ) {

    test = data.descriptions[0].resource_uri

    $.get('http://pokeapi.co/'+ test, function( data ) {

      carta.appendTo('.ajaxContainer');
      foto.appendTo('.tarjeta' + id);
      nombre.appendTo('.tarjeta' + id);
      tipo.appendTo('.tarjeta' + id);       
          jQuery('<p/>', {
          class: 'description' + id,
          text: data.description
      }).appendTo('.tarjeta' + id);

    });

  });
});

}


};

//function()