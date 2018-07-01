/*
 * 波纹动画
 * */
const name = 'MRipple'
const prefix = 'm-ripple'

function ani(event){
    console.log(event)
    let pDiv = event.target,
        cDiv = document.createElement('div');
    pDiv.appendChild(cDiv);
    let rectObj = forRect(pDiv),
        _height = event.pageY - rectObj.top,
        _left = event.pageX - rectObj.left,
        _scale = 'scale(' + pDiv.clientWidth / 100 * 10 + ')';
    let position = {
        top: _height+'px',
        left: _left+'px'
    };
    cDiv.className = cDiv.className + " waves-animation",
        cDiv.setAttribute("style", forStyle(position)),
        position["-webkit-transform"] = _scale,
        position["-moz-transform"] = _scale,
        position["-ms-transform"] = _scale,
        position["-o-transform"] = _scale,
        position.transform = _scale,
        position.opacity = "1",
        position["-webkit-transition-duration"] = duration + "ms",
        position["-moz-transition-duration"] = duration + "ms",
        position["-o-transition-duration"] = duration + "ms",
        position["transition-duration"] = duration + "ms",
        position["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        position["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        position["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        position["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
    cDiv.setAttribute("style", forStyle(position));
    let finishStyle = {
        opacity: 0,
        "-webkit-transition-duration": duration + "ms",
        "-moz-transition-duration": duration + "ms",
        "-o-transition-duration": duration + "ms",
        "transition-duration": duration + "ms",
        "-webkit-transform" : _scale,
        "-moz-transform" : _scale,
        "-ms-transform" : _scale,
        "-o-transform" : _scale,
        top: _height + "px",
        left: _left + "px"
    };
    setTimeout(function(){
        cDiv.setAttribute("style", forStyle(finishStyle));
        setTimeout(function(){
            pDiv.removeChild(cDiv);
        },duration);
    },100)
}


function bind(el, binding) {
    console.log('bind')
}
function unbind() {
}
function update() {
}

export default {
    name: 'MRipple',
    bind,
    unbind,
    update,
}
