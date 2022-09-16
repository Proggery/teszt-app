import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL } from "../api/api";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `${API_URL}/videos/${type}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video, index) => (
        <Card key={index} video={video} type={type} />
      ))}
    </Container>
  );
};

export default Home;
