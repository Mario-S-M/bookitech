"use client";
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
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [profile, setProfile] = useState<{
    name: string | null;
    email: string | null;
  }>({
    name: null,
    email: null,
  });
  const firstName = (profile.name ?? "").trim().split(/\s+/)[0] || null;
  const firstInitial = firstName
    ? firstName.charAt(0).toUpperCase()
    : (profile.name?.trim().charAt(0).toUpperCase() ?? "M");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          name: string | null;
          email: string | null;
        };
        if (mounted) setProfile(data);
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
  };

  if (isDashboard) {
    // Dashboard navbar: keep logo and theme, replace menu and login with avatar dropdown
    return (
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <HeroUINavbar
          maxWidth="xl"
          position="static"
          shouldHideOnScroll={false}
          isBlurred={false}
        >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/dashboard"
              >
                <BookOpenText />
                <p className="font-bold text-inherit">Bookitech</p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden md:flex basis-1/5 md:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden md:flex gap-6 items-center">
              <ThemeSwitch />
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    size="sm"
                    aria-label={profile.name || "Mi cuenta"}
                    title={profile.name || "Mi cuenta"}
                  >
                    {firstInitial}
                  </Avatar>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones de perfil" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">
                      Bienvenido{firstName ? ` ${firstName}` : ""}
                    </p>
                    {profile.email ? (
                      <p className="text-default-500 text-sm">
                        {profile.email}
                      </p>
                    ) : null}
                  </DropdownItem>
                  <DropdownItem key="settings">Configuración</DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={handleLogout}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  size="sm"
                  aria-label={profile.name || "Mi cuenta"}
                  title={profile.name || "Mi cuenta"}
                >
                  {firstInitial}
                </Avatar>
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones de perfil" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">
                    Bienvenido{firstName ? ` ${firstName}` : ""}
                  </p>
                  {profile.email ? (
                    <p className="text-default-500 text-sm">{profile.email}</p>
                  ) : null}
                </DropdownItem>
                <DropdownItem key="settings">Configuración</DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </HeroUINavbar>
      </div>
    );
  }

  // Default (landing) navbar
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
