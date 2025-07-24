import React from "react";
import HeaderBaseButton from "./HeaderBaseButton";

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function BackButton({ ...props }: PropTypes) {
  return (
    <HeaderBaseButton {...props}>
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </HeaderBaseButton>
  );
}
