import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { useQueryState } from "nuqs";
import { useVersions } from "@/lib/context/study-context";

export function VersionNavigation() {
  const versions = useVersions();
  const [versionName, setVersionName] = useQueryState("version", {
    shallow: false,
  });

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {versionName ? versionName : "Version"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-3 gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {versions.map((version) => (
            <li key={version.id}>
              <NavigationMenuLink onClick={() => setVersionName(version.name)}>
                {version.abbreviation}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
