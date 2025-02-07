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
      priority={true}
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
          height={50}
          alt="Logo stepsync"
          className={className}
        />
      </Link>
    </div>
  );
}
