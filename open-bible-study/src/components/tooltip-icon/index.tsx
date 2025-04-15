import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TooltipIconProps = {
  text: string;
};

export function TooltipIcon({ text }: TooltipIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <InfoIcon size={18} />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
