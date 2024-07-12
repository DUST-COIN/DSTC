import Heading from "../components/Heading";
import AppLogo from "../components/sub-components/AppLogo";
import { SectionProps } from "../types";

const tags = ["Humour", "Funny", "Stories", "Lively"];

export default function AboutSection() {
  return (
    <>
      <section className="w-full flex flex-col-reverse md:flex-row-reverse items-center">
        <div className="text md:w-1/2 col gap-4 my-2">
          <Heading
            className="max-w-[90%]"
            heading="About Dust"
            subHeading="Humour on the blockchain"
          />
          <span className=" leading-8 text-xl">
            The cryptocurrency that adds a spark of laughter to the blockchain.
          </span>
          <div className="row gap-2">
            {tags.map((tag, i) => (
              <button
                key={i}
                className="rounded-full px-4 py-3 bg-white/20 hover:bg-white/30"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 my-2 h-full">
          <img
            src="/assets/robo.png"
            alt="robo"
            className="object-contain max-w-[80%] max-h-[90%] mx-auto"
          />
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>

      <section className="w-full flex flex-col-reverse md:flex-row-reverse items-center">
        <div className="text md:w-1/2 col gap-4 my-2">
          <Heading
            className="max-w-[90%]"
            heading="$Dust Coin"
            subHeading="A utility token to incentivize users"
          />
          <span className=" leading-8 text-xl">
            Utility token on the Dust platform that incentivizes the community.
          </span>
          <div className="row gap-2">
            {tags.map((tag, i) => (
              <button
                key={i}
                className="rounded-full px-4 py-3 bg-white/20 hover:bg-white/30"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 my-2 h-full">
          <AppLogo />
        </div>
      </section>
    </>
  );
}
