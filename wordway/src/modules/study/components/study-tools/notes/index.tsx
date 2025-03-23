import {
  Container,
  ContainerContent,
} from "@/modules/common/components/container";
import { NotebookPenIcon } from "lucide-react";

export function Notes() {
  return (
    <div>
      <Container>
        <ContainerContent className="flex flex-col items-center py-6">
          <NotebookPenIcon />
          <p>No notes yet</p>
          <p>Select a verse to add your first note</p>
        </ContainerContent>
      </Container>
    </div>
  );
}
