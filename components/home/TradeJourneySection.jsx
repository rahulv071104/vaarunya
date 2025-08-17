import Link from "next/link"
import { Facebook, Linkedin, Mail } from "lucide-react"
import logo from '@/Vaarunya_cropped_bg.png';
import Image from "next/image"
export default function Footer() {
  return (
    <footer className=" text-white">
      <div className="container mx-auto px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
               <div className="flex-shrink-0 ml-[-10px]">
              <Image
                width={64}
                height={64}
                src={logo}
                alt="Vaarunya Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
              <div>
                <h3 className="text-gray-300 text-xl font-semibold">Vaarunya Global Exim Pvt Ltd</h3>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Building enduring partnerships through transparent global trade solutions. We connect verified suppliers with serious buyers worldwide, making international trade accessible, secure, and rewarding.
            </p>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="ml-30">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="space-y-4">
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/categories" className="block text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-gray-100 text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="text-gray-300">
                <p>51-6-9, Vijayawada Muncipa Corporation</p>
                <p>Revenue Ward 2A, Machavaram,</p>
                <p>Vijayawada - 520004, Andhra Pradesh, India</p>
              </div>

              <div>
                <p className="text-yellow-500 font-medium">Phone:</p>
                <p className="text-gray-300">+91 9100477554</p>
              </div>

              <div>
                <p className="text-yellow-500 font-medium">Email:</p>
                <p className="text-gray-300">info@vaarunyaglobalexim.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">©️ 2025 Vaarunya Global Exim Pvt Ltd. All rights reserved.</p>

          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}