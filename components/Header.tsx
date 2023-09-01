import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsNavOpen(false);
  }, [router.asPath]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="w-full md:w-[100%] h-[10%] py-6 md:py-[30px] bg-white flex-col justify-center items-center gap-8 md:gap-[50px] inline-flex">
      <div className="w-full md:w-[84.44%] py-2.5 px-5 md:px-0 justify-between items-center gap-3.5 inline-flex">
        <div className="w-[131px] text-zinc-900 text-xl font-semibold leading-normal">
          Your Name
        </div>

        <div className="md:hidden">
          <button
            className="p-2 rounded-md bg-gray-200 text-gray-800"
            onClick={toggleNav}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isNavOpen ? "block" : "hidden "
          } md:flex z-50 p-16 md:p-0 text-white md:text-zinc-900 justify-start items-start gap-3.5 fixed top-0 left-0 w-screen h-screen bg-gray-600 md:bg-white md:w-auto md:h-auto md:relative `}
        >
          <button
            className="md:hidden p-2 rounded-md bg-gray-200 text-gray-800 absolute right-5 top-5"
            onClick={toggleNav}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link href="/">
            <div className="p-2 justify-start items-start gap-2.5 flex">
              <div className="text-3xl md:text-xl font-normal leading-normal">
                Blog
              </div>
            </div>
          </Link>
          <div className="p-2 justify-start items-start gap-2.5 flex">
            <div className="text-3xl md:text-xl font-normal leading-normal">
              Projects
            </div>
          </div>
          <div className="p-2 justify-start items-start gap-2.5 flex">
            <div className="text-3xl md:text-xl font-normal leading-normal">
              About
            </div>
          </div>
          <div className="p-2 justify-start items-start gap-2.5 flex">
            <div className="text-3xl md:text-xl font-normal leading-normal">
              Newsletter
            </div>
          </div>
          <Link href="new-blog">
            <div className="p-2  bg-[#7F56D9] rounded-lg text-[#FFF] justify-start items-start gap-2.5 flex">
              <div className="text-3xl md:text-xl font-normal leading-normal">
                New blog
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full md:w-[84.44%] border-t border-b border-black border-opacity-30 justify-center items-center gap-16 md:gap-[260px] inline-flex ">
        <div className="text-zinc-900 text-[3em] md:text-[5em] font-bold">
          THE BLOG
        </div>
      </div>
    </div>
  );
};

export default Header;
