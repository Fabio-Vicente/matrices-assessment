"use client";

import { navPages } from "@/common/params";
import { NavKey } from "@/common/types";
import { useNavigation } from "@/providers/NavigationProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  messageViewingEnded,
  selectCounterByFolder,
} from "@/store/messagesSlice";
import { classNames } from "@/utils/classes";
import Image from "next/image";
import { useCallback } from "react";

interface PropTypes {
  page: NavKey;
}

export default function NavItem({ page }: PropTypes) {
  const dispatch = useAppDispatch();
  const messagesCounter = useAppSelector((state) =>
    page === "inbox" || page === "spam"
      ? selectCounterByFolder(state.messages, page)
      : 0,
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
        "flex w-full items-center gap-4 rounded-full py-1.5 pr-3 pl-4",
        {
          "bg-Theme-Selected": currentPage === page,
          "hover:bg-Theme-Hover": currentPage !== page,
        },
      )}
    >
      <Image src={navPages[page].iconPath} alt={page} width={20} height={20} />
      <span
        className={classNames("flex-1 text-left text-sm", {
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
