function changeTab(event, classToDisplay){
    // hide all tab contents
    $(".tab-content").addClass("hidden")
    // make sure nothing is marked as active
    $(".tab").removeClass("active")

    // show the new current tab and content
    event.currentTarget.className += " active";
    // show the selected tab content
    $("." + classToDisplay).removeClass("hidden");

    // make sure the success/fail banners are hidden
    $(".msg-success-banner").addClass("hidden");
    $(".msg-failure-banner").addClass("hidden");
}

// intercept the submit and make sure it gets handled by the express server.
$(function(){
    $(".email-form").submit(function(event) {

        // make sure to hide any banners that are still visible from previous messages
        $(".msg-success-banner").addClass("hidden");
        $(".msg-failure-banner").addClass("hidden");

        event.preventDefault();
        var $emailForm = $( this );
        var url = $emailForm.attr( 'action' );

        var posting = $.post( url, {address: $('#address').val(), message: $('#message').val()});

        posting.done(function( data ) {
            if(data.wasSuccessful){
                $(".msg-success-banner").removeClass("hidden");
            }
            else{
                $(".msg-failure-banner").removeClass("hidden");
            }
            console.log(data.message);
        })
    });
});
