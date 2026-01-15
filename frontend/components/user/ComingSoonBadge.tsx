import React from "react";
import { Badge } from "../ui/badge";

const ComingSoonBadge = () => {
  return (
    <Badge
      variant="destructive"
      className="
        absolute -top-0.5 -right-2
        px-1.5 py-px
        text-[10px] font-medium
        leading-none
        rounded-sm
        opacity-90
        text-white
        w-fit
      "
    >
      Coming Soon
    </Badge>
  );
};

export default ComingSoonBadge;
