import Image, { StaticImageData } from "next/image";

type ImageBoxStyles = "primary";

const defaultStyles: Record<ImageBoxStyles, string> = {
  primary: "object-center object-cover",
};

type ImageBoxProps = {
  src: StaticImageData | string;
  alt: string;
  type?: ImageBoxStyles;
  addClassName?: string;
};

function ImageBox({
  src,
  alt,
  type = "primary",
  addClassName = "",
}: ImageBoxProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 700px) 100vw,(max-width: 1024px) 70vw, 40vw"
      className={`${defaultStyles[type]} ${addClassName}`}
    />
  );
}

export default ImageBox;
