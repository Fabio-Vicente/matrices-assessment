import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 px-4 py-2">
      <Image
        src="/bmail-logo.webp"
        alt="Bmail logo"
        width={109}
        height={40}
        priority
        className="h-10 object-cover"
      />
    </header>
  );
}
