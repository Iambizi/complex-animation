(function() {
  var script = document.createElement("script");
  script.onload = function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
  document.head.appendChild(script);
})();

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("myCanvas"),
  antialias: true,
  alpha: true
});
//actual background color
renderer.setClearColor(0xdcdcdc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Update viewport on resize
window.addEventListener("resize", function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// 1) CAMERA \\

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 17);

// 2) SCENE \\

const scene = new THREE.Scene();

// 3) LIGHT \\

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const pointedLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointedLight);

var light3;
//red r
light3 = new THREE.DirectionalLight(0xdc143c, 1);
light3.position.set(0, 1, 0);
scene.add(light3);

//blue lagoon
light3 = new THREE.DirectionalLight(0x095062, 1);
light3.position.set(0, -1, 0);
scene.add(light3);

// 4) CONTROLS \\
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 17;
controls.maxDistance = 100;

// 5) GEOMETRY + MATERIAL \\

const geometry = new THREE.BoxGeometry(8, 8, 8);
const boxCount = 200;
let boxes = [];

const container = new THREE.Object3D();

var boxGeom = new THREE.BoxBufferGeometry(5, 5, 5);
for (var i = 0; i < boxCount; i++) {
  var material = new THREE.MeshStandardMaterial({ color: 0xdcdcdc });

  var box = new THREE.Mesh(boxGeom, material);
  box.rotation.x = Math.random() * Math.PI;
  box.rotation.y = Math.random() * Math.PI;
  box.rotation.z = Math.random() * Math.PI;
  box.speedX = Math.random() * 0.02 - 0.01;
  box.speedY = Math.random() * 0.02 - 0.01;
  box.speedZ = Math.random() * 0.02 - 0.01;
  box.castShadow = true;
  box.receiveShadow = true;

  boxes.push(box);
  container.add(box);
}

// 7) RENDER LOOP \\
requestAnimationFrame(render);

function render() {
  for (var i = 0; i < boxCount; i++) {
    boxes[i].rotation.x += boxes[i].speedX;
    boxes[i].rotation.y += boxes[i].speedY;
    boxes[i].rotation.z += boxes[i].speedZ;
  }
  container.rotation.y += 0.02;
  scene.rotation.y -= 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // controls.update();
  // ccapture
  // capturer.capture(myCanvas);
  scene.add(container);
}
//cccapture gif

// capturer.start();
// setTimeout(function setUp() {
//   capturer.stop();
//   capturer.save();
// }, 7000);
