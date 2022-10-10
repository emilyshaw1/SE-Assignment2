
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //get all users' IDs & display it

        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            //assigning this to where the users are displayed
            var tbodyEl = $('#namebody');

            tbodyEl.html('');

            //connecting the info to where they are supposed to be
            response.tweetinfo.forEach(function(tweetinfo) {
              tbodyEl.append('\
              <tr>\
                  <td class="id">' + tweetinfo.user.id + '</td>\
                  <td><input type="text" class="name" value="' + tweetinfo.user.screen_name + '"></td>\
                  <td class = "name">' + tweetinfo.user.name + '</td>\
              </tr>\
          ');
            });

            

          }
        }) 
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
          //assigning this to where the tweet info needs to be displayed
          var tbodyEl = $('#tweetbody');

            tbodyEl.html('');

            //connecting the tweet information to this section
            response.tweetinfo.forEach(function(tweetinfo) {
              tbodyEl.append('\
              <tr>\
                  <td class="id">' + tweetinfo.id + '</td>\
                  <td class="text">' + tweetinfo.text + '</td>\
                  <td>\
                  <td class="time">' + tweetinfo.created_at + '</td>\
                  </td>\
              </tr>\
          ');
            });

            

          }
        })
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //Tget a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            console.log(response);
            //assigning all of this to the search portion 
            var tbodyEl = $('#searchbody');

            tbodyEl.html('');

            //connecting the tweet information to the correct spots where it needs to be displayed
            response.tweetinfo.forEach(function(tweetinfo) {
              tbodyEl.append('\
              <tr>\
                  <td class="id">' + tweetinfo.id + '</td>\
                  <td class="text">' + tweetinfo.text + '</td>\
                  <td>\
                  <td class="time">' + tweetinfo.created_at + '</td>\
                  </td>\
              </tr>\
          ');
            });

            

          }
        })
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        // create a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          //changing the data with the values we inputed
          data: JSON.stringify({ name: createInput.val() }),
          success: function(response) {
              console.log(response);
              createInput.val('');
              //repush the button in order to get the new list of data
              $('#get-tweets-button').click();
          }
      });

  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var id = $('#search-input');
    
    //search a tweet and display it.
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      //from the given id getting the info of the tweet for that id
      data: JSON.stringify({ tweetid: id.val()}),
      success: function(response) {
          console.log(response);
          //clicking the button again to get new list of data
          $('#get-searched-tweets').click();
      }
  });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //update a user
    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      //updating old name to the new name
      data: JSON.stringify({ name: newName }),
      success: function(response) {
        console.log(response);
        //clicking to get the new data and show it
        $('#get-button').click();
      }
    });

      
  });



  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val()
    event.preventDefault();

    //delete a tweet
    $.ajax({
      url: '/tweetinfo/:tweetid',
      method: 'DELETE',
      data: JSON.stringify({tweetid:id }),
      contentType: 'application/json',
      success: function(response) {
          console.log(response);
          //clicking the button to show the data updated
          $('#get-tweets-button').click();
      }
  });

  });
   
   function test_print(){

         console.log(“test code”)

   }


});


                    
   
