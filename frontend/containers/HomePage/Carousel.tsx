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
            <div className="flex justify-center w-screen h-screen bg-blue-400">
                <div className="max-w-7xl flex items-center w-screen h-screen">
                    <div className="space-y-6">
                        <div className="text-4xl font-semibold">
                            Smart Products
                        </div>
                        <div className="text-6xl font-medium">
                            Summer Offer 2020 Collection
                        </div>
                        <button className="relative px-12 py-4 border-2 hover:bg-purple-500">
                            Shop Now
                        </button>
                    </div>
                    <div className="relative h-full w-full">
                        <Image
                            src={"/images/single-slide-1.png"}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-screen h-screen bg-blue-400">
                <div className="max-w-7xl flex items-center w-screen h-screen">
                    <div className="space-y-6">
                        <div className="text-4xl font-semibold">
                            Smart Products
                        </div>
                        <div className="text-6xl font-medium">
                            Summer Offer 2020 Collection
                        </div>
                        <button className="px-12 py-4 border-2 hover:bg-purple-500">
                            Shop Now
                        </button>
                    </div>
                    <div className="relative h-full w-full">
                        <Image
                            src={"/images/single-slide-hm1-2.png"}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default CCarousel;
