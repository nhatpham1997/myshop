import Image from "next/image";

const Support = () => {
    return (
        <div className="flex justify-center space-x-8 py-10">
            <div className="flex space-x-4">
                <div className="transform hover:scale-125">
                    <Image
                        src={"/images/support-1.png"}
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Free Shipping</h4>
                    <h5>Free shipping on all order</h5>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="transform hover:scale-125">
                    <Image
                        src={"/images/support-2.png"}
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Support 24/7</h4>
                    <h5>Free shipping on all order</h5>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="transform hover:scale-125">
                    <Image
                        src={"/images/support-3.png"}
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Money Return</h4>
                    <h5>Free shipping on all order</h5>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="transform hover:scale-125">
                    <Image
                        src={"/images/support-4.png"}
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Order Discount</h4>
                    <h5>Free shipping on all order</h5>
                </div>
            </div>
        </div>
    );
};

export default Support;
