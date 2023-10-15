import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-50 to-teal-50 flex flex-col space-y-4 justify-center items-center">
      <h1 className="font-semibold text-7xl text-center max-w-lg">
        AI <span className="text-green-600 font-bold"> note taking </span>
        assistant
      </h1>
      <h2 className="font-semibold text-3xl text-center text-slate-700">
        <TypewriterTitle />
      </h2>
      <Link href="/dashboard">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
