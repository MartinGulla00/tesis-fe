import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ReloadIcon className="animate-spin text-2xl" />
    </div>
  );
}

export default Loading;
