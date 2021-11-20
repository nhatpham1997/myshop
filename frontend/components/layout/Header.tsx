import Image from "next/image";
import Cart from "../Icons/Cart";
import Search from "../Icons/Search";
import User from "../Icons/User";
import Link from "next/link";
import MenuIcon from "../Icons/MenuIcon";
import CloseIcon from "../Icons/CloseIcon";
import { useState } from "react";
import MobileNav from "./MobileNav";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between px-4 py-4 md:justify-around md:px-0 md:py-0">
                <div className="relative flex items-center">
                    <Image
                        src={"/images/logo1.png"}
                        alt="Logo image"
                        width={103}
                        height={26}
                    />
                </div>
                <div className="hidden md:block">
                    <ul className="flex justify-between items-center space-x-6 py-8">
                        <li>
                            <Link href={"/"}>
                                <a>Trang Chủ</a>
                            </Link>
                        </li>
                        <li className="group relative hover:cursor-pointer transform">
                            <a>Sản Phẩm</a>
                            <div className="group-hover:block transition-all group-hover:translate-y-0 duration-500 ease-in-out absolute hidden h-auto">
                                <ul className="top-0 w-max px-4 shadow rounded-md">
                                    <li className="py-2">Các loại sản phẩm</li>
                                    <li className="py-2">Các loại sản phẩm</li>
                                    <li className="py-2">Các loại sản phẩm</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link href={"/"}>Hệ Thống Cửa Hàng</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Giới Thiệu</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-6">
                    <Link href={"/"}>
                        <Search />
                    </Link>
                    <Link href={"/"}>
                        <User />
                    </Link>
                    <Link href={"/"}>
                        <Cart />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center z-20 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen === false ? <MenuIcon /> : <CloseIcon />}
                    </button>
                </div>
            </div>
            {isMenuOpen === true ? <MobileNav /> : ""}
        </div>
    );
};

export default Header;
