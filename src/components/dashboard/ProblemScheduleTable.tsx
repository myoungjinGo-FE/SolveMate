"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, LinkIcon } from "lucide-react";
import Link from "next/link";
import { User } from "@/lib/types/users";
import { Problem } from "@/lib/types/problems";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProblemRegistrationModal } from "@/components/dashboard/ProblemRegistrationModal";

interface ProblemScheduleTableProps {
  user: User | null;
}

export function ProblemScheduleTable({ user }: ProblemScheduleTableProps) {
  const [problems, setProblems] = useState<{ [date: string]: Problem }>({});

  const handleProblemRegistration = (
    problem: Problem | null,
    isNew: boolean,
    date: Date
  ) => {
    if (problem) {
      setProblems((prev) => ({
        ...prev,
        [date.toISOString()]: problem,
      }));
    }
  };

  // Helper function to render the status
  const renderStatus = (isFuture: boolean, isToday: boolean, index: number) => {
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
  };

  // Helper function to render group member status
  const renderGroupMemberStatus = () => {
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
  };

  return (
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
                <TableHead className="w-[100px]">내 상태</TableHead>
                <TableHead className="w-[100px]">그룹원 A</TableHead>
                <TableHead className="w-[100px]">그룹원 B</TableHead>
                <TableHead className="w-[100px]">그룹원 C</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(7)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 2 + i);
                const isToday = i === 2;
                const isFuture = i > 2;
                const problem = problems[date.toISOString()];
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-blue-500"
                            >
                              문제 등록
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>문제 등록</DialogTitle>
                              <DialogDescription>
                                기존 문제를 선택하거나 새 문제를 등록하세요.
                              </DialogDescription>
                            </DialogHeader>
                            <ProblemRegistrationModal
                              date={date}
                              onRegister={handleProblemRegistration}
                            />
                          </DialogContent>
                        </Dialog>
                      ) : problem ? (
                        problem.title
                      ) : (
                        "배열에서 중복 제거하기"
                      )}
                    </TableCell>
                    <TableCell>
                      {isFuture ? (
                        "-"
                      ) : (
                        <Badge>{problem ? problem.difficulty : "중급"}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{renderStatus(isFuture, isToday, i)}</TableCell>
                    {[...Array(3)].map((_, j) => (
                      <TableCell key={j}>
                        {!isFuture && renderGroupMemberStatus()}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
