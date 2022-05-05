import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

import { getOrganization } from "../services/organizations";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

function Organization() {
  const [organization, setOrganization] = useState(null);
  const { org } = useParams();

  useEffect(() => {
    const fecthOrganization = async () => {
      const { data } = await getOrganization(org);
      setOrganization(data);
    };
    fecthOrganization();
  }, [org]);

  return (
    <>
      {organization ? (
        <Container>
          <Card sx={{ marginBottom: 10, marginTop: 10 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={organization.avatar_url}
                alt="organization image"
              />
              <CardContent>
                <Typography
                  sx={{ marginBottom: 5 }}
                  gutterBottom
                  variant="h3"
                  component="div"
                >
                  {organization.login}
                </Typography>
                <Typography
                  sx={{ marginBottom: 2 }}
                  variant="body1"
                  color="text.secondary"
                >
                  {organization.description
                    ? organization.description
                    : "This organization doesn't have description"}
                </Typography>
                <Typography
                  sx={{ marginBottom: 2 }}
                  variant="h6"
                  component="div"
                >
                  Public Repos: {organization.public_repos}
                </Typography>
                <Typography
                  sx={{ marginBottom: 2 }}
                  variant="h6"
                  component="div"
                >
                  Followers: {organization.followers}
                </Typography>
                <Typography
                  sx={{ marginBottom: 2 }}
                  variant="h6"
                  component="div"
                >
                  Following: {organization.following}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Link to="/">
            <Button sx={{ marginBottom: 5 }} variant="contained">
              Back
            </Button>
          </Link>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Organization;