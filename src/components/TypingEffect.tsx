"use client";
import React, { useEffect, useState } from "react";

type TextProps = {
  letters: string;
  styling : string
};

const TypingEffect = ({ letters,styling }: TextProps) => {

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 100 : 200;
  useEffect(() => {
    const callTheFunction = () => {
      const showingInterval = setTimeout(() => {
        if (!isDeleting) {
          if (index < letters.length) {
            setDisplayText(letters.slice(0, index + 1));
            setIndex(index + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          if (index > 0) {
            setDisplayText(letters.slice(0, index - 1));
            setIndex(index - 1);
          } else {
            setIsDeleting(false);
          }
        }
      }, speed);
      return () => clearTimeout(showingInterval);
    };
    callTheFunction();
  }, [index, isDeleting, speed, letters]);

  return (
      <h1 className={styling}>
        {displayText}
        <span className="text-maindeep typingEffect italic">|</span>
      </h1>
  );
};

export default TypingEffect;