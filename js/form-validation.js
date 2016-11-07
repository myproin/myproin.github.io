// Wait for the DOM to be ready
$(function() {
  // Add notnull rule
  $.validator.addMethod("notnull", function(value, element) {
    return value == '' || value.trim().length != 0;
  }, "Not null!");

  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='contactUs']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: {
        required: true,
        notnull: true
      },
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      message: {
        required: true,
        notnull: true
      }
    },
    // Specify validation error messages
    messages: {
      name: "お名前を入力してください",
      email: "メアドを入力してください",
      message: "メッセージを入力してください"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
          "icon_emoji": ":question:",
          'text': $('input[name=email]').val() + "\n" + $('textarea[name=message]').val(),
          'channel': "#lp-inquiry",
          'username': $('input[name=name]').val()
        };

        // process the form
        $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: 'https://hooks.slack.com/services/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', // the url where we want to POST
          data: JSON.stringify(formData), // our data object
          dataType: 'json', // what type of data do we expect back from the server
          crossDomain: true,
          async: true
        }).done(function (data) {
              console.log(data);
            });
      $("#contactUsDiv").html("<div id='message'></div>");
      $("#message").html("<h3>お問い合わせありがとうございます。</h3>")
          .hide()
          .fadeIn(1500, function () {
            $("#message").append("<h3>ご返信まで少々お時間を頂く場合がございますがご了承ください。</h3>");
          });

        return false;


        // stop the form from submitting the normal way and refreshing the page
        //event.preventDefault();

    }
  });


});