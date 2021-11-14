import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const CCarousel = () => {
    return (
        <Carousel
            arrows={true}
            responsive={responsive}
            ssr={true}
            showDots={false}
            infinite={true}
            autoPlaySpeed={3000}
        >
            <div>
                <Image
                    src={"/images/single-slide-1.png"}
                    width={100}
                    height={100}
                />
            </div>
            <div>
                <Image
                    src={"/images/single-slide-hm1-2.png"}
                    width={100}
                    height={100}
                />
            </div>
        </Carousel>
    );
};

export default CCarousel;
