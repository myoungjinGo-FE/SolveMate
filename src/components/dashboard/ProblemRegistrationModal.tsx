"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Difficulty, Platform, Problem } from "@/lib/types/problems";
import { ProblemsAPI } from "@/lib/api/problems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Check, Tag, FileCode, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProblemRegistrationModalProps {
  date: Date;
  onRegister: (problem: Problem | null, isNew: boolean, date: Date) => void;
  initialProblems?: Problem[];
}

export function ProblemRegistrationModal({
  date,
  onRegister,
  initialProblems = [],
}: ProblemRegistrationModalProps) {
  const [step, setStep] = useState<"select" | "new" | "challenge">("select");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [newProblem, setNewProblem] = useState<Problem | null>(null);
  const [problemTitle, setProblemTitle] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [problems, setProblems] = useState<Problem[]>(initialProblems ?? []);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState<Platform | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "NORMAL":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "HARD":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "BAEKJOON":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "PROGRAMMERS":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "LEETCODE":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  useEffect(() => {
    const fetchProblems = async () => {
      if (!problemTitle) {
        setProblems(initialProblems ?? []);
        return;
      }
      setLoading(true);
      try {
        const data = await ProblemsAPI.get(problemTitle);
        setProblems(data || []);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchProblems();
    }, 300);

    return () => clearTimeout(debounce);
  }, [problemTitle, initialProblems]);

  const filteredProblems = useMemo(() => {
    return (problems || []).filter((problem) =>
      problem.title.toLowerCase().includes(problemTitle.toLowerCase())
    );
  }, [problems, problemTitle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) =>
        prev < filteredProblems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      selectProblem(filteredProblems[focusedIndex]);
    }
  };

  const selectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setProblemTitle(problem.title);
    setFocusedIndex(-1);
  };

  const handleNewProblemSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!platform || !difficulty) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const problemData: Problem = {
      title: formData.get("title") as string,
      platform: platform as Platform,
      link: formData.get("link") as string,
      difficulty: difficulty as Difficulty,
    };

    try {
      const createdProblem = await ProblemsAPI.create(problemData);
      setNewProblem(createdProblem);
      setStep("challenge");
      toast.success("문제가 성공적으로 등록되었습니다!", {
        description: `${createdProblem.title} (${createdProblem.platform})`,
      });
    } catch (error) {
      console.error("Failed to create problem:", error);
      toast.error("문제 등록에 실패했습니다.", {
        description: "다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeRegistration = () => {
    const problemToRegister = selectedProblem || newProblem;
    if (problemToRegister) {
      onRegister(problemToRegister, !!newProblem, date);
      toast.success("챌린지가 성공적으로 등록되었습니다!", {
        description: `${
          problemToRegister.title
        } - ${date.toLocaleDateString()}`,
      });
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Tabs
        defaultValue="select"
        value={step}
        onValueChange={(value) =>
          setStep(value as "select" | "new" | "challenge")
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="select">기존 문제 선택</TabsTrigger>
          <TabsTrigger value="new">새 문제 추가</TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="mt-4">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="문제 검색..."
                  value={problemTitle}
                  className="pl-9 pr-4"
                  onChange={(e) => {
                    setProblemTitle(e.target.value);
                    setFocusedIndex(-1);
                    setSelectedProblem(null);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {loading && (
                <div className="flex items-center justify-center py-6 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>검색 중...</span>
                </div>
              )}

              {problemTitle && !selectedProblem && !loading && (
                <div className="rounded-md border">
                  {filteredProblems.length > 0 ? (
                    <div className="divide-y">
                      {filteredProblems.map((problem, index) => (
                        <div
                          key={problem.id || `${problem.title}-${index}`}
                          className={`p-3 cursor-pointer transition-colors hover:bg-muted ${
                            index === focusedIndex ? "bg-muted" : ""
                          }`}
                          onClick={() => selectProblem(problem)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium mb-1">
                                {problem.title}
                              </div>
                              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                <FileCode className="h-3.5 w-3.5" />
                                <span>{problem.platform}</span>
                              </div>
                            </div>
                            <Badge
                              className={getDifficultyColor(problem.difficulty)}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <Search className="h-8 w-8 mb-2 text-muted-foreground" />
                      <h3 className="font-medium text-lg mb-1">
                        검색 결과가 없습니다
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        다른 키워드로 검색하거나 새 문제를 등록해보세요
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!problemTitle && !selectedProblem && !loading && (
                <div className="rounded-md border p-6 text-center">
                  <Search className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium text-lg mb-1">
                    문제를 검색해보세요
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    문제 제목을 입력하면 관련 문제를 검색합니다
                  </p>
                </div>
              )}

              {selectedProblem && (
                <Card className="mt-4 border border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-green-800">
                      <Check className="h-4 w-4 mr-2" />
                      선택된 문제
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-medium text-lg mb-2">
                      {selectedProblem.title}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        className={getPlatformColor(selectedProblem.platform)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {selectedProblem.platform}
                      </Badge>
                      <Badge
                        className={getDifficultyColor(
                          selectedProblem.difficulty
                        )}
                      >
                        <BarChart2 className="h-3 w-3 mr-1" />
                        {selectedProblem.difficulty}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProblem(null);
                        setProblemTitle("");
                      }}
                      className="mt-2 border-green-200 text-green-800 hover:bg-green-100"
                    >
                      선택 취소
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setStep("challenge")}
                  disabled={!selectedProblem}
                >
                  챌린지로 등록하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">새 문제 등록</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewProblemSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">문제 제목</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    placeholder="새 문제 제목"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">플랫폼</Label>
                  <Select
                    onValueChange={(value) => setPlatform(value as Platform)}
                    value={platform}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="플랫폼 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BAEKJOON">Baekjoon</SelectItem>
                        <SelectItem value="PROGRAMMERS">Programmers</SelectItem>
                        <SelectItem value="LEETCODE">Leetcode</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">난이도</Label>
                  <Select
                    onValueChange={(value) =>
                      setDifficulty(value as Difficulty)
                    }
                    value={difficulty}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="난이도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="NONE">None</SelectItem>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">링크</Label>
                  <Input
                    id="link"
                    name="link"
                    required
                    placeholder="문제 URL"
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={loading || !platform || !difficulty}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        등록 중...
                      </>
                    ) : (
                      "문제 등록"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenge">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">챌린지 등록 확인</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="pt-4">
                  <div className="font-medium text-lg mb-2">
                    {(selectedProblem || newProblem)?.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProblem || newProblem) && (
                      <>
                        <Badge
                          className={getPlatformColor(
                            (selectedProblem || newProblem)?.platform || ""
                          )}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {(selectedProblem || newProblem)?.platform}
                        </Badge>
                        <Badge
                          className={getDifficultyColor(
                            (selectedProblem || newProblem)?.difficulty || ""
                          )}
                        >
                          <BarChart2 className="h-3 w-3 mr-1" />
                          {(selectedProblem || newProblem)?.difficulty}
                        </Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="py-2 text-center">
                <p className="font-medium">
                  이 문제를 {date.toLocaleDateString()}의 챌린지로
                  등록하시겠습니까?
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep("select")}>
                  다시 선택
                </Button>
                <Button onClick={handleChallengeRegistration}>
                  챌린지 등록
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
