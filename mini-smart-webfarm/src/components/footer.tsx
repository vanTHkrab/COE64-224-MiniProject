"use client"
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <Image src="/images/Logo_3.png" alt={"Logo"} width={190} height={250} />
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">HighTech</h3>
                        <p className="mb-4">We're dedicated to providing the best services and products to our customers.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>



                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <span>Thai Buri, Nakhon Si Thammarat 80160</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                <span>+66 82 381 9864</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={16} className="mr-2" />
                                <span>tanapat.kh@wu.ac.th</span>

                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-700" />

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p>© {currentYear} HighTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;