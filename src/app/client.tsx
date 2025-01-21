"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  CheckCircle2,
  XCircle,
  LinkIcon,
  BarChart,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/constants/routes";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { User } from "@/lib/types/auth";
import { authAPI } from "@/lib/api/auth";
import { useAuth } from "@/hooks/userAuth";

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

interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
}

export default function Dashboard() {
  const { clearTokens } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const decoded: DecodedToken = jwtDecode(accessToken);
          const userData = await authAPI.getUserInfo(decoded.user_id);
          setUser(userData);
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    clearTokens();
    toast.success("로그아웃되었습니다.");
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">대시보드</h1>
          <p className="text-gray-500 mt-2">
            {user
              ? `안녕하세요, ${user.username}님!`
              : "로그인하고 더 많은 기능을 사용해보세요"}
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/problems">모든 문제 보기</Link>
          </Button>
          {user ? (
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          ) : (
            <Button variant="default" asChild>
              <Link href={ROUTES.AUTH.LOGIN}>
                <LogIn className="w-4 h-4 mr-2" />
                로그인
              </Link>
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">오늘의 문제</CardTitle>
              <Code2 className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold mb-2">
                배열에서 중복 제거하기
              </h2>
              <p className="text-sm opacity-90 mb-4">
                난이도: 중급 | 예상 시간: 30분
              </p>
              {user ? (
                <Button size="sm" variant="secondary">
                  문제 풀기
                </Button>
              ) : (
                <Button size="sm" variant="secondary" asChild>
                  <Link href={ROUTES.AUTH.LOGIN}>로그인하고 풀기</Link>
                </Button>
              )}
            </CardContent>
          </Card>
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
        {user ? (
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
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 30,
                  }}
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
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
        ) : (
          <Card className="flex items-center justify-center h-[400px]">
            <CardContent className="text-center">
              <h3 className="text-2xl font-bold mb-4">로그인이 필요합니다</h3>
              <p className="text-muted-foreground mb-6">
                문제 해결 현황과 통계를 확인하려면 로그인해주세요
              </p>
              <Button asChild>
                <Link href={ROUTES.AUTH.LOGIN}>
                  <LogIn className="w-4 h-4 mr-2" />
                  로그인하기
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">문제 일정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">날짜</TableHead>
                  <TableHead>문제</TableHead>
                  <TableHead className="w-[100px]">난이도</TableHead>
                  {user && (
                    <>
                      <TableHead className="w-[100px]">내 상태</TableHead>
                      <TableHead className="w-[100px]">그룹원 A</TableHead>
                      <TableHead className="w-[100px]">그룹원 B</TableHead>
                      <TableHead className="w-[100px]">그룹원 C</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(7)].map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - 2 + i);
                  const isToday = i === 2;
                  const isFuture = i > 2;
                  return (
                    <TableRow key={i} className={isToday ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">
                        {date.toLocaleDateString("ko-KR", {
                          month: "short",
                          day: "numeric",
                          weekday: "short",
                        })}
                      </TableCell>
                      <TableCell>
                        {isFuture ? (
                          user ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-blue-500"
                            >
                              문제 등록
                            </Button>
                          ) : (
                            "-"
                          )
                        ) : (
                          "배열에서 중복 제거하기"
                        )}
                      </TableCell>
                      <TableCell>
                        {isFuture ? "-" : <Badge>중급</Badge>}
                      </TableCell>
                      {user && (
                        <>
                          <TableCell>
                            {renderStatus(isFuture, isToday, i)}
                          </TableCell>
                          {[...Array(3)].map((_, j) => (
                            <TableCell key={j}>
                              {!isFuture && renderGroupMemberStatus()}
                            </TableCell>
                          ))}
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function renderStatus(isFuture: boolean, isToday: boolean, index: number) {
  if (isFuture) return null;
  if (isToday)
    return (
      <Button size="sm" className="h-8 px-2">
        풀기
      </Button>
    );
  return (
    <div className="flex items-center space-x-1">
      {index === 1 ? (
        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
      )}
      <Link
        href="#"
        className="text-blue-500 hover:underline flex items-center text-sm whitespace-nowrap"
      >
        <LinkIcon className="h-3 w-3 mr-1" />
        {index === 1 ? "미해결" : "풀이"}
      </Link>
    </div>
  );
}

function renderGroupMemberStatus() {
  const solved = Math.random() > 0.5;
  return (
    <div className="flex items-center space-x-1">
      {solved ? (
        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
      )}
      <Link
        href="#"
        className="text-blue-500 hover:underline flex items-center text-sm whitespace-nowrap"
      >
        <LinkIcon className="h-3 w-3 mr-1" />
        {solved ? "풀이" : "미해결"}
      </Link>
    </div>
  );
}
