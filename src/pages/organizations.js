/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";
import { CardActionArea } from "@mui/material";

import { getOrganizations } from "../services/organizations";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    color: black;
  }
`;

function Organizations() {
  const [page, setPage] = useState(1);
  const [organizations, setOrganizations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchOrganizations = async () => {
    setTimeout(async () => {
      const { data } = await getOrganizations(page);
      setPage(data[data.length - 1].id);
      setOrganizations(() => {
        return [...organizations, ...data].sort((a , b) => {
          if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
          if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
          return 0;
        });
      });
    }, 1000);
  }

	useEffect(() => {
    fetchOrganizations();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (Math.ceil(window.innerHeight + scrollTop) !== offsetHeight || isFetching) {
      return false;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchOrganizations();
    setIsFetching(false);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 5, marginLeft: "40%" }}>
        Github Organizations
      </Typography>
      <Container>
        {organizations.length ? (
          organizations.map(({ id, login, avatar_url, description }) => (
            <Card
              key={id}
              sx={{ width: 300, height: 300, marginRight: 5, marginBottom: 5 }}
            >
              <Link to={`/organization/${login}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={avatar_url}
                    alt="organization image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {login}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description ? description : "This organization doesn't have description"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))
        ) : (
          <CircularProgress />
        )}
        {isFetching && (
          <Typography variant="h6">Loading more organizations...</Typography>
        )}
      </Container>
    </>
  );
};

export default Organizations;
