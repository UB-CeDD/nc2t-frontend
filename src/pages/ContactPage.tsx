import React from 'react';
import MainLayout from '../components/layouts/MainLayout';

const ContactPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" placeholder="Your Name" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Your Email" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 border rounded-lg" placeholder="Your Message"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default ContactPage;
