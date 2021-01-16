let virusNum = 500;
const virusNumDisplay = document.querySelector('#virus-num');
(()=>{
    virusNumDisplay.style.position = "absolute";
    virusNumDisplay.style.width = "100px";
    virusNumDisplay.style.height = "80px";
    virusNumDisplay.style.height = "";
    virusNumDisplay.style.backgroundColor = "rgba(255,255,255,.5)";
    virusNumDisplay.innerText = "Loading";
    virusNumDisplay.style.textAlign = "center";
    virusNumDisplay.style.lineHeight = "80px";
})();
