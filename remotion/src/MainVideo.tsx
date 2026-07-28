import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

import { SceneIntro } from "./scenes/SceneIntro";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneFeatured } from "./scenes/SceneFeatured";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneArticle } from "./scenes/SceneArticle";
import { SceneOutro } from "./scenes/SceneOutro";

loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
loadJetBrains("normal", { weights: ["400", "500"], subsets: ["latin"] });

const D = { intro: 90, tagline: 105, featured: 165, article: 165, features: 150, outro: 120 };
const T = 18;
export const TOTAL_FRAMES =
  D.intro + D.tagline + D.featured + D.article + D.features + D.outro - T * 5;

function Grain() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.06,
        mixBlendMode: "overlay",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
        transform: `translate(${(frame * 7) % 3}px, ${(frame * 5) % 3}px)`,
      }}
    />
  );
}

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0B", fontFamily: "Inter, sans-serif" }}>
      {/* Ambient background */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(99,102,241,0.12), transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(236,72,153,0.08), transparent 55%)",
        }}
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D.intro}>
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={D.tagline}>
          <SceneTagline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={D.featured}>
          <SceneFeatured />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={D.article}>
          <SceneArticle />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={D.features}>
          <SceneFeatures />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={D.outro}>
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Grain />
    </AbsoluteFill>
  );
};
