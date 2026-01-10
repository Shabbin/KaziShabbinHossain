import React, { useRef, useEffect } from "react";

const Lightning = ({
  hue = 142,
  xOffset = 0,
  yOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  isActive = false,
}) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef({});
  const rafRef = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  /* =========================
     INIT WEBGL (ONCE)
  ========================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        powerPreference: "low-power",
      }) ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = isMobile
        ? Math.min(1.25, window.devicePixelRatio || 1)
        : Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    /* =========================
       SHADERS
    ========================= */
    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uYOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform float uActive;

      #ifdef MOBILE
        #define OCTAVES 4
      #else
        #define OCTAVES 6
      #endif

      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(
          abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0,
          0.0,
          1.0
        );
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < OCTAVES; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        uv.x += uXOffset;
        uv.y += uYOffset;

        uv += 2.2 * (fbm(uv * uSize + iTime * uSpeed) - 0.5);

        float d = abs(uv.x);

        float core = smoothstep(0.0025, 0.0, d);
        float forks = uActive > 0.5
          ? smoothstep(0.01, 0.003, d) * fbm(uv * 6.0 + iTime) * 0.25
          : 0.0;

        float alpha = core + forks;
        vec3 color = hsv2rgb(vec3(uHue / 360.0, 1.0, 1.0));
        vec3 col = color * alpha * uIntensity;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compile = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compile(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compile(
      (isMobile ? "#define MOBILE\n" : "") + fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    [
      "iResolution",
      "iTime",
      "uHue",
      "uXOffset",
      "uYOffset",
      "uSpeed",
      "uIntensity",
      "uSize",
      "uActive",
    ].forEach(
      (u) => (uniformsRef.current[u] = gl.getUniformLocation(program, u))
    );

    const start = performance.now();
    let lastFrame = 0;

    const render = (t) => {
      if (isMobile && t - lastFrame < 50) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrame = t;

      gl.uniform2f(
        uniformsRef.current.iResolution,
        canvas.width,
        canvas.height
      );
      gl.uniform1f(uniformsRef.current.iTime, (t - start) / 1000);
      gl.uniform1f(uniformsRef.current.uHue, hue);
      gl.uniform1f(uniformsRef.current.uXOffset, xOffset);
      gl.uniform1f(uniformsRef.current.uYOffset, yOffset);
      gl.uniform1f(uniformsRef.current.uSpeed, speed);
      gl.uniform1f(uniformsRef.current.uIntensity, intensity);
      gl.uniform1f(uniformsRef.current.uSize, size);
      gl.uniform1f(uniformsRef.current.uActive, isActive ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Lightning;
