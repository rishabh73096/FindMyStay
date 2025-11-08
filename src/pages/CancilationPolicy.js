// pages/cancellation-policy.jsx
import React from "react";
import PolicyLayout from "../../components/PolicyLayout";

export default function CancellationPolicy() {
  return (
    <PolicyLayout title="Cancellation Policy">
      <section>
        <h2>General Policy</h2>
        <p>
          Cancellation rules depend on the property owner and the specific
          listing. When you book, the listing’s cancellation terms are shown on
          the booking page — please review them carefully before you confirm a
          reservation.
        </p>
      </section>

      <section>
        <h2>Typical Scenarios</h2>
        <ul>
          <li>
            <strong>Flexible:</strong> Full refund if cancelled within 24–48
            hours before check-in (owner-dependent).
          </li>
          <li>
            <strong>Moderate:</strong> Partial refund for cancellations made
            several days in advance.
          </li>
          <li>
            <strong>Strict:</strong> No refund for cancellations made after a
            set date/time. These are applied by some owners for high-demand
            dates.
          </li>
        </ul>
      </section>

      <section>
        <h2>Owner-Managed Refunds</h2>
        <p>
          Refunds and chargebacks are processed by the payment provider per the
          owner’s policy. Find My Stay can assist with disputes but does not
          directly control refund processing for third-party gateways.
        </p>
      </section>

      <section>
        <h2>Exceptional Circumstances</h2>
        <p>
          For events like natural disasters or safety concerns, owners and
          Find My Stay may offer flexible solutions. Contact support if you
          believe your case qualifies.
        </p>
      </section>
    </PolicyLayout>
  );
}
