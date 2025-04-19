import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChapterNotesList } from "../../../notes/components/chapter-notes-list";

export function StudyTools() {
  return (
    <Tabs defaultValue="notes" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        <TabsTrigger value="cross-references">Cross References</TabsTrigger>
      </TabsList>
      <TabsContent value="notes">
        <ChapterNotesList />
      </TabsContent>
      <TabsContent value="bookmarks"></TabsContent>
      <TabsContent value="cross-references"></TabsContent>
    </Tabs>
  );
}
