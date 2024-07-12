import Heading from "../components/Heading";

const cards = [
  {
    id: 1,
    title: "Real value",
    desc: "We are partnering with ICPEX for liquidity and you'll be able to swap $Dust on ICPSWAP",
  },
  {
    id: 2,
    title: "Incentives",
    desc: "Earn $Dust by being an active member of our community",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full col center gap-4">
      <Heading
        heading="Why $Dust"
        subHeading="Humour on the blockchain"
        className="text-center"
      />
      <div className="row w-full justify-center gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-gradient-to-br from-white/10 col rounded-2xl items-start gap-4 py-6 px-4 md:flex-1"
          >
            <h4 className="font-redzone text-2xl">{card.title}</h4>
            <span className="">{card.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
