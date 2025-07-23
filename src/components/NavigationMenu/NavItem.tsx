"use client";

import React from "react";
import Image from "next/image";
import { useNavigation } from "@/providers/NavigationProvider";
import { NavKey } from "@/common/types";
import { navPages } from "@/common/params";
import clsx from "clsx";

interface PropTypes {
  page: NavKey;
}

export default function NavItem({ page }: PropTypes) {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <button
      onClick={() => navigateTo(page)}
      className={clsx("py-1.5 pr-3 pl-4 rounded-full flex gap-4 w-full", {
        "bg-[#d3e3fd]": currentPage === page,
        "hover:bg-[#e5e7eb]": currentPage !== page,
      })}
    >
      <Image src={navPages[page].iconPath} alt={page} width={20} height={20} />
      <span
        className={clsx("text-sm", {
          "font-semibold": currentPage === page,
        })}
      >
        {navPages[page].label}
      </span>
    </button>
  );
}
