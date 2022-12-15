// import styles of this component
import styles from "./MasonryLayout.module.css"

// import other react pkg to use
import Masonry from "react-masonry-css"

// import other component to use
import MasonryBox from './MasonryBox/MasonryBox';
import ImageGallery from 'react-image-gallery';

import "react-awesome-lightbox/build/style.css";
import Lightbox from "react-awesome-lightbox";

// MasonryLayout Component
const MasonryLayout = ({ data }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {data.map((item, index) => (
        <MasonryBox 
          key={index} 
          wallSrc={item.node.featuredImage.url} 
          slug={item.node.slug} 
          title={item.node.title} 
          images={item.node.postPics}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout