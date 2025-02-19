import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const images = imageUrls.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  return <ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />;
};


export default ImageCarousel;
