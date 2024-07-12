import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function MainSection() {
  return (
    <section className="w-full flex flex-col md:flex-row center gap-8">
      <div className="text md:w-1/2 col gap-8">
        <h1 className="md:text-8xl text-5xl font-redzone">
          $Dust is a cryptocurrency that intertwins humor and blockchain
        </h1>
        <span className=" leading-8 text-xl">
          One of the ways to earn $Dust is by sharing humorous stories on our
          platform
        </span>
        <div className="row gap-4">
          <Link to="learn">
            <Button>Read dusts</Button>
          </Link>

          <Link to="contribute">
            <Button outline={true}>Start sharing</Button>
          </Link>
        </div>
      </div>
      <div className="relative md:w-1/2 col gap-4 center">
        <div className="relative md:w-1/2 col gap-4 center">
          <div className="rounded-full overflow-hidden w-100 h-100 md:w-56 md:h-56">
            <img
              src="https://pbs.twimg.com/profile_images/1792489050097487873/QWiNQKDa_400x400.jpg"
              alt="etherum_logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
