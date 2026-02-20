"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { contactFormText } from "@/content/contact";
import { useContactForm } from "@/features/contact/contact.hooks";
import {
  PublicDialog,
  PublicDialogContent,
  PublicDialogHeader,
  PublicDialogTitle,
  PublicDialogDescription,
} from "@/components/ui/public-dialog";
import { Loader2 } from "lucide-react";

export function ContactFormSection() {
  const {
    formData,
    errors,
    isLoading,
    dialogConfig,
    handleChange,
    handleSubmit,
    closeDialog,
  } = useContactForm();

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
          <form onSubmit={handleSubmit} className="w-full" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  disabled={isLoading}
                  className={`w-full bg-white border ${
                    errors.name ? "border-red-500" : "border-transparent"
                  } focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 shadow-sm disabled:opacity-50`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Alamat Email"
                  disabled={isLoading}
                  className={`w-full bg-white border ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 shadow-sm disabled:opacity-50`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ketik pesan Anda..."
                disabled={isLoading}
                className={`w-full h-[190px] bg-white border ${
                  errors.message ? "border-red-500" : "border-transparent"
                } focus:border-[#D7DEDE] rounded-md px-[15px] py-[15px] text-[var(--pub-body)] outline-none transition-all duration-300 resize-none shadow-sm disabled:opacity-50`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="pub-btn pub-btn-accent min-w-[200px] flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  contactFormText.submitBtn
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PublicDialog open={dialogConfig.isOpen} onOpenChange={closeDialog}>
        <PublicDialogContent variant={dialogConfig.variant}>
          <PublicDialogHeader>
            <PublicDialogTitle>{dialogConfig.title}</PublicDialogTitle>
            <PublicDialogDescription>
              {dialogConfig.description}
            </PublicDialogDescription>
          </PublicDialogHeader>
        </PublicDialogContent>
      </PublicDialog>
    </section>
  );
}



