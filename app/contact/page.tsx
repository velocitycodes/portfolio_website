"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const router = useRouter();

    const handleClose = () => {
        router.push("/");
    };

    return (
        <div className="bg-black min-h-screen flex flex-col pt-24">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-2xl bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                    <ContactForm onClose={handleClose} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
