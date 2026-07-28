import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SceneIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const blur = interpolate(s, [0, 1], [16, 0]);
  const y = interpolate(s, [0, 1], [24, 0]);
  const cursor = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
  const drift = Math.sin(frame / 40) * 3;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <div style={{ textAlign: "center", transform: `translateY(${y + drift}px)`, filter: `blur(${blur}px)`, opacity: s }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 20,
            letterSpacing: 6,
            color: "#818CF8",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          ─  A Personal Blog  ─
        </div>
        <div
          style={{
            fontSize: 220,
            fontWeight: 700,
            letterSpacing: -8,
            color: "#FAFAFA",
            lineHeight: 0.95,
          }}
        >
          alex<span style={{ color: "#6366F1" }}>.</span>blog
          <span style={{ opacity: cursor, color: "#6366F1" }}>_</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
