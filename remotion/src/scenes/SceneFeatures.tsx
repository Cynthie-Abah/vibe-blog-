import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const FEATURES = [
  { k: "01", t: "MDX", d: "Write in Markdown. Ship in React." },
  { k: "02", t: "Shiki", d: "Beautiful, accurate syntax highlighting." },
  { k: "03", t: "Dark by default", d: "Editorial contrast, easy on the eyes." },
  { k: "04", t: "RSS + Sitemap", d: "Own your feed. Own your discovery." },
  { k: "05", t: "Search", d: "Instant, client-side, no backend." },
  { k: "06", t: "Accessible", d: "Semantic, keyboard-friendly, ARIA-aware." },
];

export const SceneFeatures = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ padding: "70px 120px", justifyContent: "center" }}>
      <div style={{ opacity: header, transform: `translateY(${interpolate(header, [0, 1], [20, 0])}px)`, marginBottom: 50 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, color: "#818CF8", letterSpacing: 4, textTransform: "uppercase" }}>
          Built for readers
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, color: "#FAFAFA", letterSpacing: -2, marginTop: 12 }}>
          Fast. Quiet. Yours.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
        {FEATURES.map((f, i) => {
          const s = spring({ frame: frame - 25 - i * 6, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
                background: "#111114",
                border: "1px solid #1F1F23",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#6366F1", letterSpacing: 2 }}>
                {f.k}
              </div>
              <div style={{ fontSize: 34, fontWeight: 600, color: "#FAFAFA", marginTop: 12, letterSpacing: -1 }}>
                {f.t}
              </div>
              <div style={{ fontSize: 18, color: "#A1A1AA", marginTop: 10, lineHeight: 1.5 }}>
                {f.d}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
