"use client";
// This page intentionally hides the Header for a legal/standalone look.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const TermsAndConditionsPage = () => {
  // Hide the header if possible (handled in layout or via CSS)
  if (typeof window !== 'undefined') {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  }

  // Set the body and html background to black for this page
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black py-12 pl-12 pr-4 text-white font-sans mt-24" style={{fontWeight: 400, letterSpacing: 0.01}}>
      <div className="space-y-8 leading-relaxed" style={{textAlign: 'justify'}}>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold mb-2" style={{textAlign: 'left'}}>Terms & Conditions</h1>
          <p className="text-lg mb-6" style={{textAlign: 'left'}}>Last updated: January 1, 2024</p>
        </div>
        <p>
          These Terms & Conditions ("Agreement") constitute a legally binding contract between you and Nakshatra Gyaan ("the Platform"). By accessing or using the Platform, you acknowledge that you have read, understood, and irrevocably agree to be bound by the terms of this Agreement. The Platform is intended solely for individuals who are at least eighteen (18) years of age or the age of majority in their jurisdiction. By using the Platform, you affirm that you meet these eligibility requirements and possess the legal capacity to enter into this Agreement. If you are acting on behalf of an organization, you represent that you are duly authorized to bind such entity to these Terms. To access certain features, you may be required to register for an account, and you agree to provide accurate, current, and complete information, maintaining the confidentiality of your credentials and accepting responsibility for all activities that occur under your account.
        </p>
        <p>
          All intellectual property rights in and to the Platform and its content, including but not limited to copyrights, trademarks, service marks, trade secrets, and proprietary information, are and shall remain the exclusive property of Nakshatra Gyaan or its licensors. No license or right is granted to you except as expressly set forth herein. Any unauthorized use, reproduction, or distribution of the content is strictly prohibited and may result in civil and/or criminal liability. By submitting, posting, or displaying any content on or through the Platform, you grant Nakshatra Gyaan a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and sublicensable license to use, reproduce, adapt, publish, translate, create derivative works from, distribute, perform, and display such content in any media, and you represent and warrant that you have all rights necessary to grant the foregoing license.
        </p>
        <p>
          You agree to use the Platform in a manner consistent with all applicable laws and regulations and not to use the Platform for any unlawful purpose, nor to infringe the intellectual property rights of others, nor to upload or transmit viruses or malicious code, nor to attempt to gain unauthorized access to any portion of the Platform, nor to harass, abuse, or harm another person or group. You further agree not to impersonate any person or entity, misrepresent your affiliation with any person or entity, interfere with or disrupt the integrity or performance of the Platform, collect or store personal data about other users without their express consent, or use automated means to access the Platform without permission. You agree not to disclose any confidential information obtained through the Platform without prior written consent from Nakshatra Gyaan, and you acknowledge that confidential information includes, but is not limited to, proprietary business information, user data, and non-public technical information.
        </p>
        <p>
          Your use of the Platform is also governed by our Privacy Policy, and by using the Platform, you consent to the collection, use, and disclosure of your information as described therein. Certain services may require payment, and all fees are due in advance and are non-refundable unless otherwise stated. You agree to provide valid payment information and authorize Nakshatra Gyaan to charge all applicable fees to your chosen payment method, understanding that failure to pay may result in suspension or termination of your access to the services. The Platform and all content and services are provided on an "as is" and "as available" basis, without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. Nakshatra Gyaan does not warrant that the Platform will be uninterrupted, error-free, or secure, nor does it guarantee the accuracy or reliability of any content. All astrological and spiritual guidance is for informational purposes only and should not be construed as professional advice.
        </p>
        <p>
          To the maximum extent permitted by applicable law, Nakshatra Gyaan, its affiliates, officers, directors, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of or inability to use the Platform, even if advised of the possibility of such damages. You agree to indemnify, defend, and hold harmless Nakshatra Gyaan and its affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with your access to or use of the Platform, your violation of this Agreement, or your infringement of any intellectual property or other rights of any third party.
        </p>
        <p>
          Nakshatra Gyaan shall not be liable for any failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, terrorism, strikes, labor disputes, pandemics, government orders, or failures of suppliers, subcontractors, or carriers. Nakshatra Gyaan reserves the right, in its sole discretion, to suspend or terminate your access to the Platform at any time, with or without notice, for any reason, including but not limited to violation of this Agreement. Upon termination, all rights granted to you under this Agreement will immediately cease. The Platform may contain links to third-party websites or resources, and Nakshatra Gyaan does not endorse and is not responsible or liable for any content, advertising, products, or other materials on or available from such sites or resources. Access to any third-party website is at your own risk.
        </p>
        <p>
          Nakshatra Gyaan reserves the right, at its sole discretion, to modify, amend, or update this Agreement at any time. Any changes will be effective immediately upon posting on the Platform, and your continued use of the Platform constitutes acceptance of the revised Agreement. If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining provisions shall remain in full force and effect. No waiver of any term or condition of this Agreement shall be deemed a further or continuing waiver of such term or any other term, and Nakshatra Gyaan's failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision. You may not assign or transfer any rights or obligations under this Agreement without the prior written consent of Nakshatra Gyaan, and Nakshatra Gyaan may assign its rights and obligations under this Agreement at any time without notice. This Agreement constitutes the entire agreement between you and Nakshatra Gyaan regarding your use of the Platform and supersedes all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning its subject matter.
        </p>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or relating to this Agreement or the Platform shall be subject to the exclusive jurisdiction of the courts located in India. All notices or other communications required or permitted under this Agreement shall be in writing and shall be deemed given when delivered personally, sent by email to support@nakshatragyaan.com, or posted on the Platform. For any questions, concerns, or notices regarding these Terms & Conditions, please contact us at <a href="mailto:support@nakshatragyaan.com" className="underline">support@nakshatragyaan.com</a>.
        </p>
        <p>
          Nakshatra Gyaan retains user data for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. The retention period for personal data is determined based on the nature of the information, the purpose for which it is processed, and any applicable legal or regulatory requirements. Upon expiration of the retention period, personal data will be securely deleted or anonymized, unless further retention is required by law or for legitimate business purposes.
        </p>
        <p>
          The Platform utilizes cookies and similar tracking technologies to enhance user experience, analyze trends, administer the website, track users' movements around the site, and gather demographic information about the user base as a whole. By using the Platform, you consent to the use of cookies and similar technologies in accordance with our Cookie Policy. You may control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the Platform.
        </p>
        <p>
          In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the parties shall first attempt in good faith to resolve such dispute through informal negotiations. If the dispute cannot be resolved through negotiations, it shall be submitted to binding arbitration in accordance with the rules of the Arbitration and Conciliation Act, 1996, as amended from time to time. The seat and venue of arbitration shall be in India, and the language of arbitration shall be English. The decision of the arbitrator(s) shall be final and binding on the parties.
        </p>
        <p>
          Any submissions, feedback, suggestions, or ideas you provide to Nakshatra Gyaan regarding the Platform or its services shall be deemed non-confidential and non-proprietary. By providing such submissions, you grant Nakshatra Gyaan an unrestricted, irrevocable, worldwide, royalty-free license to use, reproduce, display, perform, modify, transmit, and distribute such submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.
        </p>
        <p>
          The Platform may display advertisements and promotions from third parties, and your interactions with such advertisements are solely between you and the third party. Nakshatra Gyaan does not endorse, guarantee, or make any representations or warranties regarding any third-party advertisements, products, or services. Your correspondence or business dealings with, or participation in promotions of, advertisers found on or through the Platform are solely between you and such advertiser.
        </p>
        <p>
          The Platform may integrate with or provide links to third-party services, applications, or websites that are not owned or controlled by Nakshatra Gyaan. Access to and use of such third-party services is at your own risk and subject to the terms and conditions and privacy policies of those third parties. Nakshatra Gyaan is not responsible for the content, accuracy, or practices of any third-party services, nor does it endorse any third-party services.
        </p>
        <p>
          Nakshatra Gyaan strives to maintain the availability and performance of the Platform but does not guarantee uninterrupted or error-free operation. The Platform may be subject to limitations, delays, and other problems inherent in the use of the internet and electronic communications. Nakshatra Gyaan shall not be liable for any delays, delivery failures, or other damage resulting from such problems or from scheduled or unscheduled maintenance, upgrades, or repairs.
        </p>
        <p>
          User feedback is welcomed and encouraged. By submitting feedback, you agree that Nakshatra Gyaan may use, disclose, reproduce, license, distribute, and exploit such feedback without any obligation to you. Feedback may be used to improve the Platform, develop new features, or for any other purpose deemed appropriate by Nakshatra Gyaan.
        </p>
        <p>
          Nakshatra Gyaan reserves the right to change, suspend, or discontinue any aspect of the Platform or its services at any time, including the availability of any feature, database, or content, without notice or liability. Nakshatra Gyaan may also impose limits on certain features and services or restrict your access to parts or all of the Platform without notice or liability.
        </p>
        <p>
          The Platform and its services may be subject to export control laws and regulations of India and other jurisdictions. You agree to comply with all applicable export and re-export control laws and regulations, including restrictions on destinations, end users, and end use. You represent and warrant that you are not located in, under the control of, or a national or resident of any country to which the export of the Platform or its services is prohibited by applicable law.
        </p>
        <p>
          You agree to comply with all applicable laws, rules, and regulations in connection with your use of the Platform, including but not limited to those relating to data protection, privacy, intellectual property, and export control. You further agree not to use the Platform for any purpose that is unlawful or prohibited by these Terms & Conditions.
        </p>
        <p>
          The Platform is not intended for use by children under the age of eighteen (18), and Nakshatra Gyaan does not knowingly collect personal information from children under this age. If you are under eighteen (18) years of age, you may not use the Platform or provide any information to Nakshatra Gyaan. If Nakshatra Gyaan becomes aware that personal information from a child under eighteen (18) has been collected, it will take steps to delete such information as soon as possible.
        </p>
        <p>
          The official language of these Terms & Conditions is English. Any translation of these Terms & Conditions is provided for convenience only. In the event of any conflict between the English version and a translated version, the English version shall prevail.
        </p>
        <p>
          By using the Platform, you consent to receive electronic communications from Nakshatra Gyaan, including notices, agreements, legally required disclosures, and other information in connection with the Platform. Electronic communications may be delivered via email, through the Platform, or by posting on the Platform. You agree that all electronic communications satisfy any legal requirement that such communications be in writing.
        </p>
        <p>
          If any provision of these Terms & Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. The invalid, illegal, or unenforceable provision shall be deemed modified to the minimum extent necessary to make it valid, legal, and enforceable.
        </p>
        <div className="mt-12 flex flex-col gap-4">
          <button className="w-fit px-8 py-4 rounded-md text-lg font-semibold bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white hover:brightness-110 transition-all shadow-lg">I Agree to the Terms & Conditions</button>
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
