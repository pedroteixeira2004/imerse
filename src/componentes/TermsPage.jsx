import React from "react";
import Background from "./background";
import BackButton from "./BackButton";
const TermsPage = () => {
  return (
    <section className="min-h-screen text-white px-6 py-20 font-sf">
      <Background />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          <BackButton />
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Terms and Conditions
          </h1>
        </div>

        <p className="text-white/70 mb-8 text-sm text-center">
          Effective Date: 2025/06/25
        </p>

        <div className="space-y-10 text-white/90 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the IMERSE platform ("Service", "Platform"),
              you agree to be legally bound by these Terms and Conditions. If
              you do not agree, please discontinue use of the Service
              immediately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. Platform Description
            </h2>
            <p>
              IMERSE is an AI-powered platform that analyzes video game reviews
              and feedback to provide actionable insights to developers,
              studios, and researchers. The platform utilizes third-party APIs,
              to deliver its services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. Third-Party Services and Data Sources
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Steam Integration:</strong> IMERSE retrieves publicly
                available game data and player reviews through Steam’s public
                API. IMERSE is not affiliated with or endorsed by Steam or Valve
                Corporation.
              </li>
              <li>
                <strong>Google Gemini API:</strong> Some AI-generated insights
                and responses are powered by Google Gemini. Content may reflect
                the limitations of current AI technologies.
              </li>
              <li>
                <strong>Firebase:</strong> User data, authentication, and
                interactions are securely managed and stored via Firebase
                services.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. User Accounts</h2>
            <p>
              You are responsible for keeping your login credentials secure and
              up-to-date. All personal data is processed in accordance with our{" "}
              <a href="/privacy" className="underline text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Paid Reports and Intellectual Property
            </h2>
            <p>
              Certain features include paid reports authored by third-party
              contributors. These reports are protected by copyright and may not
              be copied or redistributed without permission. Authors are
              credited, and rights remain with Imerse or named creators.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Acceptable Use</h2>
            <p>
              You agree not to misuse the platform, including
              reverse-engineering, automating access without permission, or
              using the platform for illegal activities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              7. Content and Accuracy
            </h2>
            <p>
              Insights are based on public user reviews and AI models and are
              not a replacement for professional research or advice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
            <p>
              We reserve the right to terminate your access for violations of
              these terms or any misuse of the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              IMERSE is not liable for any damages resulting from use of the
              platform, including indirect or consequential losses.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">10. Privacy Policy</h2>
            <p>
              IMERSE values and respects your privacy. We collect and store only
              the necessary user data to provide our services, including login
              credentials, user preferences, and interaction history. This
              information is stored securely using Google Firebase.
            </p>
            <p className="mt-4">
              Data related to game reviews is collected through public Steam
              APIs and does not include personal information. We do not sell or
              share your personal data with third parties, except as required to
              operate the platform or comply with legal obligations.
            </p>
            <p className="mt-4">
              By using Imerse, you consent to the collection and use of your
              information in accordance with this privacy policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              11. Changes to Terms
            </h2>
            <p>
              These terms may be updated periodically. Continued use implies
              acceptance of the latest version.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">12. Governing Law</h2>
            <p>These terms are governed by the laws of European Union.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">13. Contact</h2>
            <p>
              For any questions or legal concerns, contact us at:
              <br />
              📧{" "}
              <a
                href="mailto:contact@imerse.ai"
                className="underline text-white"
              >
                contact@imerse.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
