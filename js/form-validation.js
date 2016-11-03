// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='contactUs']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: "required",
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      message: "required"
    },
    // Specify validation error messages
    messages: {
      name: "お名前を入力してください",
      email: "メアドを入力してください",
      message: "メッセージを入力してください"
    }
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    // submitHandler: function(form) {
    //   form.submit();
    // }
  });

  $(document).ready(function() {
    $("form[name='contactUs']").submit(function (event) {

      // get the form data
      // there are many ways to get this data using jQuery (you can use the class or id also)
      var formData = {
        "icon_emoji": ":question:",
        'text': $('input[name=email]').val() + "\n" + $('input[name=message]').val(),
        'channel': "#hp-inqury",
        'username': $('input[name=name]').val()
      };

      // process the form
      $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: 'https://hooks.slack.com/services/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', // the url where we want to POST
        data: JSON.stringify(formData), // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true

      })
      // using the done promise callback
          .done(function (data) {

            // log data to the console so we can see
            // console.log(data);

            // here we will handle errors and validation messages
          });

      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();

    });
  });

});