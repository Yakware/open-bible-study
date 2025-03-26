import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/common/components/ui/tabs";

export function StudyTools() {
  return (
    <Tabs defaultValue="notes" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        <TabsTrigger value="cross-references">Cross References</TabsTrigger>
      </TabsList>
      <TabsContent value="notes">Notes tab</TabsContent>
      <TabsContent value="bookmarks">Bookmarks tab</TabsContent>
      <TabsContent value="cross-references">Cross references tab</TabsContent>
    </Tabs>
  );
}
