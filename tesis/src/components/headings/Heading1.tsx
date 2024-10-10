type Props = { text: string; className?: string };

function Heading1({ text, className }: Props) {
  return (
    <h1
      className={`${className} text-2xl font-bold text-zinc-700 dark:text-zinc-200`}
    >
      {text}
    </h1>
  );
}

export default Heading1;
