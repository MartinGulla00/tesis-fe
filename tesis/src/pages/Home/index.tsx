type Props = {};
import Heading3 from "@/components/headings/Heading3";

function Home({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Heading3
        text="Home"
        className="text-zinc-600 text-center"
      />
    </div>
  );
}

export default Home;
