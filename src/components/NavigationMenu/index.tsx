import React from "react";
import Placeholder from "./Placeholder";
import { navPages } from "@/common/params";
import NavItem from "./NavItem";
import { NavKey } from "@/common/types";

export default function Nav() {
  return (
    <div className="px-3 max-w-[256px] gap-4 flex flex-col">
      <Placeholder />
      <div>
        {Object.keys(navPages).map((page) => (
          <NavItem key={page} page={page as NavKey} />
        ))}
      </div>
    </div>
  );
}
