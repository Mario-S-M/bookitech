import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { BookOpenText } from "lucide-react";
import { Button } from "@heroui/button";
import { LoginModal } from "./Auth/LoginModal";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <HeroUINavbar
        maxWidth="xl"
        position="static"
        shouldHideOnScroll={false}
        isBlurred={false}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarContent className="md:hidden" justify="start">
            <NavbarMenuToggle />
          </NavbarContent>
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <BookOpenText />
              <p className="font-bold text-inherit">Bookitech</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden md:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden md:flex basis-1/5 md:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden md:flex gap-8">
            <ThemeSwitch />

            <LoginModal />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <LoginModal />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link href={item.href} size="lg" color="foreground">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
