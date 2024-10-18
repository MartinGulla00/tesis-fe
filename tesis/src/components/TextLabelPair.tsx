import React from "react";
import { Label } from "./ui/label";

type Props = { title: string; text: string; className?: string };

function TextLabelPair({ title, text, className }: Props) {
  return (
    <div className={`${className} flex flex-col`}>
      <Label>{title}</Label>
      {/* <span className="font-bold">{title}</span> */}
      <span>{text}</span>
    </div>
  );
}

export default TextLabelPair;
