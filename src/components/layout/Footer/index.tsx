import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import { SocialNetworks } from "./footer.types";
import { FaFacebookF, FaInstagram, FaTwitter, FaSnapchat, FaYoutube, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  { id: 1, icon: <FaSnapchat />, url: "https://www.snapchat.com/add/luxygalleria" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com" },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://www.instagram.com/laan.atelier?utm_source=qr&igsh=bW1tN2Z5azgwc2dq",
  },
  {
    id: 5,
    icon: <FaFacebook />,
    url: "https://www.facebook.com/share/1BLZJWnKyP/?mibextid=wwXIfr",
  },
  {
    id: 6,
    icon: <FaYoutube />,
    url: "https://youtube.com/@luxysnackstation?si=oqzX6swsa1f5hYBz",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#f8f5f0]" />
      </div>
      <div className="pt-8 md:pt-[50px] bg-[#f8f5f0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-5 lg:max-w-[480px]">
              <div className="mb-6 -ml-10">
                <Image
                  src="/uploaded-logo.png"
                  alt="LaaN Atelier Logo"
                  width={100}
                  height={100}
                  className="w-auto h-auto max-h-[80px] object-contain object-left"
                />
              </div>
              <p className="text-brand/60 text-sm mb-9 leading-relaxed">
                LaaN Atelier is a premium furniture and interior design studio based in Kochi, Kerala. We specialize in bespoke furniture, custom interiors, and handcrafted design solutions that blend functionality, craftsmanship, and timeless aesthetics. With a passion for detail and quality, we transform spaces into elegant living experiences.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-brand hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-brand/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex col-span-7 justify-end gap-16 xl:gap-32 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>
          <hr className="h-[1px] border-t-brand/10 mb-6" />
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;