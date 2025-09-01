import Image, { StaticImageData } from "next/image";

type ImageBoxStyles = "primary";

const defaultStyles: Record<ImageBoxStyles, string> = {
  primary: "object-center object-cover",
};

type ImageBoxProps = {
  src: StaticImageData;
  alt: string;
  type?: ImageBoxStyles;
  addClassName?: string;
};

function ImageBox({
  src,
  alt,
  type = "primary",
  // FIXME add size
  addClassName = "",
}: ImageBoxProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`${defaultStyles[type]} ${addClassName}`}
    />
  );
}

export default ImageBox;
