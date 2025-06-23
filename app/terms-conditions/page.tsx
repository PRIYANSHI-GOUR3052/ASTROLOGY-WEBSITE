import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TermsAndConditionsPage = () => {
  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Terms and Conditions</h1>
          <p className="text-lg text-gray-300">
            Last updated: January 1, 2023
          </p>
        </div>
        <div className="prose prose-invert max-w-none text-white/80 space-y-8">
          <p>
            Welcome to Nakshatra Gyaan. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Nakshatra Gyaan if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, Nakshatra Gyaan and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Publishing any Website material in any other media.</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material.</li>
              <li>Publicly performing and/or showing any Website material.</li>
              <li>Using this Website in any way that is or may be damaging to this Website.</li>
              <li>Using this Website in any way that impacts user access to this Website.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Your Content</h2>
            <p>
              In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Nakshatra Gyaan a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. No warranties</h2>
            <p>
              This Website is provided “as is,” with all faults, and Nakshatra Gyaan expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Limitation of liability</h2>
            <p>
              In no event shall Nakshatra Gyaan, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Nakshatra Gyaan, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#a084ee] to-[#f857a6] hover:brightness-110">
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
