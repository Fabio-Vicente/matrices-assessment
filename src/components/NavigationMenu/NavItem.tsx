"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useNavigation } from "@/providers/NavigationProvider";
import { NavKey } from "@/common/types";
import { navPages } from "@/common/params";
import { classNames } from "@/utils/classes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messageViewingEnded,
  selectCounterByFolder,
} from "@/store/messagesSlice";

interface PropTypes {
  page: NavKey;
}

export default function NavItem({ page }: PropTypes) {
  const dispatch = useAppDispatch();
  const messagesCounter = useAppSelector((state) =>
    page === "inbox" || page === "spam"
      ? selectCounterByFolder(state.messages, page)
      : 0
  );
  const { currentPage, navigateTo } = useNavigation();

  const handleNavigation = useCallback(() => {
    dispatch(messageViewingEnded());
    navigateTo(page);
  }, [navigateTo, dispatch, page]);

  return (
    <button
      onClick={handleNavigation}
      className={classNames(
        "py-1.5 pr-3 pl-4 rounded-full flex gap-4 w-full items-center",
        {
          "bg-[#d3e3fd]": currentPage === page,
          "hover:bg-[#e5e7eb]": currentPage !== page,
        }
      )}
    >
      <Image src={navPages[page].iconPath} alt={page} width={20} height={20} />
      <span
        className={classNames("text-sm flex-1 text-left", {
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
