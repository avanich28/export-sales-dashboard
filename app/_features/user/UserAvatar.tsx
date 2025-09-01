import ImageBox from "@/app/_components/ImageBox";
import Robot from "@/app/_images/Robot";

const defaultStyles = {
  primary: "size-[100px] sm:size-[120px] lg:size-[140px]",
  secondary: "sm:size-[39px] lg:size-[43px]",
};

function UserAvatar({ name, avatar, type = "primary" }) {
  return (
    <div
      className={`${defaultStyles[type]} relative rounded-full mx-auto border border-headContrast overflow-hidden primaryTransition`}
    >
      {avatar === null ? (
        <Robot />
      ) : (
        <ImageBox src={avatar} alt={`Avatar of ${name}`} />
      )}
    </div>
  );
}

export default UserAvatar;
