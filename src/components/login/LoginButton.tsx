"use client";

import Image from "next/image";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full px-4 py-4 gap-3 bg-[#FEE500] hover:bg-[#FDD835] rounded-xl transition-colors duration-200"
    >
      <Image src="/images/vercel.svg" alt="Kakao Logo" width={24} height={24} />
      <span className="text-base font-semibold text-[#191919]">
        카카오로 계속하기
      </span>
    </button>
  );
};
