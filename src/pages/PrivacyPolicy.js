// pages/privacy-policy.jsx
import React from "react";
import PolicyLayout from "/components/PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <section>
        <h2>Overview</h2>
        <p>
          Your privacy matters to Find My Stay. This policy explains what
          information we collect, how we use it, and what choices you have.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <ul>
          <li>Account information (name, email, phone).</li>
          <li>Profile and listing details (for owners).</li>
          <li>Booking information (check-in/out dates, guest count).</li>
          <li>Payment information processed by secure third-party gateways.</li>
          <li>Usage data and cookies for analytics and improving the service.</li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Data</h2>
        <p>
          We use data to operate the platform (matching, payments, messaging),
          prevent fraud, personalize content, and communicate important updates.
        </p>
      </section>

      <section>
        <h2>Sharing & Third Parties</h2>
        <p>
          We share data with property owners for bookings, with payment providers
          for transaction processing, and with analytics providers. We will not
          sell your personal information.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          You can access, correct, or request deletion of your personal data.
          To exercise these rights, contact support at{" "}
          <a className="text-orange-600 dark:text-orange-400" href="mailto:support@findmystay.example">support@findmystay.example</a>.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We implement reasonable security measures, but no system is perfect.
          Please safeguard your account credentials and report suspicious activity.
        </p>
      </section>
    </PolicyLayout>
  );
}
