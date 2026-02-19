"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { contactFormText } from "@/content/contact";

export function ContactFormSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F5F7F7] overflow-hidden">
      <div className="pub-container">
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <SectionTitle
            subtitle={contactFormText.subtitle}
            title={contactFormText.title}
            titleClassName="text-black whitespace-pre-line"
            align="center"
          />
        </div>

        <div
          className="max-w-[1000px] mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <input
                type="text"
                placeholder="Nama Anda"
                required
                className="w-full bg-white border border-transparent focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 shadow-sm mb-6"
              />
              <input
                type="email"
                placeholder="Alamat Email"
                required
                className="w-full bg-white border border-transparent focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 shadow-sm mb-6"
              />
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Pilih Subjek"
                required
                className="w-full bg-white border border-transparent focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 shadow-sm"
              />
            </div>

            <div className="mb-8">
              <textarea
                placeholder="Ketik pesan Anda..."
                required
                className="w-full h-[190px] bg-white border border-transparent focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 resize-none shadow-sm"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="pub-btn pub-btn-accent min-w-[200px]"
              >
                {contactFormText.submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
