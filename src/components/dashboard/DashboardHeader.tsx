import { ROUTES } from "@/constants/routes";
import { User } from "@/lib/types/auth";
import { Link, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
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
        {user ? (
          <Button variant="destructive" onClick={onLogout}>
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
  );
}
