$(document).ready(function(){

    let shorthandProperties = {
        duration:'5s',
        timingFunction:'ease-in-out',
        delay:'2s',
        iterationCount:'infinite',
        direction:'alternate'
    }

    $('.input-duration').on('change',function(e){
        shorthandProperties.duration=e.target.value;
        composeAnimationShorthand();
    });

    $('.input-timing-function').on('change',function(e){
        shorthandProperties.timingFunction=e.target.value;
        composeAnimationShorthand();
    });

    $('.input-delay').on('change',function(e){
        shorthandProperties.delay=e.target.value;
        composeAnimationShorthand();
    });

    $('.input-iteration-count').on('change',function(e){
        shorthandProperties.iterationCount=e.target.value;
        composeAnimationShorthand();
    });

    $('.input-direction').on('change',function(e){
        shorthandProperties.direction=e.target.value;
        composeAnimationShorthand();
    });

    // Gestion de la checkbox
    $('.input-infinite').on('change',function(e){
        if($('.input-infinite').is(':checked')){
            shorthandProperties.iterationCount = 'infinite';
        }
        composeAnimationShorthand();
    });
    
    let animationShorthand = '';
    function composeAnimationShorthand(){

        shorthandProperties.duration = $('.input-duration').val();
        if(typeof shorthandProperties.duration==="undefined"){
            shorthandProperties.duration = '5';
        }
        shorthandProperties.timingFunction = $('.input-timing-function').val();
        shorthandProperties.delay = $('.input-delay').val();
        if(typeof shorthandProperties.delay==="undefined"){
            shorthandProperties.delay = '0';
        }

        shorthandProperties.iterationCount = $('.input-iteration-count').val();
        if(typeof shorthandProperties.iterationCount==='undefined'){
            shorthandProperties.iterationCount = '1';
        }
        if($('.input-infinite').is(':checked')){
            shorthandProperties.iterationCount = 'infinite';
        }

        shorthandProperties.direction = $('.input-direction').val();

        // console.log(shorthandProperties);

        animationShorthand = 'anim '+shorthandProperties.duration+'s '+shorthandProperties.timingFunction+' '+shorthandProperties.delay+'s '+shorthandProperties.iterationCount+' '+shorthandProperties.direction;
        // console.log(animationShorthand);
        reset_animation();
        applyAnimationShorthand();
        promptAnimationCode();
    }

    function applyAnimationShorthand(){
        $('.square').css('animation',animationShorthand);
    }

    function reset_animation() {
        var el = document.getElementById('square');
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null; 
      }

    function promptAnimationCode(){
        $('#animationCode').text('animation:'+animationShorthand+';');
    }
    
    composeAnimationShorthand();

});