import HeroSection from "../components/landing/HeroSection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialsSection from "../components/landing/TestimonialsSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";
import {features, pricingPlans, testimonials} from "../assets/data.js";


export default function Landing(){

    return(
        <div className='landing-page  bg-gradient-to-b from-gray-50 to-gray-100'>
            {/*Hero section*/}
            <HeroSection/>
            {/*    Features section*/}
            <FeaturesSection features={features}/>
            {/*    pricing section*/}
            <PricingSection pricingPlans={pricingPlans}/>
            {/*    Testimonuals sections molto probabilmete la tolgo perche devo creare dei commenti e dei user falsi */}
            <TestimonialsSection testimonials={testimonials}/>
            {/*    cta sections*/}
            <CTASection/>
            {/*    footer sections*/}
            <Footer/>
            </div>
    )
}