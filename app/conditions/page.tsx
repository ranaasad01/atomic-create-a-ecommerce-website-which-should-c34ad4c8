import Link from "next/link";

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0F2027] text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Conditions of Use</h1>
          <p className="text-[#10B981] text-sm">Last updated: January 1, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">Welcome to ShopNow</h2>
            <p>
              ShopNow.com is provided by ShopNow, Inc. By using ShopNow.com, you agree to these conditions.
              Please read them carefully. In addition, when you use any current or future ShopNow service
              (e.g., Your Profile, Gift Cards, ShopNow Video, Your Media Library, ShopNow Music, ShopNow
              Drive, ShopNow Fresh, or ShopNow Local) you also will be subject to the guidelines, terms and
              agreements applicable to that service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">1. Electronic Communications</h2>
            <p>
              When you use ShopNow.com or send e-mails to us, you are communicating with us electronically.
              You consent to receive communications from us electronically. We will communicate with you by
              e-mail or by posting notices on this site. You agree that all agreements, notices, disclosures
              and other communications that we provide to you electronically satisfy any legal requirement
              that such communications be in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">2. Copyright</h2>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, audio
              clips, digital downloads, data compilations, and software, is the property of ShopNow or its
              content suppliers and protected by international copyright laws. The compilation of all content
              on this site is the exclusive property of ShopNow, with copyright authorship for this collection
              by ShopNow, and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">3. Trademarks</h2>
            <p>
              ShopNow&apos;s trademarks and trade dress may not be used in connection with any product or
              service that is not ShopNow&apos;s, in any manner that is likely to cause confusion among
              customers, or in any manner that disparages or discredits ShopNow. All other trademarks not
              owned by ShopNow that appear on this site are the property of their respective owners, who may
              or may not be affiliated with, connected to, or sponsored by ShopNow.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">4. License and Site Access</h2>
            <p>
              ShopNow grants you a limited license to access and make personal use of this site and not to
              download (other than page caching) or modify it, or any portion of it, except with express
              written consent of ShopNow. This license does not include any resale or commercial use of this
              site or its contents; any collection and use of any product listings, descriptions, or prices;
              any derivative use of this site or its contents; any downloading or copying of account
              information for the benefit of another merchant; or any use of data mining, robots, or similar
              data gathering and extraction tools.
            </p>
            <p className="mt-3">
              This site or any portion of this site may not be reproduced, duplicated, copied, sold, resold,
              visited, or otherwise exploited for any commercial purpose without express written consent of
              ShopNow. You may not frame or utilize framing techniques to enclose any trademark, logo, or
              other proprietary information (including images, text, page layout, or form) of ShopNow and
              our associates without express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">5. Your Account</h2>
            <p>
              If you use this site, you are responsible for maintaining the confidentiality of your account
              and password and for restricting access to your computer, and you agree to accept responsibility
              for all activities that occur under your account or password. ShopNow does sell products for
              children, but it sells them to adults, who can purchase with a credit card or other permitted
              payment method. If you are under 18, you may use ShopNow.com only with involvement of a parent
              or guardian. ShopNow and its associates reserve the right to refuse service, terminate accounts,
              remove or edit content, or cancel orders in their sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">6. Reviews, Comments, Communications, and Other Content</h2>
            <p>
              Visitors may post reviews, comments, and other content; and submit suggestions, ideas,
              comments, questions, or other information, so long as the content is not illegal, obscene,
              threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or
              otherwise injurious to third parties or objectionable and does not consist of or contain
              software viruses, political campaigning, commercial solicitation, chain letters, mass mailings,
              or any form of &quot;spam.&quot;
            </p>
            <p className="mt-3">
              You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead
              as to the origin of a card or other content. ShopNow reserves the right (but not the
              obligation) to remove or edit such content, but does not regularly review posted content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">7. Product Descriptions</h2>
            <p>
              ShopNow attempts to be as accurate as possible. However, ShopNow does not warrant that product
              descriptions or other content of this site is accurate, complete, reliable, current, or
              error-free. If a product offered by ShopNow itself is not as described, your sole remedy is to
              return it in unused condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">8. Pricing</h2>
            <p>
              With respect to items sold by ShopNow, we cannot confirm the price of an item until you order.
              Despite our best efforts, a small number of the items in our catalog may be mispriced. If the
              correct price of an item sold by ShopNow is higher than our stated price, we will, at our
              discretion, either contact you for instructions before shipping or cancel your order and notify
              you of such cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">9. Disclaimer of Warranties and Limitation of Liability</h2>
            <p>
              THIS SITE IS PROVIDED BY SHOPNOW ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS.
              SHOPNOW MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE
              OPERATION OF THIS SITE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS
              SITE. YOU EXPRESSLY AGREE THAT YOUR USE OF THIS SITE IS AT YOUR SOLE RISK.
            </p>
            <p className="mt-3">
              TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, SHOPNOW DISCLAIMS ALL WARRANTIES, EXPRESS
              OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
              FOR A PARTICULAR PURPOSE. SHOPNOW DOES NOT WARRANT THAT THIS SITE, ITS SERVERS, OR E-MAIL
              SENT FROM SHOPNOW ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">10. Applicable Law</h2>
            <p>
              By visiting ShopNow.com, you agree that the laws of the state of Washington, without regard to
              principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort
              that might arise between you and ShopNow or its associates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">11. Disputes</h2>
            <p>
              Any dispute relating in any way to your visit to ShopNow.com or to products you purchase
              through ShopNow.com shall be submitted to confidential arbitration in Seattle, Washington,
              except that, to the extent you have in any manner violated or threatened to violate ShopNow&apos;s
              intellectual property rights, ShopNow may seek injunctive or other appropriate relief in any
              state or federal court in the state of Washington.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">12. Site Policies, Modification, and Severability</h2>
            <p>
              Please review our other policies, such as our pricing policy, posted on this site. These
              policies also govern your visit to ShopNow.com. We reserve the right to make changes to our
              site, policies, and these Conditions of Use at any time. If any of these conditions shall be
              deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable
              and shall not affect the validity and enforceability of any remaining condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F2027] mb-3">13. Our Address</h2>
            <div className="bg-[#F3F3F3] rounded-lg p-4 text-sm">
              <p className="font-semibold text-[#0F2027]">ShopNow, Inc.</p>
              <p>410 Terry Avenue North</p>
              <p>Seattle, WA 98109-5210</p>
              <p>United States</p>
            </div>
          </section>

          {/* Quick links */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#0F2027] mb-4">Related Policies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Privacy Notice", href: "/privacy" },
                { label: "Returns & Replacements", href: "/returns" },
                { label: "Help Center", href: "/help" },
                { label: "Sell on ShopNow", href: "/sell" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-[#10B981] hover:bg-[#f0fdf4] transition-colors duration-150 text-sm font-medium text-[#1A3A4A]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
