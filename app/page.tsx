import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
