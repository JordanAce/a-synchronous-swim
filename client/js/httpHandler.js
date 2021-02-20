

(function() {
  //const messageQueue = require('../../server/js/messageQueue');

  const serverUrl = 'http://127.0.0.1:3000';

  const fetchSwimCommand = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (res) => {
        SwimTeam.move(res);
      },
      error: (error) => {
        console.log('ERROR', error);
      },
      complete: () => {
        setTimeout(fetchSwimCommand, 5000);
      }
    });
  };
  fetchSwimCommand();

  const fetchRandomSwimCommand = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (res) => {
        SwimTeam.move(res);
      },
      error: (error) => {
        console.log('ERROR', error);
      },
      complete: () => {
        setTimeout(fetchRandomSwimCommand, 100000);
      }
    });
  };
  fetchRandomSwimCommand();
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/backgroundupload.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);

  });

})();


