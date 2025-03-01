"use client"
import React from 'react';
import {Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin} from 'lucide-react';
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 pt-8 pb-6">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Company Logo */}
                    <div className="flex justify-center md:justify-start">
                        <Image src="/images/Logo_3.png" alt="Logo" width={140} height={180}/>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-2">HighTech</h3>
                        <p className="text-sm">We're dedicated to providing the best services and products to our
                            customers.</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 w-full">
                        <h3 className="text-white text-lg font-bold mb-2">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-center md:justify-start">
                                <MapPin size={16} className="mr-2"/>
                                Thai Buri, Nakhon Si Thammarat 80160
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <Phone size={16} className="mr-2"/>
                                +66 82 381 9864 &nbsp;and&nbsp; +66 94 358 6014
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <div className="flex items-center justify-center md:justify-start">
                                    <Mail size={16} className="mr-2"/>
                                    <a href="mailto:tanapat.kh@mail.wu.ac.th" className="hover:underline">
                                        tanapat.kh@mail.wu.ac.th
                                    </a>
                                    &nbsp;and&nbsp;
                                    <a href="mailto:audsadawut.na@mail.wu.ac.th" className="hover:underline">
                                        audsadawut.na@mail.wu.ac.th
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <div className={"flex items-center justify-center md:justify-start"}>
                                    <Facebook size={16} className="mr-2"/>
                                    <a href="https://www.facebook.com/Lv12Team" className="hover:underline">
                                        Tanapat&nbsp;Khatrattana
                                    </a>
                                    &nbsp;and&nbsp;
                                    <a href="https://www.facebook.com/autsadawut.nakthungtao.7/" className="hover:underline">
                                        Audsadawut&nbsp;Nakthungtao
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-700"/>

                {/* Copyright */}
                <div className="text-center text-sm">
                    <p>© {currentYear} HighTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const FooterDashboard = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 w-full pt-8 pb-6">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Company Logo */}
                    <div className="flex justify-center md:justify-start">
                        <Image src="/images/Logo_3.png" alt="Logo" width={140} height={180}/>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-2">HighTech</h3>
                        <p className="text-sm">We're dedicated to providing the best services and products to our
                            customers.</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-2">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-center md:justify-start">
                                <MapPin size={16} className="mr-2"/>
                                Thai Buri, Nakhon Si Thammarat 80160
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <Phone size={16} className="mr-2"/>
                                +66 82 381 9864 &nbsp;and&nbsp; +66 94 358 6014
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <div className="flex items-center justify-center md:justify-start">
                                    <Mail size={16} className="mr-2"/>
                                    <a href="mailto:tanapat.kh@mail.wu.ac.th" className="hover:underline">
                                        tanapat.kh@mail.wu.ac.th
                                    </a>
                                    &nbsp;and&nbsp;
                                    <a href="mailto:audsadawut.na@mail.wu.ac.th" className="hover:underline">
                                        audsadawut.na@mail.wu.ac.th
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                                <div className={"flex items-center justify-center md:justify-start"}>
                                    <Facebook size={16} className="mr-2"/>
                                    <a href="https://www.facebook.com/Lv12Team" className="hover:underline">
                                        Tanapat&nbsp;Khatrattana
                                    </a>
                                    &nbsp;and&nbsp;
                                    <a href="https://www.facebook.com/autsadawut.nakthungtao.7/" className="hover:underline">
                                        Audsadawut&nbsp;Nakthungtao
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-700"/>

                {/* Copyright */}
                <div className="text-center text-sm">
                    <p>© {currentYear} HighTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export {Footer, FooterDashboard};
