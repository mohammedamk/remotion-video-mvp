import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";



const words = ["Hello", "Tal,", "I", "am", "ready", "to", "build."];

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  logoColor1: zColor(),
  logoColor2: zColor(),
});


export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Ken Burns: zoom + pan
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1, 1.15],
    { extrapolateRight: "clamp" }
  );

  const translateX = interpolate(
    frame,
    [0, durationInFrames],
    [0, -40],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    [0, -30],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      {/* Background with Ken Burns */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        }}
      >
        <Img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Word-by-word popping text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
          fontSize: 70,
          fontWeight: "bold",
          color: "white",
          textShadow: "0 4px 10px rgba(0,0,0,0.6)",
        }}
      >
        {words.map((word, index) => {
          const startFrame = index * fps * 0.3;

          const opacity = interpolate(
            frame,
            [startFrame, startFrame + fps * 0.2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const popScale = interpolate(
            frame,
            [startFrame, startFrame + fps * 0.2],
            [0.8, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <span
              key={word}
              style={{
                opacity,
                transform: `scale(${popScale})`,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
