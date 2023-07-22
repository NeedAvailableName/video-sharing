import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

function Landing() {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      window.location.href = "/home";
    }
  }, [isConnected]);

  return (
    <>
      <section className="relative bg-background-light dark:bg-black flex flex-col h-full justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-8">
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl text-text-light md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 dark:text-text-dark"
                data-aos="zoom-y-out"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Welcome to new era of Youtube
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <h2
                  className="text-xl text-gray-400 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  View amazing videos and share with all the world
                </h2>
                <div className="flex justify-center">
                  <ConnectButton
                    label="Connect Wallet"
                    accountStatus="address"
                    showBalance={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl text-gray-400 text-center"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            Powered by BKC Labs
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
