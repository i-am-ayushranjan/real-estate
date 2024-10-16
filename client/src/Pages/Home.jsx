import React, { useEffect } from 'react';
import feather from 'feather-icons';
import { feature, home } from '../assets';
import { useUserContext } from '../Context/UserContext';
import realstate from '../../Constants/realstate';
import PropertyCard from '../../Components/PropertyCard';

// Main Component
const Home = () => {
  const {user} = useUserContext();
  useEffect(() => {
    // Replace icons in the DOM with Feather's SVGs
    feather.replace();
  }, []);

  return (
    <div>
      {user.isAuthenticated || <>
      {/* Home Section */}
      <section className="bg-white mb-20 md:mb-52 xl:mb-72">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-center xl:justify-start">

                    <div className="mt-28 text-center xl:text-left">
                        <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">Get your dream <br/> house now</h1>

                        <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">Having a sweet home is everyone's dream. Have you <br/> owned your dream house?</p>

                        <button className="px-6 py-4 bg-green-700 text-white font-semibold text-lg rounded-xl hover:bg-green-900 transition ease-in-out duration-500">Contact us</button>
                    </div>

                    <div className="hidden xl:block xl:absolute z-0 top-0 right-0">
                    <img src={home} alt="Home img" />
                    </div>

                </div>

            </div>
        </section>

      {/* Feature Section */}
      <section className="bg-white py-10 md:py-16 xl:relative">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col xl:flex-row justify-end">
            <div className="hidden xl:block left-0 bottom-0 w-full">
              <img src={feature} alt="Feature img" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-xl md:text-4xl text-center leading-normal mb-6">
                Choice of various types of <br /> house
              </h1>
              <p className="font-normal text-gray-400 text-md md:text-xl text-center mb-16">
                We provide a wide selection of home types for you and your <br />
                family, allowing you to freely choose a home model.
              </p>

              {[
                {
                  icon: 'check-circle',
                  title: 'Best Home Guarantee',
                  description:
                    'We guarantee the quality of your home when bought from D’house.',
                },
                {
                  icon: 'lock',
                  title: 'Safe Transaction',
                  description:
                    'Your transactions will always be confidential, with discounts available.',
                },
                {
                  icon: 'credit-card',
                  title: 'Low and Cost Home Taxes',
                  description:
                    'Buying a house from D’house gives you a tax discount.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20"
                >
                  <div className="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                    <i data-feather={feature.icon} className="text-green-900"></i>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold text-gray-900 text-2xl mb-2">
                      {feature.title}
                    </h4>
                    <p className="font-normal text-gray-400 text-xl leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </>
      }

      {/* Additional sections like Gallery, Testimonial, and Book can follow similarly... */}
           {
              user.isAuthenticated && (
                <div className='p-8 md:p-12 xl:p-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
  {
    realstate.map((data, idx) => {
      return (<PropertyCard key={idx} property={data} />);
    })
  }
</div>

              )    
            }
    </div>
  );
};

export default Home;
