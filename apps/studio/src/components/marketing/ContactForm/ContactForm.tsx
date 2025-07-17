import React from 'react'

// Contact Form Component
const ContactForm: React.FC<{
  title: string;
  subtitle: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor: string;
}> = ({ title, subtitle, backgroundColor = '#F3F4F6', textColor = '#111827', accentColor }) => {
  return (
    <section 
      className="py-16 px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80">{subtitle}</p>
        </div>
        
        <form className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea 
              rows={5} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
          </div>
          <button 
            type="submit"
            className="w-full px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accentColor }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm