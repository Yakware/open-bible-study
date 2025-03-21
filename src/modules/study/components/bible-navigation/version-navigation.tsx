import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { parseAsInteger, useQueryState } from "nuqs";
import { useVersions } from "@/lib/context/study-context";

export function VersionNavigation() {
  const versions = useVersions();
  const [versionId, setVersionId] = useQueryState("version", {
    ...parseAsInteger,
    shallow: false,
  });

  const selectedVersion = versions.find((version) => version.id === versionId);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {selectedVersion ? selectedVersion.abbreviation : "Version"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-3 gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {versions.map((version) => (
            <li key={version.id}>
              <NavigationMenuLink onClick={() => setVersionId(version.id)}>
                {version.abbreviation}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
