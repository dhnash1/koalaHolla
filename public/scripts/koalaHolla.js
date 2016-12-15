console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    var name = $('#nameIn').val();
    var age = $('#ageIn').val();
    var sex = $('#sexIn').val();
    var transfer = $('#readyForTransferIn').val();
    var notes = $('#notesIn').val();
    // using a test object
    var objectToSend = {
      name: name,
      age: age,
      sex: sex,
      readyForTransfer: transfer,
      notes: notes
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
    getKoalas();
  }); //end addButton on click
  $('#editButton').on('click',function(){
    editKoala();
  });
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#viewKoalas').html('');
      for (var i = 0; i < data.length; i++) {
        $('#viewKoalas').append(
          '<p>' + data[i].name + " " + data[i].age + " " + data[i].sex + " " + data[i].transfer + " " + data[i].notes + '</p>'

        );
      }
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each

}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
};

var editKoala = function (editKoala){
  $.ajax({
    url: '/editKoala',
    type: 'PUT',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#viewKoalas').html('');
        getKoalas();
    } // end success
  }); //end ajax

};
