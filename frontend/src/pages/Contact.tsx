
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page bg-gray-50 p-5 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-myblack">Contact Us</h1>
      </header>

      {/* Contact Form */}
      <div className="contact-form bg-white p-8 rounded-lg shadow-md mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Get in Touch</h2>
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mygreen"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mygreen"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-600">Message</label>
              <textarea
                id="message"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mygreen"
                placeholder="Your Message"
                
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-mygreen text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Clinic Information */}
      <div className="clinic-info mt-10 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Clinic</h2>
        <p className="text-gray-600">Luna Internal Medicine and Pediatrics Speciality Clinic</p>
        <p className="text-gray-600">Addis Ababa, Ethiopia</p>
        <p className="text-gray-600">
          <strong>Phone:</strong> +251 11 123 4567
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> info@luna-clinic.et
        </p>
        <button
          className="mt-4 px-6 py-2 bg-mygreen text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate('/department')}
        >
          Find Our Doctors
        </button>
      </div>

      {/* Map Section */}
      <div className="map-section mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Find Us Here</h2>
        <div className="w-full h-80 border-2 border-gray-300 rounded-lg overflow-hidden">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127867.90786500628!2d38.69513608425786!3d9.005401669175191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c503b8e177%3A0x6c6a61b72dd4d36!2sMenelik%20II%20Referral%20Hospital!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
