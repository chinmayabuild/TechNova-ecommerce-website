import React from "react";
import { Button } from "../ui/button";
import { FacebookIcon, TwitterIcon, Youtube } from "lucide-react";

const Footer = () => {
  // Define footer sections as an array for DRY (Don't Repeat Yourself) code
  const footerSections = [
    {
      title: "Features",
      links: [
        "Cool stuff",
        "Random feature",
        "Team feature",
        "Stuff for developers",
        "Another one",
        "Last time",
      ],
    },
    {
      title: "Resources",
      links: ["Resource", "Resource name", "Another resource", "Final resource"],
    },
    {
      title: "About",
      links: ["Team", "Locations", "Privacy", "Terms"],
    },
    {
      title: "Help",
      links: ["Support", "Help Center", "Contact Us"],
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: FacebookIcon, href: "#" },
    { icon: TwitterIcon, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  // Reusable link component
  const FooterLink = ({ text, href = "#" }) => (
    <li className="mb-2">
      <a
        href={href}
        className="border-b border-solid border-transparent hover:border-gray-500 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
      >
        {text}
      </a>
    </li>
  );

  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 py-8 sm:py-12 mt-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Sections */}
        <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4 gap-y-8">
          {footerSections.map((section) => (
            <div
              key={section.title}
              className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6  "
            >
              <h5 className="text-xl font-bold mb-6 dark:text-[#e9660d] ">
                {section.title}
              </h5>
              <ul className="list-none">
                {section.links.map((link) => (
                  <FooterLink key={link} text={link} />
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media Section */}
          <div className="px-4 mt-8 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left dark:text-white">
              Stay connected
            </h5>
            <div className="flex sm:justify-center xl:justify-start gap-2 ">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-[#e9660d] hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t dark:border-gray-700 gap-y-6">
          <div className="sm:w-full px-4 md:w-1/6">
            <strong className="dark:text-white">Sonix Store</strong>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4">
            <h6 className="font-bold mb-2 dark:text-white">Address</h6>
            <address className="not-italic mb-4 text-sm dark:text-gray-300">
             Cuttack, Odisha
              <br />
              754008, Banki
            </address>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4">
            <h6 className="font-bold mb-2 dark:text-white">@all rights protected </h6>
            <p className="mb-4 text-sm dark:text-gray-300">
              sonix <strong>pvt.lts</strong>.<br />
              <em>All are MIT License</em>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;