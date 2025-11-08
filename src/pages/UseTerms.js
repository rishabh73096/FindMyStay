// pages/terms-of-service.jsx
import React from "react";
import PolicyLayout from "../../components/PolicyLayout";

export default function TermsOfService() {
  return (
    <PolicyLayout title="Terms of Service">
      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to Find My Stay. These Terms of Service ("Terms") govern your
          use of our website and services for discovering, booking, and listing
          rooms, PGs, and other short- or long-term stays. By using the platform
          you agree to these terms.
        </p>
      </section>

      <section>
        <h2>Services</h2>
        <p>
          Find My Stay acts as a platform connecting property owners and
          prospective tenants. We provide listing, search, messaging, booking,
          and payment facilitation features. We do not own the properties listed
          on the platform unless explicitly stated.
        </p>
      </section>

      <section>
        <h2>Booking & Payments</h2>
        <p>
          Bookings made on Find My Stay create an agreement between the tenant
          and the owner. Payment processing may be handled by third-party
          providers. Users must ensure the accuracy of booking details (dates,
          guests, and payment). Cancellations and refunds follow the property's
          cancellation policy.
        </p>
      </section>

      <section>
        <h2>User Responsibilities</h2>
        <ul>
          <li>Provide accurate details when creating listings or profiles.</li>
          <li>Follow house rules and local laws while staying at a property.</li>
          <li>Respect check-in / check-out times and keep the property in good condition.</li>
        </ul>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          Find My Stay is a facilitator; we do not assume liability for the
          condition of properties, personal injury, or third-party actions.
          Users should exercise due diligence and read listing information
          carefully before booking.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. We recommend reviewing
          this page periodically. Continued use after changes implies acceptance.
        </p>
      </section>
    </PolicyLayout>
  );
}
