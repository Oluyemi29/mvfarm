"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Image from "next/image";
import { AuthContext } from "./ContextApi";
import { FaCartPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

const NavbarInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const Context = useContext(AuthContext);
  const pathName = usePathname();

  const { data: session, status } = useSession();
  const userName = session?.user.name;

  const profileName = userName?.includes(" ")
    ? userName.split(" ")[0]
    : userName;

  const mymenuItems = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/farm",
      label: "Farm",
    },
    {
      link: "/farm/request",
      label: "Request",
    },
    {
      link: "/farm/order",
      label: "Order",
    },
    {
      link: "/farm/cart",
      label: "Cart",
    },
  ];

  return (
    <Navbar
      className="bg-mainfaided shadow-md shadow-maindeep rounded-full"
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand className="w-max" as={Link} href={"/"}>
          <Image
            src={"/rabb.png"}
            alt="Rabbit"
            width={20}
            height={20}
            priority
            quality={95}
            className="rounded-md w-14 h-10"
          />
          <p className="font-bold text-maindeep ml-4">MV Farm</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem isActive={pathName === "/"}>
          <Link className="text-maindeep" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/farm"}>
          <Link className="text-maindeep" href="/farm">
            Farm
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === "/farm/request"}>
          <Link
            aria-current="page"
            className="text-maindeep"
            href="/farm/request"
          >
            Request
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.startsWith("/farm/cart")}>
          <Link color="foreground" className="text-maindeep" href="/farm/cart">
            Cart
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.startsWith("/farm/order")}>
          <Link color="foreground" className="text-maindeep" href="/farm/order">
            Order
          </Link>
        </NavbarItem>
        {status === "authenticated" && (
          <>
            <NavbarItem isActive={pathName.startsWith("/profile")}>
              <Link
                color="foreground"
                className="text-maindeep"
                href="/profile"
              >
                Profile
              </Link>
            </NavbarItem>
          </>
        )}
        {session?.user.role === "Admin" && (
          <NavbarItem isActive={pathName.startsWith("/admin")}>
            <Link color="foreground" className="text-maindeep" href="/admin">
              Admin
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {status === "authenticated" ? (
          <>
            <NavbarItem className="hidden md:block">
              <Dropdown className="bg-background text-foreground">
                <DropdownTrigger>
                  <div className="px-3 py-1.5 flex flex-row gap-2 border-2 border-maindeep rounded-xl cursor-pointer">
                    <Image
                      src={session?.user.image as string}
                      alt="Profile"
                      width={10}
                      height={10}
                      className="w-6 h-6 rounded-full"
                    />
                    <h1 className="md:block text-maindeep hidden">
                      {profileName}
                    </h1>
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-background"
                  aria-label="Static Actions"
                >
                  <DropdownItem
                    className="inline-flex gap-2"
                    key="profile"
                    as={Link}
                    href="/profile"
                  >
                    <div className="flex gap-2 flex-row items-center">
                      <Image
                        src={session?.user.image as string}
                        alt="Profile"
                        width={10}
                        height={10}
                        className="w-6 h-6 rounded-full"
                      />
                      <h1 className="text-maindeep">{profileName}</h1>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className="inline-flex gap-2"
                    key="cart"
                    as={Link}
                    href="/farm/cart"
                  >
                    <div className="flex gap-2 flex-row items-center">
                      <FaCartPlus className="text-maindeep" size={24} />
                      <h1 className="text-maindeep">Cart</h1>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className="inline-flex gap-2"
                    key="request"
                    as={Link}
                    href="/farm/request"
                  >
                    <div className="flex gap-2 flex-row items-center">
                      <FaCodePullRequest className="text-maindeep" size={24} />
                      <h1 className="text-maindeep">Request</h1>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    color="danger"
                    className="bg-red-700 text-white"
                    textValue="Lo"
                    key="dark"
                    onPress={() => signOut()}
                  >
                    <h1>Logout</h1>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem className="hidden md:block">
              <Badge
                as={Link}
                href={"/farm/cart"}
                size="sm"
                className="bg-maindeep text-white"
                content={Context?.cartNumber}
              >
                <Link href="/farm/cart">
                  <FaCartPlus className="text-maindeep" size={32} />
                </Link>
              </Badge>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link className="text-maindeep" href="/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                className="text-maindeep bg-transparent border-2 border-maindeep"
                href="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="md:hidden block">
          {isMenuOpen ? (
            <HiOutlineXMark
              size={32}
              className="text-maindeep"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          ) : (
            <IoMdMenu
              size={32}
              className="text-maindeep"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {mymenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full font-semibold text-maindeep"
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {session && session.user.role === "Admin" && (
          <NavbarItem>
            <Link className="font-semibold" href="/admin">
              Admin
            </Link>
          </NavbarItem>
        )}
        {userName ? (
          <>
            <NavbarItem>
              <Link className="font-semibold" href="/farm/profile">
                {profileName}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Badge
                as={Link}
                href={"/farm/cart"}
                size="sm"
                className=" text-maindeep flex flex-row gap-2"
                content={Context?.cartNumber}
              >
                <Link href="/farm/cart">
                  <p>Cart</p>
                  <FaCartPlus className="text-maindeep" size={32} />
                </Link>
              </Badge>
            </NavbarItem>
            <NavbarItem
              className="text-red-700 font-semibold"
              onClick={() => signOut()}
            >
              Log out
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link className="text-maindeep font-semibold" href="/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="text-maindeep font-semibold" href="/register">
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarInfo;
