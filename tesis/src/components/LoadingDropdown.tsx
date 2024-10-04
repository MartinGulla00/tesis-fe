import { ReloadIcon } from "@radix-ui/react-icons";

type Props = { text: string };

function LoadingDropdown({ text }: Props) {
  return (
    <div
      className="flex items-center justify-between w-full h-9
     bg-zinc-200 text-zinc-600 rounded-md text-xs py-1.5 px-4"
    >
      <div className="text-center font-medium">{text}</div>
      <ReloadIcon className="animate-spin text-sm" />
    </div>
  );
}

export default LoadingDropdown;
