"use client";

import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex gap-8">
          <Link
            href="https://x.com/monu_keys"
            target="_blank"
            className="text-gray-600 hover:text-rose-500 transition"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-600 hover:text-rose-500 transition"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/monisha-nanabala-1636511b6/"
            target="_blank"
            className="text-gray-600 hover:text-rose-500 transition"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/Monu2114"
            target="_blank"
            className="text-gray-600 hover:text-rose-500 transition"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Bottom Text */}
    </footer>
  );
}
