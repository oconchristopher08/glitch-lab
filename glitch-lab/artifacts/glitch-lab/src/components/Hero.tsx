import { useGateway } from "@/lib/gateway";

export default function Hero() {
  const { enterLab } = useGateway();

  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Centered glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[450px] h-[450px] rounded-full"
          style={{ background: "#00ff88", opacity: 0.10, filter: "blur(120px)" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center z-10 px-6 -mt-12">

        <h1
          className="glitch-wordmark select-none mb-5"
          data-text="GLITCH LAB"
          style={{
            fontSize: "clamp(48px, 10vw, 112px)",
            letterSpacing: "0.08em",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          GLITCH LAB
        </h1>

        <p
          className="text-[#666] leading-relaxed max-w-md mb-10 font-rajdhani"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)" }}
        >
          Experimental systems. Digital chaos.
        </p>

        <button
          type="button"
          onClick={() => enterLab("/app/chainster")}
          className="font-orbitron font-semibold tracking-wide px-10 py-4 bg-[#00ff88] text-black transition-all hover:scale-105"
          style={{ fontSize: "13px" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 30px rgba(0,255,136,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          ENTER LAB
        </button>

      </div>

    </section>
  );
}
