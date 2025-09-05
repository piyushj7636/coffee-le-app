import { Clock, MapPin, Star } from 'lucide-react';
import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Quick Pre-Orders',
    description: 'Order ahead and skip the line. Your coffee will be ready when you arrive.',
    icon: <Clock className="h-6 w-6 text-pink-500" />,
  },
  {
    title: 'Premium Quality',
    description: 'We source the finest beans and craft each cup with care and expertise.',
    icon: <Star className="h-6 w-6 text-pink-500" />,
  },
  {
    title: 'Convenient Location',
    description: 'Located in the heart of downtown, perfect for your daily coffee fix.',
    icon: <MapPin className="h-6 w-6 text-pink-500" />,
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;