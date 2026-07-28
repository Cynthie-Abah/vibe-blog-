import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const POSTS = [
  { img: "building-my-blog.jpg", tag: "Meta", title: "Building my own blog", date: "Jul 28, 2026", time: "8 min read" },
  { img: "learning-react.jpg", tag: "React", title: "Learning React, again", date: "Jul 20, 2026", time: "6 min read" },
  { img: "accessibility.jpg", tag: "A11y", title: "Accessibility is a craft", date: "Jul 12, 2026", time: "5 min read" },
];

export const SceneFeatured = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ padding: "80px 120px", justifyContent: "center" }}>
      <div style={{ opacity: header, transform: `translateY(${interpolate(header, [0, 1], [20, 0])}px)` }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, color: "#818CF8", letterSpacing: 4, textTransform: "uppercase" }}>
          Featured
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, color: "#FAFAFA", letterSpacing: -2, marginTop: 12, marginBottom: 60 }}>
          Latest articles
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
        {POSTS.map((p, i) => {
          const s = spring({ frame: frame - 20 - i * 12, fps, config: { damping: 200 } });
          const y = interpolate(s, [0, 1], [50, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `translateY(${y}px)`,
                background: "#111114",
                border: "1px solid #1F1F23",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
                <Img src={staticFile(`images/${p.img}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#818CF8", background: "rgba(99,102,241,0.12)", padding: "4px 10px", borderRadius: 6 }}>
                  {p.tag}
                </div>
                <div style={{ fontSize: 28, fontWeight: 600, color: "#FAFAFA", marginTop: 16, lineHeight: 1.25, letterSpacing: -0.5 }}>
                  {p.title}
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 20, fontSize: 15, color: "#71717A" }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
