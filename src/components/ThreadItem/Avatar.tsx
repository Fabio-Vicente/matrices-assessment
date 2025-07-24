import { User } from "@/interfaces";
import { getInitialsUppercase } from "@/utils/string";

interface PropTypes {
  user: User;
}

export default function Avatar({ user }: PropTypes) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: user.color }}
    >
      {getInitialsUppercase(user.name)}
    </div>
  );
}
