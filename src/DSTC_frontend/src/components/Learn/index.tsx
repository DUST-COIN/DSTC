import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  CardActions,
} from "@mui/material";
import { HttpAgent } from "@dfinity/agent";
import { Link } from "react-router-dom";
import { Favorite, Share } from "@mui/icons-material";
import {
  DSTC_backend,
  createActor,
} from "../../../../declarations/DSTC_backend";

import Button from "../Button";
import AppLogo from "../sub-components/AppLogo";
import ThemeControl from "../sub-components/ThemeControl";

const links: any[] = [];

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
        <h1>$Dust</h1>
        <div className="ml-24 hidden lg:flex flex-row flex-wrap gap-8">
          {links?.map((li, i) => (
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

const BlogCardsComponent: React.FC = () => {
  const [dusts, setDusts] = React.useState<any>([]);
  let actor = DSTC_backend;
  const agent: any = new HttpAgent();
  actor = createActor("kc5xa-pqaaa-aaaap-qhk3a-cai", { agent });

  async function fetchDusts() {
    let dusts = await actor.get_dusts();
    return dusts;
  }

  React.useEffect(() => {
    async function fetchData() {
      const fetchedDusts = await fetchDusts();
      setDusts(fetchedDusts);
    }
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4, width: "100vw", color: "#ffffff" }}>
      <Header />
      <Grid container spacing={4}>
        {dusts.map(([_, post]: any, id: number) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            {dusts.length < 1 && (
              <Typography
                variant="h5"
                align="center"
                sx={{ color: "white", mt: 4 }}
              >
                No dusts
              </Typography>
            )}
            <div
              key={id}
              className="bg-gradient-to-br from-white/10 col rounded-2xl items-start gap-4 py-6 px-4 md:flex-1"
            >
              <Box
                component={Link}
                to={`/learn/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#bb86fc" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                    {post.content?.slice(0, 100) + "..."}
                  </Typography>
                </CardContent>
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogCardsComponent;
