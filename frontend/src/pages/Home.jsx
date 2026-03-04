
import React, { useState } from "react";
import { ArrowRight, ShieldCheck, BarChart3, Wallet } from "lucide-react";
import SendOtp from "./Register";

const Home = () => {
    const[openMedia, setOpenMedia] = useState(false)
    return (
        <div className="bg-white">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-24 px-10 text-center">
                <h1 className="text-5xl font-bold mb-6">
                    Manage Your Expenses Smartly 💰
                </h1>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Track, control, and grow your savings with our powerful and easy-to-use Expense Tracker.
                </p>

                {openMedia && <SendOtp />}

                <div className="flex justify-center gap-4">
                    <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
                        Get Started
                    </button>

                    <button 
                      onClick={() => setOpenMedia(prev => !prev)}
                    className="bg-transparent border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-green-600 transition duration-300">
                        <a href="/register">Register</a>
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-10 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">
                    Why Choose Our App?
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    {/* Card 1 */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <Wallet className="mx-auto text-green-500 mb-4" size={40} />
                        <h3 className="text-xl font-semibold mb-3">
                            Easy Expense Tracking
                        </h3>
                        <p className="text-gray-600">
                            Add and manage your daily expenses effortlessly.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <BarChart3 className="mx-auto text-green-500 mb-4" size={40} />
                        <h3 className="text-xl font-semibold mb-3">
                            Smart Reports
                        </h3>
                        <p className="text-gray-600">
                            Get detailed reports and visual insights of your spending.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <ShieldCheck className="mx-auto text-green-500 mb-4" size={40} />
                        <h3 className="text-xl font-semibold mb-3">
                            Secure & Reliable
                        </h3>
                        <p className="text-gray-600">
                            Your financial data is safe and fully protected.
                        </p>
                    </div>

                </div>
            </section>

            {/* Call To Action Section */}
            <section className="bg-gray-100 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Ready to Take Control of Your Money?
                </h2>
                <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300">
                    Start Tracking Now
                </button>
            </section>

        </div>
    );
};

export default Home;