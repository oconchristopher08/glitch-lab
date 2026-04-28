// @ts-ignore
import Hero from "@/components/Hero";
// @ts-ignore
import Experiments from "@/components/Experiments";
// @ts-ignore
import Vision from "@/components/Vision";
// @ts-ignore
import Modules from "@/components/Modules";
// @ts-ignore
import EnterLab from "@/components/EnterLab";
// @ts-ignore
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
