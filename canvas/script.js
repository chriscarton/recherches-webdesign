
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

c.moveTo(0, 0);
c.lineTo(200, 100);
c.stroke();

let store = {
    startX:0,
    startY:0,
    endX:0,
    endY:0
};

canvas.addEventListener('click',e=>{

    if(store.startX===0 && store.startY===0){
        store.startX = e.clientX;
        store.startY = e.clientY;

        c.moveTo(store.startX, store.startY);

    }else{
        
        store.startX = 0;
        store.startY = 0;
        
        store.endX = e.clientX;
        store.endY = e.clientY;

        c.lineTo(store.endX,store.endY);
        c.stroke();
        

    }
});