import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const CODE_LINES = [
  { indent: 0, tokens: [["const", "#C084FC"], [" ", ""], ["greeting", "#60A5FA"], [" = ", "#71717A"], ['"Hello, world"', "#86EFAC"], [";", "#71717A"]] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [["export", "#C084FC"], [" ", ""], ["default", "#C084FC"], [" ", ""], ["function", "#C084FC"], [" ", ""], ["Post", "#FBBF24"], ["() {", "#71717A"]] },
  { indent: 2, tokens: [["return", "#C084FC"], [" ", ""], ["<", "#71717A"], ["Article", "#F87171"], [">", "#71717A"], ["{", "#71717A"], ["greeting", "#60A5FA"], ["}", "#71717A"], ["</", "#71717A"], ["Article", "#F87171"], [">", "#71717A"], [";", "#71717A"]] },
  { indent: 0, tokens: [["}", "#71717A"]] },
];

export const SceneArticle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const scroll = interpolate(frame, [40, 150], [0, -60], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const progress = interpolate(frame, [30, 140], [0, 0.75], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60 }}>
      {/* Browser chrome */}
      <div
        style={{
          width: 1400,
          height: 900,
          background: "#0F0F11",
          border: "1px solid #1F1F23",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px) scale(${interpolate(s, [0, 1], [0.96, 1])})`,
        }}
      >
        {/* topbar */}
        <div style={{ height: 44, background: "#141418", borderBottom: "1px solid #1F1F23", display: "flex", alignItems: "center", padding: "0 18px", gap: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3F3F46" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3F3F46" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3F3F46" }} />
          <div style={{ marginLeft: 20, background: "#0A0A0B", borderRadius: 6, padding: "4px 12px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#71717A" }}>
            alex.blog/blog/building-my-blog
          </div>
        </div>
        {/* progress bar */}
        <div style={{ height: 3, background: "#1F1F23" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "linear-gradient(90deg,#6366F1,#EC4899)" }} />
        </div>
        {/* article */}
        <div style={{ padding: 60, transform: `translateY(${scroll}px)` }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#818CF8", letterSpacing: 3, textTransform: "uppercase" }}>
            META  ·  JUL 28, 2026
          </div>
          <div style={{ fontSize: 62, fontWeight: 700, color: "#FAFAFA", letterSpacing: -2, marginTop: 16, lineHeight: 1.05 }}>
            Building my own blog
          </div>
          <div style={{ fontSize: 22, color: "#A1A1AA", marginTop: 20, lineHeight: 1.5 }}>
            Why I stopped writing on someone else's platform and started shaping every pixel of the reading experience myself.
          </div>
          <div style={{ marginTop: 40, background: "#0A0A0B", border: "1px solid #1F1F23", borderRadius: 12, padding: 32, fontFamily: "JetBrains Mono, monospace", fontSize: 20, lineHeight: 1.7 }}>
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ paddingLeft: line.indent * 12 }}>
                {line.tokens.length === 0 ? "\u00A0" : line.tokens.map(([t, c], j) => (
                  <span key={j} style={{ color: c || "#E5E5E5" }}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
