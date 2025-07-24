import { navPages } from "@/common/params";
import { NavKey } from "@/common/types";
import NavItem from "./NavItem";
import Placeholder from "./Placeholder";

export default function NavigationMenu() {
  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-4 px-3">
      <Placeholder />
      <ul role="list">
        {Object.keys(navPages).map((page) => (
          <li key={page} role="listitem">
            <NavItem page={page as NavKey} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
