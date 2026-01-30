const { useEffect, useRef, useState } = React;

function App() {

  const mountRef = useRef(null);
  const [mode, setMode] = useState("Lobby");

  useEffect(() => {

    let scene, camera, renderer, cube;

    async function init() {

      const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050508);

      // Camera
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Light
      scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

      // Spinning Cube (test object)
      const geo = new THREE.BoxGeometry();
      const mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geo, mat);
      scene.add(cube);

      // Loop
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      animate();
    }

    init();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  }, []);

  return (
    <>
      <div className="hud">
        <div>Mode: {mode}</div>
        <button onClick={() => setMode("Lobby")}>Lobby</button>
        <button onClick={() => setMode("Roulette")}>Roulette</button>
        <button onClick={() => setMode("Blackjack")}>Blackjack</button>
        <button onClick={() => setMode("Slots")}>Slots</button>
      </div>

      <div ref={mountRef}></div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
