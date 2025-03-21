"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/common/components/ui/card";
import { Bible } from "../components/bible";
import { BibleNavigation } from "../components/bible-navigation";

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
        <CardHeader className="p-0">
          <CardTitle>Study Tools</CardTitle>
        </CardHeader>
        <CardContent className="p-0"></CardContent>
      </Card>
    </div>
  );
}
