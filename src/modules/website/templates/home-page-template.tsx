import { login, register } from "@/modules/auth/actions";
import { Button } from "@/modules/common/components/ui/button";
import { Card, CardContent } from "@/modules/common/components/ui/card";
import { BookIcon } from "@/modules/common/icons/book-icon";

export function HomePageTemplate() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="container mx-auto max-w-3xl">
        <CardContent className="flex gap-8">
          <div>
            <h3 className="text-2xl font-semibold">Digital Bible Study</h3>
            <p>Journey through Scripture with modern tools</p>
            <BookIcon size={300} />
          </div>
          <div className="w-1 bg-muted"></div>
          <div>
            <h3 className="text-2xl font-semibold">Begin Your Journey</h3>
            <p>Join thousands exploring Scripture together</p>

            <ul className="my-6 list-disc pl-8">
              <li>Personal Study Plans</li>
              <li>Community Discussion</li>
              <li>Verse Annotations</li>
            </ul>

            <Button onClick={register}>Sign Up for Free</Button>
            <div className="flex items-center gap-1">
              <p>Already have an account?</p>
              <Button variant="link" className="p-0" onClick={login}>
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
