import Image from "next/image";

export const LoginHeader = () => {
  return (
    <header className="w-full flex justify-center py-4">
      <Image
        src="/images/logo.svg"
        alt="SolveMate Logo"
        width={128}
        height={32}
        className="h-8 w-auto"
      />
    </header>
  );
};
