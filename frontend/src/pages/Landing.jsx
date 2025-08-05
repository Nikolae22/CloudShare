import HeroSection from "../components/landing/HeroSection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialsSection from "../components/landing/TestimonialsSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";
import {features, pricingPlans, testimonials} from "../assets/data.js";
import {useClerk, useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export default function Landing(){

    const {openSignIn,openSignUp}=useClerk();
    const {isSignedIn}=useUser();
    const navigate=useNavigate();

    useEffect(()=>{
        if (isSignedIn){
            navigate('/dashboard')
        }
    },[isSignedIn,navigate()])

    return(
        <div className='landing-page  bg-gradient-to-b from-gray-50 to-gray-100'>
            {/*Hero section*/}
            <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>
            {/*    Features section*/}
            <FeaturesSection features={features}/>
            {/*    pricing section*/}
            <PricingSection pricingPlans={pricingPlans} openSignUp={openSignUp} />
            {/*    Testimonuals sections molto probabilmete la tolgo perche devo creare dei commenti e dei user falsi */}
            <TestimonialsSection testimonials={testimonials}/>
            {/*    cta sections*/}
            <CTASection openSignUp={openSignUp}/>
            {/*    footer sections*/}
            <Footer/>
            </div>
    )
}