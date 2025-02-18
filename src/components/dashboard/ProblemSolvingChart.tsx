import { LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Button } from "../ui/button";
import { User } from "@/lib/types/users";
import Link from "next/link";
import { KAKAO_REDIRECT_URI } from "@/constants/config";

interface ProblemSolvingChartProps {
  user: User | null;
}

const chartData = [
  { month: "January", user: 5, memberA: 4, memberB: 6, memberC: 3 },
  { month: "February", user: 7, memberA: 6, memberB: 8, memberC: 5 },
  { month: "March", user: 10, memberA: 8, memberB: 9, memberC: 7 },
  { month: "April", user: 8, memberA: 7, memberB: 11, memberC: 6 },
  { month: "May", user: 12, memberA: 10, memberB: 13, memberC: 9 },
  { month: "June", user: 15, memberA: 12, memberB: 15, memberC: 11 },
];

const chartConfig = {
  user: {
    label: "나",
    color: "hsl(var(--chart-1))",
  },
  memberA: {
    label: "그룹원 A",
    color: "hsl(var(--chart-2))",
  },
  memberB: {
    label: "그룹원 B",
    color: "hsl(var(--chart-3))",
  },
  memberC: {
    label: "그룹원 C",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ProblemSolvingChart({ user }: ProblemSolvingChartProps) {
  if (!user) {
    return (
      <Card className="flex items-center justify-center h-[400px]">
        <CardContent className="text-center">
          <h3 className="text-2xl font-bold mb-4">로그인이 필요합니다</h3>
          <p className="text-muted-foreground mb-6">
            문제 해결 현황과 통계를 확인하려면 로그인해주세요.
          </p>
          <Link href={KAKAO_REDIRECT_URI}>
            <Button variant="default">
              <LogIn className="w-4 h-4 mr-2" />
              로그인하기
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>문제 해결 현황</CardTitle>
        <CardDescription>1월 - 6월 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] pt-0">
        <ChartContainer config={chartConfig} className="h-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="user"
              type="monotone"
              stroke="var(--color-user)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="memberA"
              type="monotone"
              stroke="var(--color-memberA)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="memberB"
              type="monotone"
              stroke="var(--color-memberB)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="memberC"
              type="monotone"
              stroke="var(--color-memberC)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
