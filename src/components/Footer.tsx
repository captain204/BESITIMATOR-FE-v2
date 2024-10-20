import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; 

const LINKS = [
  {
    title: "Quick Links",
    items: [
      { name: "About", href: "/about" },
      { name: "FAQ", href: "/faq" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Quick Links",
    items: [
      { name: "Partners", href: "/partners" },
      { name: "Advertise With Us", href: "/advertise" },
      { name: "Product", href: "/product" },
      { name: "Pricing Plans", href: "/pricing" },
    ],
  },
  {
    title: "Keep In Touch",
    items: [
      {
        name: "info@thebuildingestimator.com",
        href: "mailto:info@thebuildingestimator.com",
      },
      { name: "+234 702 666 6489", href: "tel:+2347026666489" },
    ],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-black" >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 justify-between  md:grid-cols-2 mt-8">
          <div className="">
            <img src="/footerlogo.png" alt="Logo" className="h-16 w-auto  relative md:-left-3 -left-2" />
            <Typography className="text-lg">
              Your reliable construction solution which gives you    estimated <br/>
           
              quantities of your material and labour requirements.
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 justify-between gap-4 md:mt-0 mt-6">
            {LINKS.map(({ title, items }, index) => (
              <ul key={`${title}-${index}`} className="space-y-2">
                {" "}
                {/* Added index to key */}
                <Typography className="mb-3 text-xl font-bold text-white">
                  {title}
                </Typography>
                {items.map(({ name, href }) => (
                  <li key={name}>
                    <Link href={href} passHref>
                      <Typography
                        as="div"
                        color="gray"
                        className="py-1.5 font-normal text-white transition-colors hover:underline"
                      >
                        {name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-white md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://Thebuildingestimator.com /" target="_blank" rel="noopener noreferrer">
              Thebuildingestimator.com{" "}
            </a>
            . All Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-white sm:justify-center">
            <a
              href="https://www.facebook.com/thebuildingestimator/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/thebuildingestimator/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/BuildEstimator/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/the-building-estimator/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
