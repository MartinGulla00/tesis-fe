type Props = { text: string };

function Heading2({ text }: Props) {
  return (
    <h2 className="text-xl font-medium text-zinc-700 dark:text-zinc-200">
      {text}
    </h2>
  );
}

export default Heading2;
