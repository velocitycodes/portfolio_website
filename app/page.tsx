import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSwitch from "@/components/AboutSwitch";
import CreativeMinds from "@/components/CreativeMinds";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSwitch />
        <CreativeMinds />
        <Services />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </>
  );
}