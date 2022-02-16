// mouse position
let mouse = {
    x: undefined,
    y: undefined,
    radius: ((canvas.width/80) * (canvas.height/80))
}


window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('mouseout',
    function (event) {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)