"use client";
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterTitle = () => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Supercharged productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("AI-Powered Insights.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
