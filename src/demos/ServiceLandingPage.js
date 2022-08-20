import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import { useGetPostsOneFeaturedPost } from "../useRequest";


const HighlightedText = tw.span`text-primary-500`


export default () => {

const { data, isSuccess } = useGetPostsOneFeaturedPost();

  return (
    <AnimationRevealPage>
      <Hero />
      {isSuccess && <Blog
        heading={<><HighlightedText>Blog Posts</HighlightedText></>}
        posts={[...data.featured, ...data.normal]}
        />
      }
</AnimationRevealPage>
  );
}
