import React from "react";
import TextType from "../TextType";

export default function Recommendation() {
  return (
    <TextType
      text={["Text typing effect", "for your websites", "Happy coding!"]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
    />
  );
}
