"use client";
// This page intentionally hides the Header for a legal/standalone look.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const PrivacyPolicyPage = () => {
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
          <h1 className="text-4xl font-bold mb-2" style={{textAlign: 'left'}}>Privacy Policy</h1>
          <p className="text-lg mb-6" style={{textAlign: 'left'}}>Last updated: January 1, 2024</p>
        </div>
        <p>
          This Privacy Policy describes how Nakshatra Gyaan ("the Platform") collects, uses, discloses, and protects your personal information when you access or use our services. By using the Platform, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy. If you do not agree with our practices, please do not use the Platform.
        </p>
        <p>
          We collect personal information that you voluntarily provide to us when you register for an account, fill out forms, make purchases, subscribe to newsletters, or otherwise interact with the Platform. This information may include your name, email address, phone number, postal address, payment information, and any other details you choose to provide. We may also collect information automatically through cookies, web beacons, and similar technologies, such as your IP address, browser type, device identifiers, and browsing activity.
        </p>
        <p>
          The information we collect is used to provide, maintain, and improve our services, process transactions, communicate with you, personalize your experience, send you marketing and promotional materials, and comply with legal obligations. We may also use your information to analyze usage trends, monitor the effectiveness of our marketing campaigns, and enhance the security of the Platform.
        </p>
        <p>
          We may share your personal information with trusted third-party service providers who assist us in operating the Platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also disclose your information if required to do so by law, in response to valid requests by public authorities, or to protect the rights, property, or safety of Nakshatra Gyaan, our users, or others.
        </p>
        <p>
          Cookies and similar tracking technologies are used to enhance your experience on the Platform, remember your preferences, analyze site traffic, and deliver targeted advertisements. You can control the use of cookies through your browser settings, but disabling cookies may affect the functionality of the Platform.
        </p>
        <p>
          We implement a variety of security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. These measures include encryption, access controls, secure servers, and regular security assessments. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </p>
        <p>
          Your personal information will be retained only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. When your information is no longer required, we will securely delete or anonymize it in accordance with applicable laws and regulations.
        </p>
        <p>
          You have the right to access, correct, update, or delete your personal information at any time. You may also object to or restrict certain processing of your data, withdraw your consent where processing is based on consent, and request a copy of your information in a portable format. To exercise these rights, please contact us at support@nakshatragyaan.com.
        </p>
        <p>
          The Platform may contain links to third-party websites, services, or applications that are not operated or controlled by Nakshatra Gyaan. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>
        <p>
          If you choose to submit testimonials, reviews, or other content for publication on the Platform, such content may be publicly available and could be read, collected, or used by others. Please exercise caution when deciding to disclose any personal information in public areas of the Platform.
        </p>
        <p>
          We may transfer, process, and store your personal information in countries other than your own, where data protection laws may differ. By using the Platform, you consent to the transfer of your information to countries outside your country of residence, including the United States and India, as necessary to provide our services.
        </p>
        <p>
          The Platform is not intended for use by children under the age of eighteen (18), and we do not knowingly collect personal information from children under this age. If we become aware that we have collected personal information from a child under eighteen (18), we will take steps to delete such information as soon as possible.
        </p>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. We will notify you of any material changes by posting the new Privacy Policy on the Platform and updating the "Last updated" date. Your continued use of the Platform after such changes constitutes your acceptance of the revised Privacy Policy.
        </p>
        <p>
          You may opt out of receiving marketing and promotional communications from us by following the unsubscribe instructions included in such communications or by contacting us directly. Please note that even if you opt out of marketing emails, we may still send you transactional or administrative messages related to your account or use of the Platform.
        </p>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <a href="mailto:support@nakshatragyaan.com" className="underline">support@nakshatragyaan.com</a>. We are committed to resolving any complaints or disputes regarding the use of your personal information in a fair and timely manner.
        </p>
        <p>
          By using the Platform, you consent to the collection, use, disclosure, and processing of your personal information as described in this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of the Platform immediately.
        </p>
        <p>
          This Privacy Policy is governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or relating to this Privacy Policy or the Platform shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>
        <p>
          Nakshatra Gyaan may collect biometric data, such as facial recognition or fingerprint information, only with your explicit consent and solely for the purposes disclosed at the time of collection. Biometric data will be stored securely and processed in accordance with applicable laws and regulations. We do not use biometric data for any purpose other than those expressly stated in this Privacy Policy or as required by law.
        </p>
        <p>
          The Platform may utilize artificial intelligence and automated decision-making technologies to enhance user experience, personalize content, and improve service delivery. Any decisions that significantly affect your rights or interests will be subject to human review upon request, and you have the right to contest such decisions and obtain an explanation of the logic involved.
        </p>
        <p>
          You have the right to data portability, which allows you to obtain and reuse your personal information for your own purposes across different services. Upon request, we will provide you with a copy of your personal data in a structured, commonly used, and machine-readable format, subject to applicable legal requirements and limitations.
        </p>
        <p>
          As a data subject, you have the right to request access to your personal information, rectify inaccuracies, erase data, restrict processing, object to processing, and exercise your right to data portability. We will respond to all legitimate requests within the timeframes required by law and may require verification of your identity before fulfilling your request.
        </p>
        <p>
          In the unlikely event of a data breach that compromises the security, confidentiality, or integrity of your personal information, we will notify you and relevant authorities as required by applicable law. Our breach notification procedures are designed to ensure timely and transparent communication in the event of a security incident.
        </p>
        <p>
          We adhere to the principle of data minimization, collecting only the personal information that is necessary for the purposes stated in this Privacy Policy. We regularly review our data collection practices to ensure that we do not retain unnecessary or excessive information and that all data is processed lawfully, fairly, and transparently.
        </p>
        <p>
          Nakshatra Gyaan is committed to maintaining the accuracy and completeness of your personal information. You are encouraged to review and update your information regularly to ensure its accuracy. We will take reasonable steps to correct or delete inaccurate or incomplete data upon request.
        </p>
        <p>
          Profiling may be used to analyze user preferences, behaviors, and interests in order to provide personalized content, recommendations, and advertisements. You have the right to object to profiling and to request information about the logic, significance, and consequences of any automated processing that involves your personal data.
        </p>
        <p>
          Cross-border transfers of personal information may occur when we use third-party service providers or store data on servers located outside your country of residence. We implement appropriate safeguards, such as standard contractual clauses or other legal mechanisms, to ensure that your data is protected in accordance with applicable privacy laws.
        </p>
        <p>
          Third-party processors who process personal information on our behalf are contractually obligated to implement appropriate technical and organizational measures to protect your data and to process it only in accordance with our instructions. We conduct due diligence and regularly review the privacy and security practices of our third-party processors.
        </p>
        <p>
          We may be required to disclose your personal information in response to lawful requests by government authorities, including to meet national security or law enforcement requirements. Such disclosures will be made in accordance with applicable laws and with due regard for your privacy rights.
        </p>
        <p>
          Your consent is the legal basis for certain types of data processing activities. Where consent is required, you have the right to withdraw your consent at any time without affecting the lawfulness of processing based on consent before its withdrawal. Withdrawal of consent may affect your ability to use certain features or services on the Platform.
        </p>
        <p>
          You may opt out of certain data processing activities, such as targeted advertising or the sale of personal information, by following the instructions provided in this Privacy Policy or by contacting us directly. We will honor all valid opt-out requests in accordance with applicable laws and regulations.
        </p>
        <p>
          The data controller responsible for your personal information is Nakshatra Gyaan. If you have any questions, concerns, or requests regarding your data or this Privacy Policy, you may contact our Data Protection Officer at <a href="mailto:support@nakshatragyaan.com" className="underline">support@nakshatragyaan.com</a>.
        </p>
        <p>
          Nakshatra Gyaan is committed to privacy by design and by default, meaning that we integrate data protection principles into the development and operation of our services. We regularly review and update our privacy practices to ensure compliance with evolving legal requirements and industry standards.
        </p>
        <p>
          [PARAGRAPH 1: Lawful Basis for Processing] At Nakshatra Gyaan, the lawful basis for processing your personal data is determined by the nature of your interaction with our Platform and the specific services you utilize. We process your personal information only when we have a valid legal ground to do so, which may include your explicit consent, the necessity of processing for the performance of a contract to which you are a party, compliance with a legal obligation to which we are subject, or the pursuit of our legitimate interests, provided that such interests are not overridden by your fundamental rights and freedoms. In circumstances where we rely on your consent, you have the right to withdraw it at any time, and we will cease processing your data for the purposes for which consent was obtained. Our commitment to transparency ensures that you are informed of the specific lawful basis applicable to each processing activity, and we maintain detailed records to demonstrate our compliance with applicable data protection laws. We regularly review our processing activities to ensure that all personal data is handled in accordance with the highest standards of legal and ethical responsibility, and we are dedicated to upholding your rights as a data subject under all relevant legislation.
        </p>
        <p>
          [PARAGRAPH 2: Legitimate Interests] In certain cases, Nakshatra Gyaan may process your personal information based on our legitimate interests, which are carefully balanced against your privacy rights and interests. Legitimate interests may include, but are not limited to, improving our services, enhancing user experience, conducting analytics, preventing fraud, ensuring network and information security, and promoting our business objectives. Before relying on legitimate interests as a basis for processing, we conduct a thorough assessment to ensure that such processing is necessary, proportionate, and does not unduly impact your rights or freedoms. You have the right to object to processing based on legitimate interests at any time, and we will honor your objection unless we can demonstrate compelling legitimate grounds for the processing that override your interests, rights, and freedoms, or where the processing is necessary for the establishment, exercise, or defense of legal claims. Our approach to legitimate interests is rooted in accountability and transparency, and we are committed to providing you with clear information about how and why your data is processed under this legal basis.
        </p>
        <p>
          [PARAGRAPH 3: User Profiling and Analytics] Nakshatra Gyaan may employ user profiling and advanced analytics to better understand user preferences, behaviors, and engagement with our Platform. Profiling involves the automated processing of personal data to evaluate certain aspects relating to you, such as your interests, reliability, or behavior patterns. This enables us to deliver personalized content, recommendations, and targeted advertisements that are most relevant to you. We use a combination of first-party and third-party analytics tools, ensuring that all data is processed in compliance with applicable privacy laws and industry standards. You have the right to object to profiling and to request information about the logic, significance, and potential consequences of any automated processing that involves your personal data. We are committed to providing meaningful choices regarding the use of your data for profiling and analytics, and you may opt out of such processing at any time by contacting us or adjusting your privacy settings on the Platform.
        </p>
        <p>
          [PARAGRAPH 4: International Data Transfers] Your personal information may be transferred to, stored in, or processed in countries outside your country of residence, including jurisdictions that may not provide the same level of data protection as your home country. Nakshatra Gyaan takes all necessary steps to ensure that such international data transfers are conducted in accordance with applicable laws and that your data remains protected at all times. We implement appropriate safeguards, such as standard contractual clauses approved by relevant authorities, binding corporate rules, or other legal mechanisms, to ensure the security and confidentiality of your information during cross-border transfers. By using our Platform, you expressly consent to the transfer of your personal data to countries outside your jurisdiction, and you acknowledge that such transfers are necessary for the provision of our services and the fulfillment of our contractual obligations to you.
        </p>
        <p>
          [PARAGRAPH 5: Third-Party Data Sharing] Nakshatra Gyaan may share your personal information with carefully selected third-party partners, service providers, and affiliates who assist us in delivering our services, processing transactions, or supporting our business operations. All third parties with whom we share data are contractually obligated to implement robust security measures and to process your information only in accordance with our instructions and applicable law. We do not sell your personal data to third parties for their own marketing purposes without your explicit consent. In cases where third-party data sharing is required by law, regulation, or court order, we will disclose only the minimum amount of information necessary to comply with such legal obligations. We maintain a comprehensive register of all third-party data sharing arrangements and regularly review these relationships to ensure ongoing compliance with privacy standards.
        </p>
        <p>
          [PARAGRAPH 6: Data Subject Access Requests] As a user of Nakshatra Gyaan, you have the right to submit a data subject access request (DSAR) to obtain information about the personal data we hold about you, the purposes for which it is processed, the categories of data involved, and the recipients or categories of recipients to whom your data has been disclosed. Upon receiving a DSAR, we will respond within the timeframes prescribed by applicable law, providing you with a copy of your personal data in a structured, commonly used, and machine-readable format. We may require you to verify your identity before fulfilling your request to ensure the security and confidentiality of your information. If you believe that any data we hold about you is inaccurate or incomplete, you have the right to request rectification or completion of such data.
        </p>
        <p>
          [PARAGRAPH 7: Right to Erasure] You have the right to request the erasure of your personal data, also known as the "right to be forgotten," under certain circumstances. This right may be exercised when the data is no longer necessary for the purposes for which it was collected, when you withdraw your consent and there is no other legal ground for processing, or when the data has been unlawfully processed. Upon receiving a valid erasure request, Nakshatra Gyaan will take reasonable steps to delete your personal information from our systems and notify any third parties with whom your data has been shared, unless retention is required by law or for the establishment, exercise, or defense of legal claims. We are committed to honoring your right to erasure in accordance with applicable legal requirements.
        </p>
        <p>
          [PARAGRAPH 8: Right to Restrict Processing] In certain situations, you have the right to request the restriction of processing of your personal data. This may apply when you contest the accuracy of the data, when the processing is unlawful but you oppose erasure, when we no longer need the data but you require it for legal claims, or when you have objected to processing pending verification of our legitimate grounds. When processing is restricted, we will store your data but will not process it further without your consent, except as required by law. We will inform you before any restriction is lifted and will notify any third parties to whom your data has been disclosed of the restriction, where feasible.
        </p>
        <p>
          [PARAGRAPH 9: Right to Object] You have the right to object to the processing of your personal data at any time, particularly where processing is based on legitimate interests or for direct marketing purposes. Upon receiving an objection, Nakshatra Gyaan will cease processing your data for the relevant purposes unless we can demonstrate compelling legitimate grounds for the processing that override your interests, rights, and freedoms, or where processing is necessary for the establishment, exercise, or defense of legal claims. We are committed to respecting your preferences and providing you with clear mechanisms to exercise your right to object.
        </p>
        <p>
          [PARAGRAPH 10: Data Portability] The right to data portability allows you to receive your personal data in a structured, commonly used, and machine-readable format and to transmit that data to another controller without hindrance. Nakshatra Gyaan will facilitate the transfer of your data to you or to a third party of your choice, where technically feasible, in accordance with applicable legal requirements. This right applies only to data provided by you and processed by automated means, and it is subject to certain limitations and exceptions as prescribed by law.
        </p>
        <p>
          [PARAGRAPH 11: Automated Decision-Making] Nakshatra Gyaan may use automated decision-making processes, including profiling, to enhance the efficiency and effectiveness of our services. However, we do not make decisions based solely on automated processing that produce legal effects or similarly significant impacts on you without your explicit consent or unless otherwise permitted by law. You have the right to request human intervention, to express your point of view, and to contest any automated decisions that affect your rights or interests.
        </p>
        <p>
          [PARAGRAPH 12: Breach Notification] In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, Nakshatra Gyaan will notify you and the relevant supervisory authorities without undue delay, in accordance with applicable legal requirements. Our breach notification procedures are designed to ensure timely, transparent, and effective communication, enabling you to take appropriate measures to protect your interests. We are committed to maintaining robust incident response protocols and to learning from any security incidents to continuously improve our data protection practices.
        </p>
        <p>
          [PARAGRAPH 13: Data Minimization] Nakshatra Gyaan adheres to the principle of data minimization, collecting and processing only the personal information that is necessary for the specified purposes outlined in this Privacy Policy. We regularly review our data collection and retention practices to ensure that we do not retain data longer than necessary and that all processing activities are justified, proportionate, and transparent. Our commitment to data minimization helps to reduce the risk of unauthorized access, use, or disclosure of your information.
        </p>
        <p>
          [PARAGRAPH 14: Privacy by Design and Default] Privacy by design and by default is a core principle at Nakshatra Gyaan, guiding the development, implementation, and operation of our services. We integrate data protection measures into our business processes, systems, and technologies from the outset, ensuring that privacy considerations are embedded at every stage. Our approach includes regular privacy impact assessments, staff training, and the adoption of best practices to safeguard your personal information and to comply with evolving legal and regulatory requirements.
        </p>
        <p>
          [PARAGRAPH 15: Data Protection Officer and Contact] Nakshatra Gyaan has appointed a Data Protection Officer (DPO) responsible for overseeing our data protection strategy and ensuring compliance with applicable privacy laws. The DPO serves as a point of contact for data subjects, supervisory authorities, and other stakeholders regarding privacy matters. If you have any questions, concerns, or requests relating to your personal information or this Privacy Policy, you may contact our DPO at <a href="mailto:support@nakshatragyaan.com" className="underline">support@nakshatragyaan.com</a>. We are committed to addressing your inquiries promptly and to upholding the highest standards of data protection and privacy.
        </p>
        <div className="mt-12 flex flex-col gap-4">
          <button className="w-fit px-8 py-4 rounded-md text-lg font-semibold bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white hover:brightness-110 transition-all shadow-lg">I Agree to the Privacy Policy</button>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#a084ee] to-[#f857a6] hover:brightness-110">
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 