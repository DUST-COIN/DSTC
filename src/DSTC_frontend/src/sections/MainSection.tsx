import Button from "../components/Button";

export default function MainSection() {
  return (
    <section className="w-full flex flex-col md:flex-row center gap-8">
      <div className="text md:w-1/2 col gap-8">
        <h1 className="md:text-8xl text-5xl font-redzone">
          Spread a word about the Internet computer
        </h1>
        <span className=" leading-8 text-xl">
          Contribute by publishing articles and teaching others about the
          internet computer and earn dust coins. Learn the nitty gritties of ICP
          as you earn.
        </span>
        <div className="row gap-4">
          <Button>Start learning</Button>
          <Button outline={true}>Start teaching</Button>
        </div>
      </div>
      <div className="relative md:w-1/2 col gap-4 center">
        <div className="relative md:w-1/2 col gap-4 center">
          <div className="rounded-full overflow-hidden w-100 h-100 md:w-56 md:h-56">
            <img
              src="https://cdn.vectorstock.com/i/500p/23/83/dfinity-internet-computer-icp-token-symbol-vector-38102383.avif"
              alt="etherum_logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
