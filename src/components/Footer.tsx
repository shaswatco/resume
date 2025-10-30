import { Mail, Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  const legalLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' }
  ];

  return (
    <footer className="bg-[#0F1C2A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Outskill</h3>
            <p className="text-gray-400 mb-4">by PlaceRight</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Built for Students, By Students
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <a
              href="mailto:hello@placeright.com"
              className="flex items-center gap-2 text-gray-300 hover:text-[#2762ea] transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
              hello@placeright.com
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2762ea] transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} PlaceRight. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-[#2762ea] text-sm transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
