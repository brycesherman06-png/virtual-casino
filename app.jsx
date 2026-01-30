const { useEffect, useRef, useState } = React;

function App() {

  const mountRef = useRef(null);
  const [mode, setMode] = useState("Lobby");

  useEffect(() => {

    let scene, camera, renderer, cube;

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

    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animate
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

    // Resize
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
