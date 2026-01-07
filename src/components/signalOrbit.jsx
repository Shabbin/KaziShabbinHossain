

const ACCENT_HEX = "#22c55e";

const SignalOrbit = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* soft background glow */}
      <div
        className="pointer-events-none absolute inset-[-40%]"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(34,197,94,0.4), transparent 60%)
          `,
          filter: "blur(18px)",
        }}
      />

      {/* core circle */}
      <div
        className="
          relative
          w-40 h-40
          sm:w-52 sm:h-52
          rounded-full
          bg-[#082b25]
          border border-emerald-400/80
          shadow-[0_0_40px_rgba(34,197,94,0.9)]
          flex items-center justify-center
        "
      >
        {/* inner label */}
        <div
          className="
            w-20 h-20
            rounded-full
            bg-emerald-400
            flex items-center justify-center
            text-slate-950 font-semibold text-xs text-center
            shadow-[0_0_25px_rgba(34,197,94,0.9)]
          "
        >
          <span>Let&apos;s talk</span>
        </div>

        {/* pulsing ring */}
        <div className="absolute inset-3 rounded-full border border-emerald-300/80 signal-pulse" />

        {/* spinning dashed ring */}
        <div className="absolute inset-[-10px] rounded-full border border-dashed border-emerald-500/70 signal-spin-slow" />
      </div>

      {/* floating pills around the core */}
      <div className="absolute w-60 h-60 sm:w-72 sm:h-72 pointer-events-none">
        {/* top pill */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 signal-pill-1">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-[#020617]
              border border-emerald-500/70
              px-3 py-1
              text-[11px]
              text-emerald-100
              shadow-[0_0_18px_rgba(34,197,94,0.7)]
            "
          >
            Email
          </span>
        </div>

        {/* right pill */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 signal-pill-2">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-[#020617]
              border border-emerald-500/70
              px-3 py-1
              text-[11px]
              text-emerald-100
              shadow-[0_0_18px_rgba(34,197,94,0.7)]
            "
          >
            Projects
          </span>
        </div>

        {/* bottom-left pill */}
        <div className="absolute left-0 bottom-1/4 signal-pill-3">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-[#020617]
              border border-emerald-500/70
              px-3 py-1
              text-[11px]
              text-emerald-100
              shadow-[0_0_18px_rgba(34,197,94,0.7)]
            "
          >
            Open to work
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignalOrbit;
