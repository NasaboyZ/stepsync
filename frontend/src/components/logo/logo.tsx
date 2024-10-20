import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src="/logo.png"
        width={500}
        height={500}
        alt="Logo stepsync"
      ></Image>
    </div>
  );
}
