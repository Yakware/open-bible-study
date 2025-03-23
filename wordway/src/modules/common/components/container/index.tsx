import * as React from "react";

import { cn } from "@/utils/cn";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("w-full bg-background p-6 rounded-lg max-w-lg", className)}
      {...props}
    />
  );
}

function ContainerTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="container-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function ContainerContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container-content"
      className={cn("text-gray-500", className)}
      {...props}
    />
  );
}

export { Container, ContainerTitle, ContainerContent };
