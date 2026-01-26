"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mlgbjney", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900 md:bg-black/80 md:backdrop-blur-sm"
        >
          {/* Modal - Fullscreen on mobile, centered modal on desktop */}
          <div
            className="relative w-full h-full md:h-auto md:max-w-md bg-slate-900 md:border md:border-slate-800 md:rounded-2xl shadow-2xl overflow-y-auto"
          >
            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer z-10 hidden md:block"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="p-6 pt-20 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Let&apos;s Discuss
              </h2>
              <p className="text-neutral-400 mb-6">
                Fill in your details and I&apos;ll get back to you soon!
              </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="I would like to discuss..."
                />
              </div>

              {/* Status Message */}
              {submitStatus === "success" && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed ${
                  submitStatus === "success"
                    ? "bg-green-500"
                    : "bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50"
                }`}
              >
                {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent!" : "Send Message"}
              </button>

              {/* Cancel Button - Mobile only */}
              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-3 text-neutral-400 font-medium rounded-lg border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer md:hidden"
              >
                Cancel
              </button>
            </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
