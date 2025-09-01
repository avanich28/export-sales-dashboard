import Link from "next/link";

function BottomForm({ children, href, text }) {
  return (
    <div className="text-xs sm:text-sm">
      {children}{" "}
      <span className="font-semibold sm:font-bold underline underline-offset-2">
        <Link href={href} className="primaryTransition hover:text-hover">
          {text}
        </Link>
      </span>
    </div>
  );
}

export default BottomForm;
