import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDownOffAltOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api/api";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import { Button, Buttons, Channel, ChannelCounter, ChannelDetail, ChannelInfo, ChannelName, Container, Content, Description, Details, Hr, Image, Info, Subscribe, Title, VideoWrapper } from "./Video.styled";

const Video = () => {
  const params = useParams();
  const id = params.id;
  const { currentUser } = useSelector((state) => state.user);

  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [isSub, setIsSub] = useState(true);
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`${API_URL}/videos/find/${id}`);
      setVideo(res.data);
    };
    fetchVideo();
  }, [id]);

  useEffect(() => {
    if (video.userId) {
      const fetchChannel = async () => {
        const res = await axios.get(`${API_URL}/users/find/${video.userId}`);
        setChannel(res.data);
      };
      fetchChannel();
    }
  }, [video]);

  useEffect(() => {
    if (video.userId !== undefined) {
      if (currentUser && currentUser._id !== video.userId) {
        setIsUser(false);
      }
    } else {
      setIsUser(true);
    }
  }, [video]);

  const sub = () => {
    const fetchSubscribe = async () => {
      await axios.put(`${API_URL}/users/sub/${channel._id}`);
    };
    fetchSubscribe();
    setIsSub(!isSub);
  };

  const unsub = () => {
    const fetchSubscribe = async () => {
      await axios.put(`${API_URL}/users/unsub/${channel._id}`);
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
            {isUser && (
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
