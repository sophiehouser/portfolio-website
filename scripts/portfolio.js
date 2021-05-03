$(document).ready(function() {
    // Portfolio
    $(function(){
        $('ul.portfolio').mixitup({
            targetSelector: '.item',
            filterSelector: '.filter',
            easing: 'smooth',
            effects: ['fade'],
            layoutMode: 'grid',
            targetDisplayGrid: 'inline-block'
        });
    });
});