"use client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/common/components/ui/card";
import { Bible } from "../components/bible";
import { BibleNavigation } from "../components/bible-navigation";
import { StudyTools } from "../components/study-tools";

export function StudyPageTemplate() {
  return (
    <div className="flex gap-6 p-6">
      <Card className="p-4 flex-1 rounded">
        <CardHeader className="p-0">
          <BibleNavigation />
        </CardHeader>
        <CardContent className="p-0 ">
          <Bible />
        </CardContent>
      </Card>

      <Card className="p-4 flex-1 max-w-sm rounded">
        <CardContent className="p-0">
          <StudyTools />
        </CardContent>
      </Card>
    </div>
  );
}
