import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDownOffAltOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const params = useParams();
  const id = params.id;
  let signinUser = localStorage.getItem("persist:root");
  signinUser = JSON.parse(signinUser);
  signinUser = JSON.parse(signinUser.user);
  signinUser = signinUser.currentUser;

  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [isSub, setIsSub] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`/videos/find/${id}`);
      setVideo(res.data);
    };
    fetchVideo();
  }, [id]);

  useEffect(() => {
    if (video.userId) {
      const fetchChannel = async () => {
        const res = await axios.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      };
      fetchChannel();
    }
  }, [video.userId]);

  useEffect(() => {
    if (signinUser._id !== video.userId) {
      setIsUser(!isUser);
    }
  }, [signinUser._id, video.userId]);

  const sub = () => {
    const fetchSubscribe = async () => {
      await axios.put(`/users/sub/${channel._id}`);
    };
    fetchSubscribe();
    setIsSub(!isSub);
  };

  const unsub = () => {
    const fetchSubscribe = async () => {
      await axios.put(`/users/unsub/${channel._id}`);
    };
    fetchSubscribe();
    setIsSub(!isSub);
  };

  const subscribe = () => {
    if (isSub) {
      return <Subscribe onClick={sub}>SUBSCRIBE</Subscribe>;
    } else {
      return <Subscribe onClick={unsub}>UNSUBSCRIBE</Subscribe>;
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="420"
            src={video.videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>{video.desc}</Info>
          <Buttons>
            {!isUser && (
              <>
                <Button>
                  <ThumbUpOutlined />
                  {video.likes && video.likes.length === 0 ? 0 : video.likes}
                </Button>
                <Button>
                  <ThumbDownOffAltOutlined />
                  {video.dislikes && video.dislikes.length === 0
                    ? 0
                    : video.dislikes}
                </Button>
              </>
            )}
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
            <ChannelDetail>
              <ChannelName>Clone YTube</ChannelName>
              <ChannelCounter>200K subscribers</ChannelCounter>
              <Description>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                animi accusantium dolores ipsam ut.
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {!isUser && subscribe()}
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
};

export default Video;
