import { getInitialsUppercase } from "@/utils/string";
import { User } from "@/interfaces";

interface PropTypes {
  user: User;
}

export default function Avatar({ user }: PropTypes) {
  return (
    <div
      className="h-10 w-10 rounded-full flex justify-center items-center text-white text-sm font-medium"
      style={{ backgroundColor: user.color }}
    >
      {getInitialsUppercase(user.name)}
    </div>
  );
}
