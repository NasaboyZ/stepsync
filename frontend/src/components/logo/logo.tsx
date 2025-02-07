import Image from "next/image";
import asset from "../../assets/svg/logo.svg";
import Link from "next/link";
const ImageLogo = ({
  src,
  width,
  height,
  alt,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={false}
    />
  );
};

export default function Logo({ className }: { className?: string }) {
  return (
    <div>
      <Link href="/">
        <ImageLogo
          src={asset}
          width={100}
          height={100}
          alt="Logo stepsync"
          className={className}
          style={{ height: "auto" }}
        />
      </Link>
    </div>
  );
}
