import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { asset, COUNTRIES } from "../config.js";

function latLngToVec(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function GlobeBackground() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    let cancelled = false;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      setFallback(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
    camera.position.z = 2.85;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const globe = new THREE.Group();
    scene.add(globe);

    const loader = new THREE.TextureLoader();
    const map = loader.load(asset("earth.jpg"));
    if ("colorSpace" in map) map.colorSpace = THREE.SRGBColorSpace;

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map,
        shininess: 8,
        specular: new THREE.Color("#1c3340"),
      })
    );
    globe.add(earth);

    globe.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.035, 40, 40),
        new THREE.MeshBasicMaterial({
          color: 0x78d0e8,
          transparent: true,
          opacity: 0.1,
          side: THREE.BackSide,
        })
      )
    );

    scene.add(new THREE.AmbientLight(0xffffff, 0.52));
    const sun = new THREE.DirectionalLight(0xffffff, 1.05);
    sun.position.set(4, 2.2, 3);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x78d0e8, 0.22);
    fill.position.set(-3, -1, 2);
    scene.add(fill);

    const flagMats = [];

    COUNTRIES.forEach((country) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.014, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xc4a35a })
      );
      pin.position.copy(latLngToVec(country.lat, country.lng, 1.01));
      globe.add(pin);

      const flagImg = new Image();
      flagImg.onload = () => {
        if (cancelled) return;
        const cnv = document.createElement("canvas");
        cnv.width = 128;
        cnv.height = 86;
        const ctx = cnv.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 128, 86);
        ctx.drawImage(flagImg, 5, 5, 118, 76);
        const flagMap = new THREE.CanvasTexture(cnv);
        if ("colorSpace" in flagMap) flagMap.colorSpace = THREE.SRGBColorSpace;
        const flagMat = new THREE.SpriteMaterial({
          map: flagMap,
          transparent: true,
          opacity: 0.92,
          depthTest: true,
          sizeAttenuation: true,
        });
        flagMats.push(flagMat, flagMap);
        const flag = new THREE.Sprite(flagMat);
        flag.position.copy(latLngToVec(country.lat, country.lng, 1.09));
        flag.scale.set(0.18, 0.12, 1);
        globe.add(flag);
      };
      flagImg.src = asset(`flags/${country.code}.png`);
    });

    const resize = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollY = window.scrollY;
    let dampedScroll = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = (now - start) / 1000;
      dampedScroll += (scrollY - dampedScroll) * 0.08;
      const extra = reduced ? 0 : dampedScroll * 0.00055;
      globe.rotation.y = 0.5 + t * 0.08 + extra;
      globe.rotation.x = 0.14;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      map.dispose();
      earth.geometry.dispose();
      earth.material.dispose();
      flagMats.forEach((item) => item.dispose?.());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={wrapRef} className="globe-scene">
        {fallback ? (
          <div
            className="earth-spin absolute inset-[8%] rounded-full"
            style={{ backgroundImage: "url(/earth.jpg)", backgroundSize: "200% 100%" }}
          />
        ) : (
          <canvas ref={canvasRef} className="h-full w-full" />
        )}
      </div>
      <div className="globe-veil" />
    </div>
  );
}
