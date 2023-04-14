import Link from "next/link";

export const NotFound = (): JSX.Element => {
  return (
    <div className="w-full h-full flex items-center  justify-center gap-5 flex-col">
      <h2 className="text-2xl">Not Found</h2>

      <p className="text-sm">
        Not found sorry{" "}
        <Link href={"/"} className="text-red-500 hover;text-opacity-30 text-md">
          Go Home
        </Link>
      </p>
    </div>
  );
};
