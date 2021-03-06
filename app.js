var phantom = require('phantom');
phantom.create(function(ph) {
    return ph.createPage(function(page) {
        return page.open("https://api.ingenuity.com/datastream/public/status.jsp", function(status) {
            console.log("opened site? ", status);

            page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                //jQuery Loaded.
                //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                setTimeout(function() {
                    return page.evaluate(function() {

                        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                        var html = $('body').html();

                        return {
                            content: html
                        };
                    }, function(result) {
                        console.log(result);
                        ph.exit();
                    });
                }, 5000);

            });
        });
    });
});