import { StringSchema } from "yup";

type Props = { text: string; className?: string };

function Heading3({ text, className }: Props) {
  return (
    <h3
      className={`text-lg font-medium text-zinc-700 dark:text-zinc-200 ${className} `}
    >
      {text}
    </h3>
  );
}

export default Heading3;
