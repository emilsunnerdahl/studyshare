import LegalContentSection from "@/components/legal/legalSections";

export default function Terms() {
  return (
    <main className="min-h-screen py-10">
      <LegalContentSection
        header="Terms and Conditions"
        text={`Welcome to Studyshare. By accessing or using our website and related services (the “Service”), you agree to these Terms and Conditions (“Terms”). Please read them carefully before using the platform.
                Studyshare is a platform created for students at Lund University to share written reviews and feedback about courses they have taken. By using Studyshare, you confirm that you are a current student at Lund University and that the information you provide is accurate and lawful.`}
      />

      <LegalContentSection
        subheader="Services Provided"
        text={`Studyshare allows students to submit and read text-based reviews about past courses at Lund University. The purpose of the platform is to promote transparency, help students make informed decisions about courses, and encourage constructive academic feedback.`}
        points={[
          "Submit text reviews of completed courses at Lund University",
          "Access other students’ reviews and feedback",
          "Search and browse reviews based on program or faculty",
        ]}
      />

      <LegalContentSection
        subheader="User Eligibility"
        text={`To use Studyshare, you must be a current student at Lund University and sign in using your official Lund University email address ending in @student.lu.se. By using the Service, you confirm that your access credentials are genuine and that you are using the platform in accordance with Lund University’s student conduct guidelines.`}
      />

      <LegalContentSection
        subheader="Prohibited Content"
        text="You may not upload, post, or share any unlawful, inappropriate, or false information through Studyshare. This includes, but is not limited to:"
        points={[
          "Offensive, harassing, or discriminatory statements",
          "Defamatory or false information about individuals or the university",
          "Confidential exam material, copyrighted content, or private communications",
          "Spam, advertisements, or irrelevant content unrelated to course feedback",
        ]}
      />

      <LegalContentSection
        subheader="Moderation and Content Management"
        text={`Studyshare reserves the right to monitor, edit, or remove any content that violates these Terms or is otherwise deemed inappropriate. While we aim to maintain an open and respectful platform, we may take action at our discretion to protect users and uphold community standards.`}
      />

      <LegalContentSection
        subheader="User Responsibilities"
        text="By using Studyshare, you agree to:"
        points={[
          "Provide honest and respectful feedback in all reviews",
          "Avoid impersonating others or misrepresenting your affiliation",
          "Comply with applicable laws and university regulations",
          "Not attempt to disrupt, hack, or misuse the platform in any way",
        ]}
      />

      <LegalContentSection
        subheader="Data Retention & Deletion"
        text={`Studyshare stores user-generated reviews and account information for as long as your account remains active. If you delete your account, all personal data and submitted reviews will be permanently deleted within three (3) months in accordance with our Privacy Policy.`}
      />

      <LegalContentSection
        subheader="Limitation of Liability"
        text={`Studyshare is provided “as is.” To the maximum extent permitted by law, Studyshare and its operators are not liable for any direct, indirect, or consequential damages arising from the use or inability to use the Service. We do not guarantee the accuracy, completeness, or reliability of any user-submitted reviews or data.`}
      />

      <LegalContentSection
        subheader="Governing Law"
        text={`These Terms are governed by the laws of Sweden. Any disputes arising under or in connection with these Terms will be handled by the competent courts of Sweden.`}
      />

      {/* <LegalContentSection
        subheader="Contact"
        text={`Questions, feedback, or data requests may be directed to: support@studyshare.app`}
      /> */}
    </main>
  );
}