"use client";
import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "@/styles/suneditor.min.css"; // Import Sun Editor's CSS File
// import "suneditor/src/assets/css/suneditor.css";

type Props = {
  language: string;
  name: string;
  setValue: (x: any, y: any) => void;

  defaultValue?: string;
};
export function TextEditor({
  setValue,
  language,
  name,

  defaultValue,
}: Props) {
  const handleChange = (e: string) => {
    setValue(`${name}[${language}]`, e);
  };

  return (
    <SunEditor
      lang={"en"}
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e)}
      setOptions={{
        height: `100`,
        buttonList: buttonList.complex,
      }}
    />
  );
}
