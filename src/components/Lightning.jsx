import React, { useRef, useEffect } from "react";

const Lightning = ({
  hue = 142,
  xOffset = 0,
  yOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  isActive = false, // triggers spark effect
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return console.error("WebGL not supported");

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

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
      uniform float uYOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform float uActive;

      #define OCTAVE_COUNT 8

      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(
          abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0,
          0.0, 1.0
        );
        return c.z * mix(vec3(1.0), rgb, c.y);
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
          p *= rotate2d(0.5);
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
        uv.y += uYOffset;

        // jagged lightning shape
        uv += 3.0 * (fbm(uv * uSize + iTime * uSpeed) - 0.5);

        float dist = abs(uv.x);

        // core thickness increases when active
        float core = smoothstep(0.002, 0.0, dist) * (0.5 + uActive*1.5);

        // forks multiply when active
        float forks = smoothstep(0.01, 0.002, dist) * 0.25 * fbm(uv*10.0+iTime*2.0) * (1.0 + uActive*1.5);

        vec3 baseColor = hsv2rgb(vec3(uHue/360.0,1.0,1.0));
        vec3 col = (core + forks) * baseColor * uIntensity;

        // flicker effect
        col *= uActive > 0.5 
                 ? 0.3 + 0.7*fract(sin(iTime*120.0 + uv.x*50.0)*43758.5453) 
                 : smoothstep(0.0,1.0,fract(sin(iTime*37.0)*43758.5453));

        fragColor = vec4(col,1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1,-1, 1,-1, -1,1,
      -1,1, 1,-1, 1,1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program,"aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);

    // Uniforms
    const iResolutionLoc = gl.getUniformLocation(program,"iResolution");
    const iTimeLoc = gl.getUniformLocation(program,"iTime");
    const uHueLoc = gl.getUniformLocation(program,"uHue");
    const uXOffsetLoc = gl.getUniformLocation(program,"uXOffset");
    const uYOffsetLoc = gl.getUniformLocation(program,"uYOffset");
    const uSpeedLoc = gl.getUniformLocation(program,"uSpeed");
    const uIntensityLoc = gl.getUniformLocation(program,"uIntensity");
    const uSizeLoc = gl.getUniformLocation(program,"uSize");
    const uActiveLoc = gl.getUniformLocation(program,"uActive");

    const startTime = performance.now();
    let animationId;

    const render = () => {
      const now = performance.now();
      gl.uniform2f(iResolutionLoc,canvas.width,canvas.height);
      gl.uniform1f(iTimeLoc,(now-startTime)/1000);
      gl.uniform1f(uHueLoc,hue);
      gl.uniform1f(uXOffsetLoc,xOffset);
      gl.uniform1f(uYOffsetLoc,yOffset);
      gl.uniform1f(uSpeedLoc,speed);
      gl.uniform1f(uIntensityLoc,intensity);
      gl.uniform1f(uSizeLoc,size);
      gl.uniform1f(uActiveLoc,isActive?1:0);

      gl.drawArrays(gl.TRIANGLES,0,6);
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [hue,xOffset,yOffset,speed,intensity,size,isActive]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Lightning;
