$(function() {
    $(".slider").cycle({
        // Just being fancy, you can add an extra class to
        // the rest of the slides and use it here.
        slideExpr: "img:not(.placeholder)",
        // Don't let the plugin handle the sizes
        slideResize: false,
        containerResize: false
    });
});
     

