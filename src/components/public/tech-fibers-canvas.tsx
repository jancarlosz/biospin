"use client";

import { useEffect, useRef } from "react";

interface Props {
  colorMode?: "blue" | "green";
}

export function TechFibersCanvas({ colorMode = "blue" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function seededRandom(seed: number) {
      let s = seed;
      return () => {
        s = ((s * 1664525 + 1013904223) >>> 0);
        return s / 4294967296;
      };
    }

    function draw() {
      if (!canvas || !ctx) return;
      const d = Math.min(devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * d;
      canvas.height = h * d;
      ctx.scale(d, d);
      ctx.clearRect(0, 0, w, h);

      const r = seededRandom(72);

      // Glow central
      const gx = w * 0.59;
      const gy = h * 0.45;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.5);
      if (colorMode === "blue") {
        glow.addColorStop(0, "#3b5bff18");
        glow.addColorStop(1, "#3b5bff00");
      } else {
        glow.addColorStop(0, "#78a77722");
        glow.addColorStop(1, "#78a77700");
      }
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Nanofibras
      for (let i = 0; i < 200; i++) {
        const y = r() * h * 1.6 - h * 0.3;
        const x = r() * w * 0.5;
        ctx.beginPath();
        ctx.moveTo(x - w * 0.2, y);
        ctx.bezierCurveTo(
          w * 0.2, y + h * 0.6,
          w * 0.6, y - h * 0.55,
          w * 1.1, y + h * (r() - 0.5)
        );
        const alpha = 0.05 + r() * 0.28;
        if (colorMode === "blue") {
          const b = Math.floor(r() * 80);
          ctx.strokeStyle = `rgba(${60 + Math.floor(r() * 60)},${80 + Math.floor(r() * 60)},${200 + b},${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(${130 + Math.floor(r() * 80)},${165 + Math.floor(r() * 70)},${120 + Math.floor(r() * 65)},${alpha + 0.03})`;
        }
        ctx.lineWidth = 0.3 + r() * 1.4;
        ctx.stroke();
      }

      // Partículas
      for (let i = 0; i < 60; i++) {
        const x = r() * w;
        const y = r() * h;
        ctx.beginPath();
        ctx.arc(x, y, r() * 1.6 + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = colorMode === "blue" ? "#3b5bff33" : "#d8f6a055";
        ctx.fill();
      }
    }

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [colorMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
