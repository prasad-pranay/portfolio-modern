import { useRef, useState } from "react";
import { useNotification } from "../tool/Notification";
import emailjs from "emailjs-com";

const socials = [
  { label: "GitHub", handle: "@prasad-pranay", href: "https://github.com/prasad-pranay" },
  { label: "LinkedIn", handle: "@pranay-prasad-", href: "https://www.linkedin.com/in/pranay-prasad-/" },
  { label: "Instagram", handle: "@pranayy.c3", href: "https://www.instagram.com/pranayy.c3/" },
];

export default function ContactMe() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const {show} = useNotification()
  const form_element = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to your form handler / EmailJS / Formspree here
    setSent(true);

    // if(e.name.length<0){
        show({type: "success",title: `Got Your Msg ${form.name}`,message: "I will get back to you soon",duration: 4000,})
    // }

            emailjs.sendForm("service_47zjwto", "template_q8qk90n", form_element.current, "4t_xVcQnm2u6_Gvxo").then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          console("Failed to send message.")
        }
      );

  };

  return (
    <section
    data-scroll-section
    id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-24 dark:bg-[#111]/20"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="w-full max-w-7xl" data-scroll data-scroll-repeat
                data-scroll-call="contact">

        {/* Label */}
        <p
          className="text-xs tracking-[0.4em] dark:text-[#ccc] text-[#555] uppercase mb-12"
          style={{ fontFamily: "monospace" }}
        >
          06 — Contact
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Left — headline + socials */}
          <div className="md:col-span-5 flex flex-col justify-between gap-12">
            <div>
              <h2
                className="text-[clamp(2.2rem,5vw,3.8rem)] font-normal text-[#111] dark:text-[#f0ece4] leading-[1.08]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Let's start
                <br />
                <span className="italic text-[#c9a96e]">a conversation.</span>
              </h2>
              <p className="text-sm dark:text-[#aaa] text-[#666] leading-relaxed mt-6 max-w-xs">
                I'm always open to new opportunities, collaborations, or just a good chat about tech and ideas.
              </p>
            </div>

            {/* Email direct */}
            <div>
              <p className="text-[10px] tracking-widest dark:text-[#999] text-[#444] uppercase mb-3" style={{ fontFamily: "monospace" }}>
                Or reach me directly
              </p>
              <button
                className="text-sm text-[#aaa] cursor-none target-hand hover:text-[#c9a96e] transition-colors duration-300 tracking-wide border-b border-white/10 hover:border-[#c9a96e]/40 pb-1"
                style={{ fontFamily: "monospace" }}
              >
                prasadpranay2005@gmail.com
              </button>

              {/* Socials */}
              <div className="mt-10 space-y-4">
                <p className="text-[10px] tracking-widest text-[#444] uppercase mb-4" style={{ fontFamily: "monospace" }}>
                  Find me on
                </p>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-none target-hand group flex items-center justify-between border-b border-white/6 pb-3 hover:border-[#c9a96e]/30 transition-all duration-300"
                  >
                    <span className="text-sm text-[#666] group-hover:text-[#f0ece4] transition-colors duration-300">
                      {s.label}
                    </span>
                    <span
                      className="text-xs text-[#444] group-hover:text-[#c9a96e] transition-colors duration-300"
                      style={{ fontFamily: "monospace" }}
                    >
                      {s.handle} →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-white/6 bg-black/10 dark:bg-white/[0.02]">
                <div className="w-10 h-10 border border-[#c9a96e]/40 flex items-center justify-center mb-6">
                  <span className="text-[#c9a96e] text-lg">✓</span>
                </div>
                <h3 className="text-xl text-[#f0ece4] font-normal mb-2">Message sent.</h3>
                <p className="text-sm text-[#555]">I'll get back to you soon.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-8 text-xs tracking-widest text-[#555] hover:text-[#aaa] uppercase transition-colors cursor-none target-hand"
                  style={{ fontFamily: "monospace" }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form ref={form_element} onSubmit={handleSubmit} className="space-y-0 border border-white/6 bg-black/10 dark:bg-white/[0.02]">

                {/* Name */}
                <div className={`border-b transition-colors duration-300 ${focused === "name" ? "border-[#c9a96e]/50" : "border-white/6"}`}>
                  <div className="px-6 pt-5 pb-1">
                    <label
                      className="text-[10px] tracking-widest dark:text-[#999] text-[#444] uppercase block mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      name="contact-name-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      className="cursor-none target-text w-full bg-transparent dark:placeholder-[#666] text-[#f0ece4] text-sm pb-3 outline-none placeholder-[#333] focus:placeholder-[#555] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={`border-b transition-colors duration-300 ${focused === "email" ? "border-[#c9a96e]/50" : "border-white/6"}`}>
                  <div className="px-6 pt-5 pb-1">
                    <label
                      className="text-[10px] tracking-widest dark:text-[#999] text-[#444] uppercase block mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      name="contact-name-email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      className="w-full cursor-none target-text  bg-transparent dark:placeholder-[#666] text-[#f0ece4] text-sm pb-3 outline-none placeholder-[#333] focus:placeholder-[#555] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={`border-b transition-colors duration-300 ${focused === "message" ? "border-[#c9a96e]/50" : "border-white/6"}`}>
                  <div className="px-6 pt-5 pb-1">
                    <label
                      className="text-[10px] tracking-widest dark:text-[#999] text-[#444] uppercase block mb-2"
                      style={{ fontFamily: "monospace" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="contact-name-msg"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="What's on your mind?"
                      className="w-full cursor-none target-text  bg-transparent dark:placeholder-[#666] text-[#f0ece4] text-sm pb-3 outline-none placeholder-[#333] focus:placeholder-[#555] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <p className="text-[10px] text-[#333] tracking-widest" style={{ fontFamily: "monospace" }}>
                    I reply within 24–48hrs
                  </p>
                  <button
                    type="submit"
                    className=" cursor-none target-hand text-xs tracking-[0.25em] uppercase px-6 py-3 bg-[#f0ece4] text-[#0c0c0c] hover:bg-[#c9a96e] transition-colors duration-300"
                    style={{ fontFamily: "monospace" }}
                  >
                    Send →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}