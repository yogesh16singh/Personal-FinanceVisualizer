import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6">
      <div className="text-center mt-0  pt-0">
        <p>
          &copy; {new Date().getFullYear()} Personal Finance Visualizer by
          Yogesh Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
