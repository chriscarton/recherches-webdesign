// background color change according to cursor position
$(document).mousemove(function (e) {

    var $width = ($(document).width()) / 255;
    var $height = ($(document).height()) / 255;
    var $pageX = parseInt(e.pageX / $width, 10);
    var $pageY = parseInt(e.pageY / $height, 10);
  
    // rgba($a-$b-$c);
    var $a = $pageX,
        $b = ($pageY - 255) * (-1),
        $c = 0;
  
    // if cursor is in bottom left, adjust $c accordingly
    if ($pageX <= $pageY) {
        $c = $pageY - $pageX;
    }
  
    // change element to whatever you need to target
    $('body').css('background-color', 'rgb('+$a+','+$b+','+$c+')');
  
  });