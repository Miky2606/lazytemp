"use client";

import { toast } from "react-toastify";

export const CodeView = ({ text }: { text: string }): JSX.Element => {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <div
      className="p-1 px-2 bg-slate-700 rounded text-white cursor-pointer"
      onClick={() => copy(text)}
    >
      {text}
    </div>
  );
};
