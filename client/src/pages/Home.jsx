import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../api/apiClient";
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
      const res = await apiClient.get(`/videos/${type}`);
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
