import { ArrowRight, ChevronDown, Activity, Box, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Neutronix
              </span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Technology
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  About
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600">
                  Contact
                </a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative h-screen bg-blue-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">Powering Tomorrow, Today</h1>
          <p className="text-xl mb-8 max-w-2xl">
            The global microreactor market is set to soar, jumping from $131.48
            billion in 2023 to an astounding $759.94 billion by 2033
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center w-fit">
            Join the Energy Revolution
            <ArrowRight className="ml-2" />
          </button>
        </div>
        <ChevronDown
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          size={32}
        />
      </section>

      {/* Build.Learn.Build Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">Build. Learn. Build.</h2>
              <p className="text-lg text-gray-600 mb-6">
                Nuclear is the only industry with a negative learning curve. To
                change this, we need to build nuclear reactors. A lot of them!
              </p>
              <div className="flex items-center space-x-4">
                <Activity size={24} className="text-blue-600" />
                <span className="text-gray-700">Learning from every step</span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              {/* Placeholder for learning curve graph */}
              <div className="h-64 w-full bg-white rounded shadow-sm flex items-center justify-center">
                Learning Curve Visualization
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Step at a Time Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            One Step at a Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-100 rounded-lg p-8 h-96">
              {/* Placeholder for reactor visualization */}
              <div className="h-full w-full bg-white rounded shadow-sm flex items-center justify-center">
                'Pogos' Reactor Visualization
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Strategic Evolution
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                The first-of-a-kind reactor will be expensive—no way around it!
                That's why we're starting with the 'Pogos,' targeting markets
                less sensitive to price swings. Once the technology is
                de-risked, we're charging full steam ahead into the centralized
                market with the next iteration—the 'Legos'!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Phase 1: 'Pogos' Development
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Phase 2: Market Testing</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Phase 3: 'Legos' Evolution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Minimum Innovation is Maximum Innovation!
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Box className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">
                Generation III Tech
              </h3>
              <p className="text-gray-600">
                Fusing select technologies to achieve high TRL and ARL
                standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Zap className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">
                Scalable Deployment
              </h3>
              <p className="text-gray-600">
                From 'Pogos' to 'Legos' - Evolution in Nuclear Innovation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Activity className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">Market Impact</h3>
              <p className="text-gray-600">
                Targeting markets less sensitive to price swings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Face It!</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Billions are pouring into the nuclear industry, yet not one
            commercial microreactor has hit the market. We're here to change
            that.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center">
            Join Us in Building a Cleaner Future
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Neutronix</h3>
              <p className="text-gray-400">
                Powering a sustainable future through next-gen nuclear
                microreactor technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    News & Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Stay updated with our newsletter
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1"
                  />
                  <button className="bg-blue-600 px-4 py-2 rounded-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 Neutronix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
