

import LegalContentSection from "@/components/legal/legalSections";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-10">
      <LegalContentSection
        header="Privacy Policy"
        text={`At Studyshare, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform (“Service”). By accessing or using Studyshare, you agree to the terms of this Policy.`}
      />

      <LegalContentSection
        subheader="1. Information We Collect"
        text={`We collect personal and usage data to operate the Studyshare platform and provide a secure experience for all users. This includes:`}
        points={[
          "Basic account details such as your name and Lund University student email (@student.lu.se)",
          "Information you voluntarily provide in your course reviews",
          "Technical data such as IP address, browser type, and device information (for security and analytics purposes)",
        ]}
      />

      <LegalContentSection
        subheader="2. Use of Information"
        text={`We use your information to maintain and improve Studyshare. Specifically, we may use it to:`}
        points={[
          "Authenticate users with their Lund University email account",
          "Display your submitted reviews to other registered users",
          "Ensure platform security and prevent misuse",
          "Analyze site usage to enhance performance and user experience",
          "Comply with applicable Swedish laws and university guidelines",
        ]}
      />

      <LegalContentSection
        subheader="3. Sharing of Information"
        text={`Studyshare does not sell or rent your personal data. We only share data when necessary for the operation of the Service or when legally required. For example:`}
        points={[
          "With trusted service providers who help maintain our platform (e.g., hosting, authentication systems)",
          "If required by law, regulation, or a valid legal process",
          "To protect the rights, property, or safety of Studyshare, our users, or others",
        ]}
      />

      <LegalContentSection
        subheader="4. Content Visibility"
        text={`Your course reviews will be visible to other registered Lund University students using the platform. We recommend that you avoid sharing personally identifying details within your reviews.`}
      />

      <LegalContentSection
        subheader="5. Data Retention and Deletion"
        text={`We retain your account and associated content for as long as your Studyshare account is active. If you delete your account, all associated data — including personal details and submitted reviews — will be permanently deleted within three (3) months, except as required by law.`}
      />

      <LegalContentSection
        subheader="6. Security"
        text={`We take reasonable measures to protect your information from unauthorized access, loss, or misuse. However, no online service is completely secure, and we cannot guarantee absolute security of transmitted data.`}
      />

      <LegalContentSection
        subheader="7. Your Rights"
        text={`As a user, you have the right to:`}
        points={[
          "Access the personal data we hold about you",
          "Request correction of inaccurate or outdated information",
          "Request deletion of your account and associated data",
          "Withdraw consent for data processing where applicable",
        ]}
      />

      <LegalContentSection
        subheader="8. Cookies and Analytics"
        text={`Studyshare may use cookies and analytics tools to understand how the platform is used and to improve functionality. Cookies do not store personal information but help us identify session activity and usage trends.`}
      />

      <LegalContentSection
        subheader="9. Updates to This Policy"
        text={`We may update this Privacy Policy from time to time. If significant changes are made, we will notify users through the platform or via email. Continued use of the Service after updates constitutes acceptance of the revised Policy.`}
      />

      {/* <LegalContentSection
        subheader="10. Contact"
        text={`If you have questions about this Privacy Policy, your personal data, or how it is used, please contact us at: support@studyshare.app`}
      /> */}
    </main>
  );
}