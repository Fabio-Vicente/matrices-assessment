import { navPages } from "@/common/params";
import { NavKey } from "@/common/types";
import NavItem from "./NavItem";
import Placeholder from "./Placeholder";

export default function Nav() {
  return (
    <div className="flex max-w-[256px] flex-1 flex-col gap-4 px-3">
      <Placeholder />
      <div>
        {Object.keys(navPages).map((page) => (
          <NavItem key={page} page={page as NavKey} />
        ))}
      </div>
    </div>
  );
}
