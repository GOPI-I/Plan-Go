import React, { useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import "../Banner/banner.css";

const Banner = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect;
    if (vantaRef.current) {
      vantaEffect = CLOUDS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor: 0x6bbad9,
        cloudColor: 0x9fb4cf,
        speed: 1.9,
        cloudShadowColor: 0x888888,
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="vanta-container">
      <h1 className="vanta-title">Explore the World!</h1>
    </div>
  );
};

export default Banner;
