import React, { useState } from "react";
import moment from 'moment';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { useGetGallery } from "../useRequest";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";
import MasonryLayout from 'components/MasonryLayout/MasonryLayout';
import ContainerCard from 'components/ContainerCard/ContainerCard';


const HeadingRow = tw.div`flex justify-center`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const Container = tw(ContainerBase)`content-center`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-300 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default ({
  headingText = "Gallery",
}) => {
  const { data , isSuccess } = useGetGallery();
  const [visible, setVisible] = useState(10);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };
  return (
    <AnimationRevealPage>
      <Container>
        {/* <ContentWithPaddingXl> */}
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          {isSuccess &&   
          <div className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
          <ContainerCard>
            {          console.log(JSON.stringify(data))        }
              <MasonryLayout data={data.slice(0, visible)} />
          </ContainerCard>
        </div>
            // {data.slice(0, visible).map((post, index) => (
            //   <PostContainer key={index} featured={post.node.featuredPost}>
            //     <Post className="group" as="a" href={`blogs/${post.node.slug}`}>
            //       <Image imageSrc={post.node.featuredImage.url} />
            //       <Info>
            //         <Category><IconWithText><LocationIcon />{post.node.location}</IconWithText></Category>
            //         <CreationDate><IconWithText><DateIcon />{moment(post.node.visitedOn).format('MMM YYYY')}</IconWithText></CreationDate>
            //         <Title>{post.node.title}</Title>
            //         {post.node.featuredPost && post.node.excerpt && <Description>{post.node.excerpt}</Description>}
            //       </Info>
            //     </Post>
            //   </PostContainer>
            // ))}
          }
          {isSuccess && visible < data.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        {/* </ContentWithPaddingXl> */}
      </Container>
    </AnimationRevealPage>
  );
};
