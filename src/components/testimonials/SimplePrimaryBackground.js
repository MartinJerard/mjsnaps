import React, {useState} from "react";
import moment from 'moment';
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as QuoteIconBase } from "images/quotes-l.svg"
import { useGetComments } from "../../useRequest";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";

const HeadingContainer = tw.div``;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 mb-4`;
const Heading = tw(SectionHeading)``;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;

const Testimonial = tw.div`px-6 py-12 sm:px-20 sm:py-16 focus:outline-none flex! flex-col justify-between h-full`
const QuoteContainer = tw.div`relative`
const QuoteIcon = tw(QuoteIconBase)`absolute opacity-15 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-primary-500`
const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`
const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex flex-col`
const CustomerName = tw.span`text-lg font-semibold`
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`


export default ({
  heading = "Blog Comments",
}) => {
  const { data, isSuccess } = useGetComments();


  return (
      <ContentWithPaddingXl>
        <HeadingContainer>
          <Heading>{heading}</Heading>
        </HeadingContainer>
          {isSuccess && data.map((comment, index) => (
            <Testimonial key={index}>
              <TwoColumn>
              <Column>
              <CustomerInfoAndControlsContainer>
                <CustomerNameAndProfileContainer>
                  <CustomerName>
                    {comment.name}
                  </CustomerName>
                  <CustomerProfile>
                  <IconWithText><DateIcon />{moment(comment.createdAt).format('MMM-DD, YYYY')}</IconWithText>
                  </CustomerProfile>
                </CustomerNameAndProfileContainer>
              </CustomerInfoAndControlsContainer>
              </Column>
              <Column>
              <QuoteContainer>
                <QuoteIcon />
                <Quote>
                  {comment.comment}
                </Quote>
              </QuoteContainer>
              </Column>
                </TwoColumn>
            </Testimonial>
          ))}
      </ContentWithPaddingXl>
  );
};
