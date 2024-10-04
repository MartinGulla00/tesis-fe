type Props = {};
// import logo from "@/assets/logo.png";
import Heading3 from "@/components/headings/Heading3";

function Home({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {/* //<img src={logo} alt="Logo de la empresa" className="w-[250px] h-auto" /> */}
      <Heading3
        text="Bienvenidos al sistema de gestión interna de gimnasios"
        className="text-zinc-600 text-center"
      />
    </div>
  );
}

export default Home;
