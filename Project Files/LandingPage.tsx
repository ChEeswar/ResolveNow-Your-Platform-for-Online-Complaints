import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">ResolveNow</span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Platform for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Online Complaints</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline complaint management with our comprehensive platform. Submit, track, and resolve issues efficiently while maintaining transparency and accountability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Start Your Complaint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
              >
                Access Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResolveNow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need for efficient complaint management and resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Submission</h3>
              <p className="text-gray-600">
                Submit complaints quickly with our intuitive form and file attachment support.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track your complaint status in real-time with instant notifications and updates.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Communication</h3>
              <p className="text-gray-600">
                Connect directly with assigned agents through our built-in messaging system.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and privacy measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your issues resolved in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Register Account</h3>
              <p className="text-gray-600">Create your account and verify your email address</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Complaint</h3>
              <p className="text-gray-600">Fill out the complaint form with all relevant details</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Assigned</h3>
              <p className="text-gray-600">Your complaint is assigned to a qualified agent</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Resolution</h3>
              <p className="text-gray-600">Receive updates and resolution for your issue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "ResolveNow made it so easy to file my complaint and get it resolved quickly. The agent communication feature is fantastic!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As an agent, this platform helps me manage complaints efficiently and communicate with customers seamlessly."
              </p>
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Mike Wilson</p>
                  <p className="text-sm text-gray-500">Customer Service Agent</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The admin dashboard gives us complete visibility into all complaints and helps us manage our team effectively."
              </p>
              <div className="flex items-center">
                <div className="bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Anna Davis</p>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust ResolveNow for their complaint management needs.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 inline-flex items-center"
          >
            Start Free Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="ml-3 text-xl font-bold">ResolveNow</span>
              </div>
              <p className="text-gray-400">
                Your trusted platform for online complaint registration and management.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/" className="hover:text-white">About Us</Link></li>
                <li><Link to="/" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@resolvenow.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Business Ave, NY
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResolveNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}