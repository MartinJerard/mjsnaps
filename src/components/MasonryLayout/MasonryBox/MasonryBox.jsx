// import styles of this component
import styles from "./MasonryBox.module.css";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import tw from "twin.macro";
import ImageGallery from 'react-image-gallery';

export const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;


// MasonryBox component
const MasonryBox = ({ wallSrc, slug, title, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <div className={styles["my-masonry"]}>      
      <img src={wallSrc} style={{ width: "100%" }} alt="" />
      <div className={`${styles["my-masnry-description-top"]} flex`}>
        <div
            className={`${styles["my-masnry-user-prof-desc"]} flex flex-column`}
          >
            <h1>{title}</h1>
          </div>
          </div>
      <div className={`${styles["my-masnry-description"]} flex`}>
        <div
          className={`${styles["my-masnry-user-box"]} flex align-items-center`}
        >
          <div className={styles["my-masnry-user-prof"]}>
            <button type="button" onClick={() => setIsOpen(true)}>
            <h1>Open Album</h1>
            </button>
            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex].url}
                nextSrc={images[(photoIndex + 1) % images.length].url}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length].url
                }
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + images.length - 1) % images.length
                  )
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % images.length)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
    // </a>
  );
};

// validate MasonryBox component
MasonryBox.propTypes = {
  wallSrc: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MasonryBox;
