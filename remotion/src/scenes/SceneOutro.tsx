import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SceneOutro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const line = interpolate(frame, [10, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const cursor = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, color: "#818CF8", letterSpacing: 6, textTransform: "uppercase" }}>
          Now Reading
        </div>
        <div style={{ fontSize: 180, fontWeight: 700, color: "#FAFAFA", letterSpacing: -6, marginTop: 30, lineHeight: 1 }}>
          alex<span style={{ color: "#6366F1" }}>.</span>blog
        </div>
        <div style={{ height: 2, background: "#1F1F23", width: 500, margin: "40px auto 30px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#6366F1,#EC4899)", transform: `scaleX(${line})`, transformOrigin: "left" }} />
        </div>
        <div style={{ fontSize: 26, color: "#A1A1AA", fontFamily: "JetBrains Mono, monospace" }}>
          $ open https://alex.blog<span style={{ opacity: cursor, color: "#6366F1" }}>_</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
