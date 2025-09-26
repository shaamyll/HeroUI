import { motion } from 'framer-motion';

function Home() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-4/5 mt-20'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
          {/* Left Column - Text Content */}
          <div className='flex-1 max-w-2xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8"
              >
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Harness the power of artificial intelligence to streamline your operations, 
                  boost productivity, and make data-driven decisions with our next-generation ERP platform.
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg border border-blue-200 transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Column - Image */}
          <div className='flex-1 max-w-lg pt-11'>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <motion.img
                whileHover={{ scale: 1.02 }}
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="AI ERP Dashboard"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">AI Active</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Real-time Sync</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Feature Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Intelligent Automation",
              description: "AI-driven workflows that adapt to your business needs",
              icon: "🤖"
            },
            {
              title: "Real-time Analytics",
              description: "Actionable insights from your business data",
              icon: "📊"
            },
            {
              title: "Seamless Integration",
              description: "Connect all your systems in one unified platform",
              icon: "🔗"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;