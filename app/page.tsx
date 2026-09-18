import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-vellum">
      <Header />
      <Hero />
      <HowItWorks />
      <TrustSection />
      <SignupForm />
      <Footer />
    </main>
  );
}
