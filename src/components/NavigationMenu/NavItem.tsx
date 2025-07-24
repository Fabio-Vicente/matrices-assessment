"use client";

import React from "react";
import Image from "next/image";
import { useNavigation } from "@/providers/NavigationProvider";
import { NavKey } from "@/common/types";
import { navPages } from "@/common/params";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { selectCounterByFolder } from "@/store/messagesSlice";

interface PropTypes {
  page: NavKey;
}

export default function NavItem({ page }: PropTypes) {
  const { currentPage, navigateTo } = useNavigation();
  const messagesCounter = useAppSelector((state) =>
    page === "inbox" || page === "spam" ? selectCounterByFolder(state, page) : 0
  );

  return (
    <button
      onClick={() => navigateTo(page)}
      className={clsx(
        "py-1.5 pr-3 pl-4 rounded-full flex gap-4 w-full items-center",
        {
          "bg-[#d3e3fd]": currentPage === page,
          "hover:bg-[#e5e7eb]": currentPage !== page,
        }
      )}
    >
      <Image src={navPages[page].iconPath} alt={page} width={20} height={20} />
      <span
        className={clsx("text-sm flex-1 text-left", {
          "font-semibold": currentPage === page,
        })}
      >
        {navPages[page].label}
      </span>
      {messagesCounter > 0 && (
        <span className="text-xs">{messagesCounter}</span>
      )}
    </button>
  );
}
