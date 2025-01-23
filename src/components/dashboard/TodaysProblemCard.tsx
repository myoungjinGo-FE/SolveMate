import { ROUTES } from "@/constants/routes";
import { Progress } from "@/components/ui/progress";
import { Code2, BarChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/users";
import Link from "next/link";

interface TodaysProblemCardProps {
  user: User | null;
}

export function TodaysProblemCard({ user }: TodaysProblemCardProps) {
  return (
    <div className="grid gap-6">
      {/* 오늘의 문제 카드 */}
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">오늘의 문제</CardTitle>
          <Code2 className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold mb-2">배열에서 중복 제거하기</h2>
          <p className="text-sm opacity-90 mb-4">
            난이도: 중급 | 예상 시간: 30분
          </p>
          {user ? (
            <Button size="sm" variant="secondary">
              문제 풀기
            </Button>
          ) : (
            <Link href={ROUTES.AUTH.LOGIN}>
              <Button size="sm" variant="secondary">
                로그인하고 풀기
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* 주간 통계 카드 */}
      {user && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">주간 통계</CardTitle>
            <BarChart className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">71%</div>
            <Progress value={71} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              이번 주 5/7 문제 해결
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
