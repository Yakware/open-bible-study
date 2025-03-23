import { buttonVariants } from "@/modules/common/components/ui/button";
import { BookTextIcon } from "lucide-react";
import Link from "next/link";
import { useVersionName } from "../bible-navigation/hooks/use-version-name";
import { TooltipIcon } from "@/modules/common/components/tooltip-icon";
import {
  Container,
  ContainerContent,
  ContainerTitle,
} from "@/modules/common/components/container";

export function NoVerseSelected() {
  const [versionName] = useVersionName();

  const fallbackVersion = "King+James+Version";
  const version = versionName || fallbackVersion;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-semibold">Select a verse to get started</h3>
      <Container>
        <ContainerTitle>Recently Read</ContainerTitle>
        <ContainerContent className="flex flex-col items-center justify-center py-10">
          <BookTextIcon size={60} />
          <p className="font-semibold">No reading history yet</p>
          <p>Select a passage to begin your journey</p>
        </ContainerContent>
      </Container>
      <Container>
        <ContainerTitle className="flex items-center gap-1">
          Popular Passages
          <TooltipIcon
            text={`The buttons in this section use the version you've currently selected. If no version is selected, then ${fallbackVersion.replaceAll(
              "+",
              " "
            )} is used.`}
          />
        </ContainerTitle>

        <ContainerContent className="flex flex-col gap-4 py-4">
          <div>
            <p className="mb-1 text-gray-600">Old Testament</p>
            <div className="flex gap-2">
              <Link
                href={`/study?version=${version}&book=Genesis&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                Genesis
              </Link>
              <Link
                href={`/study?version=${version}&book=Psalms&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                Psalms
              </Link>
              <Link
                href={`/study?version=${version}&book=Isaiah&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                Isaiah
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-1 text-gray-600">New Testament</p>
            <div className="flex gap-2">
              <Link
                href={`/study?version=${version}&book=Matthew&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                Matthew
              </Link>
              <Link
                href={`/study?version=${version}&book=John&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                John
              </Link>
              <Link
                href={`/study?version=${version}&book=Romans&chapter=1`}
                className={buttonVariants({ variant: "outline" })}
              >
                Romans
              </Link>
            </div>
          </div>
        </ContainerContent>
      </Container>
    </div>
  );
}
