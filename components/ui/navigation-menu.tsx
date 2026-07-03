"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { GridCard } from "@/components/ui/grid-card";

type NavItemType = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/72 outline-none transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/12 data-[state=open]:text-white",
        className,
      )}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-full right-0 z-50 mt-3 w-max max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-black/90 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl data-[motion=from-end]:slide-in-from-right-8 data-[motion=from-start]:slide-in-from-left-8 data-[motion=to-end]:slide-out-to-right-8 data-[motion=to-start]:slide-out-to-left-8 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-1/2 isolate z-50 flex -translate-x-1/2 justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl border border-white/10 bg-black/88 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col justify-center gap-1 rounded-xl px-4 py-3 text-sm text-white/72 outline-none transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-2 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm border-l border-t border-white/10 bg-black/88" />
    </NavigationMenuPrimitive.Indicator>
  );
}

function NavGridCard({
  link,
  ...props
}: React.ComponentProps<"a"> & {
  link: NavItemType;
}) {
  return (
    <NavigationMenuPrimitive.Link asChild>
      <GridCard {...props}>
        <div className="relative flex gap-3">
          {link.icon && <link.icon className="mt-0.5 size-5 text-cyan-100/80" />}
          <div>
            <span className="text-sm font-semibold text-white">{link.title}</span>
            {link.description && (
              <p className="mt-2 text-xs leading-5 text-white/50">{link.description}</p>
            )}
          </div>
        </div>
      </GridCard>
    </NavigationMenuPrimitive.Link>
  );
}

function NavSmallItem({
  item,
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
  item: Omit<NavItemType, "description">;
}) {
  return (
    <NavigationMenuLink className={cn("group relative h-max flex-row items-center gap-x-3", className)} {...props}>
      {item.icon && <item.icon />}
      <p className="text-sm">{item.title}</p>
      <div className="relative ml-auto flex h-full w-4 items-center">
        <ArrowRightIcon className="size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </NavigationMenuLink>
  );
}

function NavLargeItem({
  link,
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
  link: NavItemType;
}) {
  return (
    <NavigationMenuLink className={cn("group relative flex flex-col justify-center border border-white/10 bg-white/[0.04] p-0", className)} {...props}>
      <div className="flex items-center justify-between px-5 py-4">
        <div className="space-y-1">
          <span className="text-sm font-medium leading-none text-white">{link.title}</span>
          {link.description && <p className="line-clamp-1 text-xs text-white/50">{link.description}</p>}
        </div>
        {link.icon && <link.icon className="size-6 text-white/44" />}
      </div>
    </NavigationMenuLink>
  );
}

function NavItemMobile({
  item,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  item: NavItemType;
}) {
  return (
    <a
      className={cn(
        "group relative flex gap-x-2 rounded-xl p-2 text-sm text-white/72 outline-none transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
        className,
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
        {item.icon && <item.icon className="size-4" />}
      </div>
      <div className="flex h-10 flex-col justify-center">
        <p className="text-sm">{item.title}</p>
        <span className="line-clamp-1 text-xs leading-snug text-white/48">{item.description}</span>
      </div>
    </a>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
  type NavItemType,
};
