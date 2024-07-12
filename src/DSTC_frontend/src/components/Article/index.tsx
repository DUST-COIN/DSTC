import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import {
  DSTC_backend,
  createActor,
} from "../../../../declarations/DSTC_backend";
import { useParams } from "react-router-dom";
import { HttpAgent } from "@dfinity/agent";
import Button from "../Button";
import AppLogo from "../sub-components/AppLogo";
import ThemeControl from "../sub-components/ThemeControl";

const links = ["Learn", "contribute"];

const routes = {
  home: "learn",
  about: "contribute",
  contribute: "",
  collection: "",
  faq: "faq",
  popular: "popular",
  features: "features",
  promo: "promotion",
  footer: "footer",
};
const Links = Object.values(routes).map((r) => r);
function Header() {
  return (
    <header className="sticky w-full mt-2 py-4 px-1 min-h-16 row items-center justify-between gap-2">
      <div className="row items-center gap-2">
        <AppLogo
          onClick={() => window.location.assign("/")}
          className="cursor-pointer"
        />
        <div className="ml-24 hidden lg:flex flex-row flex-wrap gap-8">
          {links.map((li, i) => (
            <a
              key={i}
              href={`${Links[i]}`}
              className={`uppercase font-redzone`}
            >
              {li}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

const ArticleComponent: React.FC = () => {
  const { dustId } = useParams();
  const [dust, setDust] = React.useState<any>();
  let actor = DSTC_backend;
  const agent: any = new HttpAgent();
  actor = createActor("kc5xa-pqaaa-aaaap-qhk3a-cai", {
    agent,
  });

  async function fetchDust() {
    let dust = await actor.get_single_dust(
      parseInt(dustId as string) as unknown as bigint
    );

    return dust;
  }

  React.useEffect(() => {
    async function fetchData() {
      const fetchedDust: any = await fetchDust();
      setDust(fetchedDust?.Ok);
      console.log(`The dust is ${fetchedDust?.Ok?.title}`);
      console.log(`The dust is ${fetchedDust?.Err}`);
      console.log(`The dust is ${dust}`);
    }

    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4, width: "100vw", color: "#ffffff" }}>
      <Header />
      <Card
        sx={{
          p: 3,
          background: "radial-gradient(circle at top right, #4e4676, #9083ba)",
          color: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#bb86fc", fontWeight: "bold" }}
          >
            {dust?.title}
          </Typography>
          <Box mt={2}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {dust?.content}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ArticleComponent;
