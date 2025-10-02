import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Loader2, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import ContactFormInline from "@/components/ContactFormInline";

interface Message {
  role: "user" | "assistant";
  content: string;
  showContactForm?: boolean;
  contactFormReason?: string;
  showCredentialsDownload?: boolean;
  credentialsReason?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm here to help you learn about Epilog. Ask me anything about our services, past projects, or how we can help your brand grow!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const suggestedQuestions = [
    "What services do you offer?",
    "Tell me about your past projects",
    "How much does it cost?",
  ];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agency-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";
      let showContactForm = false;
      let contactFormReason = "";
      let showCredentialsDownload = false;
      let credentialsReason = "";

      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "" || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            
            // Check for tool calls
            const toolCalls = parsed.choices?.[0]?.delta?.tool_calls;
            if (toolCalls && toolCalls.length > 0) {
              const toolCall = toolCalls[0];
              if (toolCall.function?.name === "show_contact_form") {
                try {
                  const args = JSON.parse(toolCall.function.arguments);
                  showContactForm = true;
                  contactFormReason = args.reason || "";
                } catch (e) {
                  console.error("Error parsing tool arguments:", e);
                }
              } else if (toolCall.function?.name === "offer_credentials_download") {
                try {
                  const args = JSON.parse(toolCall.function.arguments);
                  showCredentialsDownload = true;
                  credentialsReason = args.reason || "";
                } catch (e) {
                  console.error("Error parsing tool arguments:", e);
                }
              }
            }
            
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages([
                ...newMessages,
                { 
                  role: "assistant", 
                  content: assistantMessage,
                  showContactForm,
                  contactFormReason,
                  showCredentialsDownload,
                  credentialsReason
                },
              ]);
            }
          } catch (e) {
            console.error("Parse error:", e);
          }
        }
      }

      // Update final message with contact form flag if needed
      if (showContactForm) {
        setMessages([
          ...newMessages,
          { 
            role: "assistant", 
            content: assistantMessage || "I'd love to help you with that! Please fill in your details below and our team will get back to you soon.",
            showContactForm: true,
            contactFormReason
          },
        ]);
      }

      // Update final message with credentials download if needed
      if (showCredentialsDownload) {
        setMessages([
          ...newMessages,
          { 
            role: "assistant", 
            content: assistantMessage,
            showCredentialsDownload: true,
            credentialsReason
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    streamChat(input.trim());
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Chat Container with Glassmorphism */}
      <div className="glass rounded-3xl overflow-hidden shadow-lg">
        {/* Messages Area */}
        <div className="h-[45vh] overflow-y-auto p-6 space-y-4">
          <div ref={messagesContainerRef} className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-foreground text-background"
                      : "glass"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <>
                      <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:font-semibold prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:font-semibold prose-strong:text-foreground">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                      {message.showContactForm && (
                        <div className="mt-4">
                          <ContactFormInline
                            reason={message.contactFormReason}
                            onSuccess={() => {
                              setMessages(prev => [
                                ...prev,
                                {
                                  role: "assistant",
                                  content: "Thank you! We've received your message and will get back to you within 24 hours. Is there anything else I can help you with?"
                                }
                              ]);
                            }}
                          />
                        </div>
                      )}
                      {message.showCredentialsDownload && (
                        <div className="mt-4 p-4 bg-background/50 rounded-xl border border-border/50">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">Download Our Full Credentials</h4>
                              <p className="text-sm text-muted-foreground">
                                50+ pages with video samples, detailed case studies, metrics, and our complete portfolio.
                              </p>
                            </div>
                          </div>
                          <Button 
                            className="w-full group" 
                            asChild
                          >
                            <a 
                              href="/EPILOG_Credentials_2025.pdf" 
                              download="EPILOG_Credentials_2025.pdf"
                              className="flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4 group-hover:animate-bounce" />
                              Download PDF (2.5 MB)
                            </a>
                          </Button>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Or continue asking me questions - I'm here to help! 😊
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="glass rounded-2xl px-5 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Questions - Show when only welcome message exists */}
        {messages.length === 1 && (
          <div className="px-6 pb-4 space-y-3 animate-fade-in">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Quick questions</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="glass px-4 py-2 text-sm text-foreground rounded-full hover:bg-background transition-all hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Epilog..."
                disabled={isLoading}
                className="h-12 glass text-foreground placeholder:text-muted-foreground pr-6 rounded-full focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-12 w-12 bg-foreground hover:bg-foreground/90 text-background rounded-full disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
