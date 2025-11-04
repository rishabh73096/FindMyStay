
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Award,
  Clock,
  Shield
} from 'lucide-react';

const FindMyStayHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ];

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      price: "₹8,999",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Free WiFi", "Ocean View", "King Bed", "Mini Bar"],
      location: "Goa"
    },
    {
      id: 2,
      name: "Premium Suite",
      price: "₹12,499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Free WiFi", "City View", "Balcony", "Room Service"],
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Royal Heritage Room",
      price: "₹15,999",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      amenities: ["Free WiFi", "Heritage View", "Luxury Bath", "Butler Service"],
      location: "Rajasthan"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "Amazing experience! The booking process was seamless and the hotel exceeded all expectations. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Rahul Gupta",
      location: "Bangalore",
      rating: 5,
      comment: "Find My Stay made our vacation planning so easy. Great prices and excellent customer service!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Anjali Patel",
      location: "Ahmedabad",
      rating: 4,
      comment: "Wonderful platform with great variety of hotels. The room was exactly as shown in photos.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);



  const HeroSection = () => (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60"></div>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Find Your Perfect
            <span className="block text-blue-400">Stay</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-fade-in-up animation-delay-200">
            Discover amazing hotels and resorts worldwide with unbeatable prices
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-blue-400 focus:outline-none">
                  <option value="">Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Search size={20} />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Find My Stay?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We provide the best booking experience with unmatched service and value
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Award, title: "Best Price Guarantee", desc: "Find lower price? We'll match it!" },
            { icon: Shield, title: "Secure Booking", desc: "Your data is safe with us" },
            { icon: Clock, title: "24/7 Support", desc: "Round the clock customer service" },
            { icon: CheckCircle, title: "Easy Cancellation", desc: "Cancel or modify easily" }
          ].map((feature, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const RoomsSection = () => (
    <section id="rooms" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Rooms & Suites</h2>
          <p className="text-gray-300 text-lg">Discover our handpicked selection of premium accommodations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-slate-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {room.location}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{room.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-white text-sm">{room.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {room.amenities.map((amenity, idx) => (
                    <span key={idx} className="text-gray-300 text-sm flex items-center">
                      <CheckCircle className="text-green-400 mr-1" size={12} />
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-400">{room.price}</span>
                    <span className="text-gray-300 text-sm">/night</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <span>Book Now</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg transition-all duration-300">
            View All Rooms
          </button>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Guests Say</h2>
          <p className="text-gray-300 text-lg">Read reviews from our satisfied customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of happy travelers who trust Find My Stay for their perfect getaway
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
            Start Booking Now
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
            Download App
          </button>
        </div>
      </div>
    </section>
  );

 

  return (
    <div className="min-h-screen bg-slate-900">
     
      <HeroSection />
      <FeaturesSection />
      <RoomsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default FindMyStayHomepage;