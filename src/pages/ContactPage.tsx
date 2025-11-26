import React, { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library for custom marker

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend API
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    };

    const position: [number, number] = [4.1532, 9.2923]; // University of Buea coordinates

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="heading-lg text-center mb-10 text-gray-800">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Form Section */}
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="heading mb-6 text-gray-700">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Subject of your message"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn-primary py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Submit Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Map and Info Section */}
                    <div className="space-y-10">
                        {/* Map */}
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="heading mb-6 text-gray-700">Our Location</h2>
                            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '400px', width: '100%', borderRadius: '8px' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        University of Buea <br /> Center for Drug Discovery
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="heading mb-6 text-gray-700">Contact Details</h2>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Address:</span> University of Buea, South West Region, Cameroon
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Phone:</span> +237 6XX XXX XXX (Placeholder)
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Email:</span> info@ubuea.cm (Placeholder)
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Opening Hours:</span> Mon - Fri: 8:00 AM - 5:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ContactPage;
