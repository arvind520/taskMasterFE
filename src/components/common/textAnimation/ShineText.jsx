import { useEffect, useState } from "react";
import "./ShineText.css";

const ShineText = ({ text }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let i = 0;
    const shine = () => {
      setCurrentText(text.slice(0, i));
      i += 1;
      if (i <= text.length) {
        setTimeout(shine, 100);
      }
    };
    shine();
  }, [text]);

  return (
    <h1>
      {currentText.split("").map((char, index) => (
        <span
          key={index}
          className={char === " " ? "" : "shine"}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export default ShineText;
