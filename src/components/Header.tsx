import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="px-4 py-2">
      <Image
        src="/bmail-logo.webp"
        alt="Bmail logo"
        width={109}
        height={40}
        priority
        className="object-cover h-10"
      />
    </div>
  );
}
