"use client";
import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "@/styles/suneditor.min.css"; // Import Sun Editor's CSS File
// import "suneditor/src/assets/css/suneditor.css";

type Props = {
  language: string;
  name: string;
  setValue: (values: any) => void;
  values: any;
  defaultValue?: string;
};
export function TextEditor({
  setValue,
  language,
  name,
  values,
  defaultValue,
}: Props) {
  const handleChange = (e: string) => {
    setValue((values: any) => ({
      ...values,
      [`${name}`]: {
        ...values[`${name}`],
        [`${language}`]: e,
      },
    }));
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
