import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
// import SliderCards from "components/cards/ThreeColSlider.js";
import SliderCards from "components/cards/ThreeColSliderGallery";
import ImageGallery from 'react-image-gallery';
import { ContentWithVerticalPadding, ContentWithPadding } from "components/misc/Layouts.js";
import { useGetGalleryDetails } from "../useRequest";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";
import Lightbox from "yet-another-react-lightbox";


const Container = tw.div`relative`;
const HeadingContainer = tw.div``;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);
const ComponentPreviewLink = tw.a`mt-4 sm:mt-0 text-primary-500 hocus:text-primary-900 transition duration-300 font-semibold flex items-center items-center`;
const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-16 max-w-screen-2xl mx-auto sm:px-8`;


const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-full`,
]);

const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
const Value = tw.div`font-bold text-primary-500`
const Key = tw.div`font-medium text-gray-700`
const ImageContainer = tw.div`relative z-40 transform xl:-translate-x-24 xl:-translate-y-16`;
const Image1 = tw.img`max-w-full w-96 rounded-t sm:rounded relative z-20 place-items-center`;


export default () => {
  const [open, setOpen] = React.useState(false);
  const { postName } = useParams()
  const { data, isSuccess } = useGetGalleryDetails(postName);

  let images = isSuccess ? data.postPics.map(value=> {
    return {src: value.url}
  }) : []
console.log(JSON.stringify(images))
  return (
    isSuccess && 
      <>
    <ContentWithVerticalPadding>
    <TextContent>
            <Heading>{data.title}</Heading>
            <Description>{data.excerpt}</Description>
          </TextContent>
    <button type="button" onClick={() => setOpen(true)}>
        Open Lightbox
      </button>
<Lightbox
  open = {open}
  close={() => setOpen(false)}
  slides={images}
  />
                <TextContent>
          
              <ComponentPreviewLink className="group" href="/thank-you">
                Have something to say, Leave it here{" "}
                <ArrowRightIcon tw="transition duration-300 transform group-hover:translate-x-px ml-2 w-4 h-4" />
              </ComponentPreviewLink>
              </TextContent>
                </ContentWithVerticalPadding>
        <SliderCards />
    </>
  );
};
