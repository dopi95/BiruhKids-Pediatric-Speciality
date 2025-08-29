import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Heart,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Placeholder for subscription logic
        alert(`Subscribed with email: ${email}`);
        setEmail("");
    };
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold">
                                HealthCare Clinic
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Providing quality healthcare services with
                            compassion, excellence, and innovation. Your health
                            is our priority.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/services"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/videos"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Videos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Info
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300 text-sm">
                                    +251 11 123 4567
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300 text-sm">
                                    info@healthcareclinic.com
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                                <span className="text-gray-300 text-sm">
                                    Bole Road, Addis Ababa
                                    <br />
                                    Ethiopia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Newsletter
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Subscribe to get updates on health tips and clinic
                            news.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-400"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 HealthCare Clinic. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
