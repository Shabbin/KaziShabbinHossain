import React, { useRef, useEffect } from "react";

const Lightning = ({
  hue = 142,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // ===============================
    // CONTEXT LOSS SAFETY (CRITICAL)
    // ===============================
    const onContextLost = (e) => {
      e.preventDefault();
    };

    const onContextRestored = () => {
      window.location.reload(); // clean, artifact-free recovery
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    // ===============================
    // DPI-LOCKED RESIZE (NEVER PIXELATE)
    // ===============================
    let lastDPR = window.devicePixelRatio || 1;
    const maxSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      lastDPR = dpr;

      const width = Math.min(Math.floor(rect.width * dpr), maxSize);
      const height = Math.min(Math.floor(rect.height * dpr), maxSize);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Detect silent DPR changes (zoom, monitor move, OS scaling)
    const checkDPR = () => {
      const dpr = window.devicePixelRatio || 1;
      if (dpr !== lastDPR) {
        resizeCanvas();
      }
    };

    // 2D fullscreen shader cleanup
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    // ===============================
    // SHADERS (UNCHANGED)
    // ===============================
    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;

      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(
          abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0,
          0.0, 1.0
        );
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
        p = fract(p * .1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
      }

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 fp = fract(p);

        float a = hash12(ip);
        float b = hash12(ip + vec2(1.0, 0.0));
        float c = hash12(ip + vec2(0.0, 1.0));
        float d = hash12(ip + vec2(1.0, 1.0));

        vec2 t = smoothstep(0.0, 1.0, fp);
        return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;

        for (int i = 0; i < OCTAVE_COUNT; ++i) {
          value += amplitude * noise(p);
          p *= rotate2d(0.45);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv = 2.0 * uv - 1.0;
        uv.x *= iResolution.x / iResolution.y;
        uv.x += uXOffset;

        uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;

        float dist = abs(uv.x);
        vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));

        vec3 col = baseColor * pow(
          mix(0.0, 0.07, hash11(iTime * uSpeed)) / max(dist, 0.001),
          1.0
        ) * uIntensity;

        fragColor = vec4(col, 1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    let animationId;

    const render = () => {
      checkDPR();

      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      cancelAnimationFrame(animationId);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Lightning;
