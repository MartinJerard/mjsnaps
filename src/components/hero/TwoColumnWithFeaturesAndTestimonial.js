import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import { Container, ContentWithVerticalPadding, ContentWithPadding } from "components/misc/Layouts.js";
import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import { ReactComponent as QuotesLeftIconBase } from "images/quotes-l.svg"
import { ReactComponent as SvgDecoratorBlob1 } from "images/dot-pattern.svg"
// import MyImage  from "images/IMG_8983.jpg"
import { useGetBlogDP } from "../../useRequest";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";


const Header = tw(HeaderBase)`max-w-none`;
const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-16 max-w-screen-2xl mx-auto sm:px-8`;
const Column = tw.div``;
const TextColumn = tw(Column)`mr-auto lg:mr-0 max-w-lg lg:max-w-xl xl:max-w-2xl`;
const Heading = tw(SectionHeading)`text-left text-primary-900 leading-snug xl:text-6xl`;
const Description = tw(SectionDescription)`mt-4 lg:text-base text-gray-700 max-w-lg`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-8 inline-block w-56 tracking-wide text-center py-5`;
const FeatureList = tw.ul`mt-12 leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`ml-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-32`;
const ImageContainer = tw.div`relative z-40 transform xl:-translate-x-24 xl:-translate-y-16`;
const Image = tw.img`max-w-full w-96 rounded-t sm:rounded relative z-20`;
const Offsetbackground = tw.div`absolute inset-0 bg-gray-300 rounded xl:-mb-8`
const ImageDecoratorBlob = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none z-10 absolute right-0 bottom-0 transform translate-x-10 translate-y-10 h-32 w-32 opacity-25 text-gray-900 fill-current`}
`;
const Testimonial = tw.div`max-w-sm rounded-b md:rounded-none relative sm:absolute bottom-0 inset-x-0 z-20 px-8 py-6 sm:px-10 sm:py-8 bg-primary-900 text-gray-400 font-medium transform md:-translate-x-32 text-sm leading-relaxed md:-mr-16 xl:mr-0`
const QuotesLeftIcon = tw(QuotesLeftIconBase)`w-16 h-16 md:w-12 md:h-12 absolute top-0 left-0 text-gray-100 md:text-red-500 transform translate-x-1 md:-translate-x-1/2 md:-translate-y-5 opacity-10 md:opacity-100`
const Quote = tw.blockquote``
const CustomerName = tw.p`mt-4 font-bold`
const CustomerCompany = tw.p`mt-1 text-sm text-gray-500`
const ComponentPreviewLink = tw.a`mt-4 sm:mt-0 text-primary-500 hocus:text-primary-900 transition duration-300 font-semibold flex items-center`;


export default ({
  heading = "About Author",
  description = "Welcome! Hope you are doing Fine!",
  descriptionLine1 = "Avid Traveller and Amateur Photographer, Using this space to share things I feel like sharing. Hope you have a good time around!",
  imageSrc = "",
  imageDecoratorBlob = true,
  primaryButtonUrl = "/thank-you",
  primaryButtonText = "Go to All Blog Posts",
  buttonRounded = true,
  features = ["Available in 7 Locations", "Premium Internet Backbone", "99.99% Uptime SLA"],
  testimonial = {
    quote: "Martin Jerard",
    customerName: "Martin Jerard",
    customerCompany: ""
  }
}) => {
  const buttonRoundedCss = buttonRounded && tw`rounded-full`;
  const { data , isSuccess } = useGetBlogDP();


  return (
      <Container>
        <Row>

        <PrimaryButton as="a" href="/blogs" css={buttonRoundedCss}>
                Blog Posts...
              </PrimaryButton>
              <PrimaryButton as="a" href="/gallery" css={buttonRoundedCss}>
                Gallery...
              </PrimaryButton>
        </Row>
        <ContentWithVerticalPadding>
          <Row>
            <TextColumn>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
              <Description>{descriptionLine1}</Description>
              <div tw="mt-12 text-center">
              <a
                  href="https://twitter.com/mj_desanthiri"
                  className="twitter-follow-button"
                  data-size="large"
                  data-show-count="false"
                  target="_blank" rel="noreferrer"
                  >
                  To Connect Follow @Twitter
                </a>
                </div>
              <ContentWithPadding>
              <ComponentPreviewLink className="group" href={primaryButtonUrl}>
                Should you have any comment, Leave Here{" "}
                <ArrowRightIcon tw="transition duration-300 transform group-hover:translate-x-px ml-2 w-4 h-4" />
              </ComponentPreviewLink>
              </ContentWithPadding>
              
              {/*<FeatureList>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    <FeatureIcon />
                    <FeatureText>{feature}</FeatureText>
                  </Feature>
                ))}
              </FeatureList> */}
            </TextColumn>
            <ImageColumn>
              <ImageContainer>
                {isSuccess && <Image src={data} />}
                {imageDecoratorBlob && <ImageDecoratorBlob />}
                <Testimonial>
                  <QuotesLeftIcon/>
                  {/* <Quote>{testimonial.quote}</Quote> */}
                  <CustomerName>{testimonial.customerName}</CustomerName>
                  <CustomerCompany>{testimonial.customerCompany}</CustomerCompany>
                </Testimonial>
              </ImageContainer>
              <Offsetbackground />
            </ImageColumn>
          </Row>
        </ContentWithVerticalPadding>
      </Container>
  );
};
