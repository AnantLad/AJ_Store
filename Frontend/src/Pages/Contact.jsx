import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

export default function Contact() {
    const { axios, navigate } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/api/contact/submit', formData);
            if (data.success) {
                toast.success(data.message);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16 pb-16 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="bg-green-50 px-8 py-10 text-center border-b border-green-100">
                    <h2 className="text-3xl md:text-4xl text-gray-700 font-semibold mb-2">Get in <span className="text-green-600">Touch</span></h2>
                    <p className="text-gray-500 text-sm md:text-base">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
                
                <div className="p-8">
                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Your Name</label>
                                <input 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <input 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Subject</label>
                            <input 
                                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required 
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Message</label>
                            <textarea 
                                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 resize-none"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required 
                                rows="5"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full mt-4 bg-green-600 text-white py-3.5 rounded-md hover:bg-green-700 transition cursor-pointer font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
