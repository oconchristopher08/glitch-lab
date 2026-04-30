import Hero from "@/components/Hero";
import Experiments from "@/components/Experiments";
import Vision from "@/components/Vision";
import Modules from "@/components/Modules";
import EnterLab from "@/components/EnterLab";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white pt-6">
      <Hero />
      <Experiments />
      <Vision />
      <Modules />
      <EnterLab />
      <Footer />
    </main>
  );
}
