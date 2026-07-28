import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const WORDS = ["code", "design", "the craft of building for the web."];

export const SceneTagline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const introS = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", padding: "0 160px" }}>
      <div style={{ maxWidth: 1500 }}>
        <div
          style={{
            fontSize: 24,
            color: "#A1A1AA",
            marginBottom: 40,
            opacity: introS,
            transform: `translateY(${interpolate(introS, [0, 1], [20, 0])}px)`,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: 2,
          }}
        >
          # writing on
        </div>
        <div style={{ fontSize: 110, fontWeight: 600, letterSpacing: -4, color: "#FAFAFA", lineHeight: 1.15 }}>
          {WORDS.map((w, i) => {
            const s = spring({ frame: frame - 15 - i * 18, fps, config: { damping: 200 } });
            const y = interpolate(s, [0, 1], [40, 0]);
            const isLast = i === WORDS.length - 1;
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${y}px)`, marginBottom: 8 }}>
                {i < 2 ? (
                  <>
                    <span style={{ color: "#6366F1" }}>—</span> {w}
                    {i < 2 ? "," : ""}
                  </>
                ) : (
                  <span style={{ color: isLast ? "#FAFAFA" : "#FAFAFA" }}>
                    <span style={{ color: "#6366F1" }}>—</span> {w}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
