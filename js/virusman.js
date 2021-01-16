window.addEventListener("load", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();

  const manMaterial = new THREE.MeshLambertMaterial({ color: 0x1e90ff });

  const face = new THREE.Mesh(new THREE.BoxGeometry(80, 100, 40), manMaterial);
  face.position.set(0, 20, 0);
  scene.add(face);

  const light = new THREE.DirectionalLight(0xffffff, 0.9);
  light.position.set(0, 50, 30);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xf8f8ff, 0.9);
  scene.add(ambient);

  const camera = new THREE.PerspectiveCamera(100, width / height, 1, 100000);
  camera.position.set(0, 0, 180);
  camera.lookAt(scene.position);

  let moveXarray = [];
  let moveYarray = [];
  let moveZarray = [];
  let randomX = [];
  let randomY = [];
  let stop = 0;
  let virus;
  let virusArray = [];
  let scaleX = 2;
  let scaleY = 50;
  let scaleZ = 50;


  function virusInstance() {
    for(let i = 0;i < virusNum;i ++){
      virus = new THREE.Mesh(
        new THREE.SphereGeometry(scaleX, scaleY, scaleZ),
        new THREE.MeshNormalMaterial()
      );
      virus.name = `createVirus${i}`;
      virusArray.push(virus);
      // console.log(virus.name)
    }
  }
  function addvirus() {
    randomX.push((Math.random()*2)-1);
    randomY.push((Math.random()*2)-1);
    virusArray[stop].position.set(0, 0, 20);
    scene.add(virusArray[stop]);

    moveXarray[stop] = 0;
    moveYarray[stop] = 0;
    moveZarray[stop] = 20;
    // console.log(stop);

    if (stop === virusNum-1) {
      return;
    } else if (stop === 0) {
      virusAnimation();
      stop += 1;
      setTimeout(addvirus, 10);
      virusNumDisplay.innerText = `${stop+1}`;
    } else {
      setTimeout(addvirus, 10);
      stop += 1;
      virusNumDisplay.innerText = `${stop+1}`;
    }
  }

  virusInstance();
  addvirus();

  let displayvirusNum = 0;
  let frame;
  let nameNum = 0;
  function removevirus() {
    frame = requestAnimationFrame(removevirus);
    displayvirusNum ++;
    if(displayvirusNum%500 === 0){
      virus.name = `createVirus${nameNum}`;
      var selectedObject = scene.getObjectByName(virus.name);
      // console.log(selectedObject)
      scene.remove(selectedObject);
      nameNum ++;
    }
  }

  removevirus();
  function virusAnimation() {
    requestAnimationFrame(virusAnimation);
    for (let i = 0; i < virusArray.length; i++) {
      moveXarray[i] -= randomX[i];
      moveYarray[i] += randomY[i];
      moveZarray[i] += 0.5;
      virusArray[i].position.set(moveXarray[i], moveYarray[i], moveZarray[i]);
    }
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#display"),
    antialias: true,
  });
  renderer.setSize(width, height); 
  renderer.setClearColor(0x000000); 
  renderer.setPixelRatio(window.devicePixelRatio);
  function render() {
    requestAnimationFrame(render); 
    renderer.render(scene, camera); 
  }
  new THREE.OrbitControls(camera, renderer.domElement);
  render();
});
