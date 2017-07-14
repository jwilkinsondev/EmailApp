function changeTab(event, tabName){
    var i;
    var tabLinks;
    var tabsContent;
    var tabLinksCount;
    var tabsContentCount;

    tabsContent = document.getElementsByClassName("tab-content");
    tabsContentCount = tabsContent.length;
    // hide the tabs
    for(i = 0; i < tabsContentCount; i++){
        tabsContent[i].style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tab");
    tabLinksCount = tabLinks.length;
    // remove any 'active' classes
    for(i = 0; i < tabLinksCount; i++){
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // show the new current tab and content
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

$(function(){
    $("#emailFormID").submit(function(event) {
        event.preventDefault();
        var $emailForm = $( this );
        var url = $emailForm.attr( 'action' );

        var posting = $.post( url, {address: $('#address').val(), message: $('#message').val()});

        posting.done(function( data ) {
            alert(data.message);
        })
    });
});
