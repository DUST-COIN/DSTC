import Heading from "../components/Heading";

const cards = [
  {
    id: 1,
    title: "Weekly topics",
    desc: "The Dust DAO votes on topics to cover for seven days straight and people educate each other through posts and virtual meetings",
  },
  {
    id: 2,
    title: "Rewards",
    desc: "All contributors will be rewarded via Dust coins",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full col center gap-4">
      <Heading
        heading="Key Features"
        subHeading="Contribute and get rewarded"
        className="text-center"
      />
      <div className="row w-full justify-center gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-gradient-to-br from-white/10 col rounded-2xl items-start gap-4 py-6 px-4 md:flex-1"
          >
            <img
              className="w-16 h-w-16"
              src={`/assets/${card.id}.png`}
              alt={card.title}
            />
            <h4 className="font-redzone text-2xl">{card.title}</h4>
            <span className="">{card.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
