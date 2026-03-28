import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import Layout from "../components/layout/Layout";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3–7 business days. Express shipping (1–2 days) is available at checkout. Free shipping on orders over $150.",
  },
  {
    question: "Are your wigs made from real human hair?",
    answer: "Yes! All our wigs are made from 100% virgin human hair unless stated otherwise. We never use synthetic blends in our premium range.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all unworn, unaltered wigs in their original packaging. Sale items are final sale.",
  },
  {
    question: "How do I measure my head for the right wig size?",
    answer: "Use a soft measuring tape around your hairline — front to nape, ear to ear, and full circumference. Most of our wigs fit 21–23 inches and have adjustable straps.",
  },
  {
    question: "Can I dye or bleach my wig?",
    answer: "Yes — our human hair wigs can be coloured, bleached, and heat-styled just like natural hair. We recommend using a professional stylist for bleaching.",
  },
];

const quickReplies = [
  "Track my order",
  "Return policy",
  "How to apply a wig",
  "Shipping info",
  "Care tips",
];

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 Welcome to WigMart support. I'm your AI assistant and I'm here to help you with anything — orders, styling tips, returns, or product questions. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("track") || msg.includes("order")) {
      return "To track your order, please check your email for a shipping confirmation with a tracking link. If you can't find it, share your order number and I'll look into it for you! 📦";
    }
    if (msg.includes("return") || msg.includes("refund")) {
      return "Our return policy is simple: 30 days from delivery, unworn wigs in original packaging qualify for a full refund. Just email returns@wigmart.com with your order number. 💛";
    }
    if (msg.includes("ship") || msg.includes("delivery")) {
      return "We ship worldwide! 🌍 Standard delivery is 3–7 business days. Express is 1–2 days. Orders over $150 get free standard shipping automatically.";
    }
    if (msg.includes("care") || msg.includes("wash") || msg.includes("maintain")) {
      return "Great question! 🌟 Wash your wig every 10–15 wears with sulfate-free shampoo. Always air dry on a wig stand, and use a heat protectant before styling. Avoid sleeping in your wig to extend its life.";
    }
    if (msg.includes("apply") || msg.includes("install") || msg.includes("put on")) {
      return "Here's how to install your lace wig: 1) Braid or flatten your natural hair. 2) Put on a wig cap. 3) Cut the lace carefully. 4) Apply got2b glued or wig tape along your hairline. 5) Press and hold for 30 seconds. You're ready! 💅";
    }
    if (msg.includes("blonde") || msg.includes("color") || msg.includes("dye")) {
      return "All our human hair wigs can be coloured! For going lighter, we recommend visiting a professional stylist. For toning or going darker, most customers do it at home successfully. Always do a strand test first! ✨";
    }
    if (msg.includes("size") || msg.includes("fit") || msg.includes("measure")) {
      return "Most of our wigs fit head circumferences of 21–23 inches and have adjustable straps inside. To measure: wrap a tape measure around your hairline from your forehead to nape. Our one-size-fits-most works for 95% of customers! 📏";
    }
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hello gorgeous! 👑 How can I help you today? You can ask me about orders, shipping, returns, wig care, or anything else WigMart related!";
    }
    return "Thanks for your message! That's a great question. For specialised help, our team is available via email at support@wigmart.com or by phone Mon–Fri 9am–6pm. Is there anything else I can help with? 💛";
  };

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(messageText);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">
            We're Here For You
          </p>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
            Help & Support
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            Chat with our AI assistant instantly, or browse our FAQs below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* AI Chat */}
          <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-card flex flex-col h-[600px]">

            {/* Chat header */}
            <div className="bg-neutral-900 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">WigMart AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <p className="text-neutral-400 text-xs">Online — replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-500 text-white rounded-br-sm"
                        : "bg-white text-neutral-700 rounded-bl-sm shadow-sm border border-neutral-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-neutral-100">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 bg-white border-t border-neutral-100 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-brand-200 text-brand-600 hover:bg-brand-50 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 text-sm bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-11 h-11 bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-300 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-8">

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  detail: "support@wigmart.com",
                  sub: "Response within 24 hours",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  detail: "+234 800 WIG MART",
                  sub: "Mon–Fri, 9am–6pm WAT",
                },
              ].map(({ icon: Icon, title, detail, sub }) => (
                <div key={title} className="bg-white rounded-2xl border border-neutral-100 p-5">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <p className="font-semibold text-neutral-800 text-sm">{title}</p>
                  <p className="text-brand-600 text-sm font-medium mt-1">{detail}</p>
                  <p className="text-neutral-400 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="font-bold text-neutral-900">Frequently Asked Questions</h2>
              </div>
              <div className="divide-y divide-neutral-100">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-neutral-800 pr-4">
                        {faq.question}
                      </span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 text-brand-500 flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}