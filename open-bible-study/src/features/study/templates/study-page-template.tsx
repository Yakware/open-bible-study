"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bible } from "../components/bible";
import { BibleNavigation } from "../components/bible-navigation";
import { StudyTools } from "../components/study-tools";

export function StudyPageTemplate() {
  return (
    <div className="flex p-6">
      <Card className="p-4 flex-1 rounded rounded-br-none rounded-tr-none">
        <CardHeader className="p-0">
          <BibleNavigation />
        </CardHeader>
        <CardContent className="p-0">
          <Bible />
        </CardContent>
      </Card>

      <Card className="p-4 flex-1 max-w-sm rounded border-l-0 rounded-tl-none rounded-bl-none">
        <CardContent className="p-0">
          <StudyTools />
        </CardContent>
      </Card>
    </div>
  );
}
