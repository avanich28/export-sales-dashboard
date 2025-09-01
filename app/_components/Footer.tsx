import { FaGithub } from "react-icons/fa";
import HyperLink from "./HyperLink";

function Footer({ addClassName = "" }) {
  return (
    <footer className={`${addClassName} pb-4 font-normal text-headContrast`}>
      <HyperLink
        href="https://github.com/avanich28/export-sales-dashboard"
        addClassName="flex flex-col items-center gap-2"
      >
        <span className="text-3xl sm:text-4xl lg:5xl">
          <FaGithub />
        </span>
        <p className="text-[10px] sm:text-xs lg:text-sm normal-case">
          &copy; Copyright by avanich28
        </p>
      </HyperLink>
    </footer>
  );
}

export default Footer;
