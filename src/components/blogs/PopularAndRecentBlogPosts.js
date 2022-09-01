import React from "react";
import moment from 'moment';
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { useGetPostsTwoFeaturedPost } from "../../useRequest";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;
const AuthorTextInfo = tw.div`text-xs text-gray-600`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``

export default () => {
  const { data, isSuccess } = useGetPostsTwoFeaturedPost();

  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>Featured Posts</Heading>
            <PostsContainer>
              {isSuccess && data.featured.map((post, index) => (
                <Post key={index} href={`blogs/${post.slug}`} className="group" initial="rest" whileHover="hover" animate="rest">
                  <Image
                    transition={{ duration: 0.3 }}
                    variants={postBackgroundSizeAnimation}
                    imageSrc={post.featuredImage.url}
                  />
                  <Title>{post.title}</Title>
                  <Description>{post.excerpt}</Description>
                  <AuthorInfo>
                    <AuthorTextInfo>
                    <IconWithText><LocationIcon />{post.location}</IconWithText>
                    <IconWithText><DateIcon />{moment(post.visitedOn).format('MMM YYYY')}</IconWithText>
                  </AuthorTextInfo>
                  </AuthorInfo>
                </Post>
              ))}
            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Recent Posts</Heading>
            <PostsContainer>
              {isSuccess && data.normal.map((post, index) => (
              <Post key={index} href={`blogs/${post.slug}`} className="group">
                <PostTextContainer>
                  <Title>{post.title}</Title>
                  <AuthorName>
                  <IconWithText><LocationIcon />{post.location}</IconWithText>
                    <IconWithText><DateIcon />{moment(post.visitedOn).format('MMM YYYY')}</IconWithText>
                  </AuthorName>
                </PostTextContainer>
                <Image imageSrc={post.featuredImage.url} />
              </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
};
