import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function PasswordInput(props: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input {...props} type={showPassword ? "text" : "password"} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={toggleShowPassword}
            type="button"
            className="absolute right-0 top-0"
            variant="link"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{showPassword ? "Conceal" : "Reveal"}</TooltipContent>
      </Tooltip>
    </div>
  );
}
