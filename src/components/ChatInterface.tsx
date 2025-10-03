import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import ContactFormInline from "@/components/ContactFormInline";
import TypingIndicator from "./TypingIndicator";
import { useChatStore } from "@/hooks/useChatStore";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  showContactForm?: boolean;
  contactFormReason?: string;
}

interface ChatInterfaceProps {
  isFloating?: boolean;
}

const ChatInterface = ({ isFloating = false }: ChatInterfaceProps) => {
  const { messages, setMessages, isLoading, setIsLoading, input, setInput } = useChatStore();
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

  // Listen for auto-send events (from FloatingChatWidget)
  useEffect(() => {
    const handleAutoSend = ((e: CustomEvent) => {
      if (e.detail?.message && !isLoading) {
        streamChat(e.detail.message);
      }
    }) as EventListener;

    window.addEventListener('autoSendMessage', handleAutoSend);
    return () => window.removeEventListener('autoSendMessage', handleAutoSend);
  }, [isLoading]);

  const streamChat = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { 
      role: "user" as const, 
      content: userMessage,
      timestamp: new Date()
    }];
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

      setMessages([...newMessages, { 
        role: "assistant", 
        content: "",
        timestamp: new Date()
      }]);

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
                  timestamp: new Date(),
                  showContactForm,
                  contactFormReason
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
            content: "📧 **Connecting you with our team**\n\nPlease fill in your details below, and a human from Epilog will respond within 24 hours.",
            timestamp: new Date(),
            showContactForm: true,
            contactFormReason
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

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`w-full ${isFloating ? 'h-full flex flex-col' : 'max-w-4xl mx-auto'}`}>
      {/* Chat Container with Glassmorphism */}
      <div className={`glass rounded-3xl overflow-hidden shadow-lg ${isFloating ? 'flex-1 flex flex-col' : ''}`}>
        {/* Messages Area */}
        <div className={`${isFloating ? 'flex-1' : 'h-[45vh]'} overflow-y-auto p-6 space-y-4`}>
          <div ref={messagesContainerRef} className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in group`}
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
                                  content: "Thank you! We've received your message and will get back to you within 24 hours. Is there anything else I can help you with?",
                                  timestamp: new Date()
                                }
                              ]);
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Timestamp */}
                  {message.timestamp && (
                    <span className="text-xs text-muted-foreground/60 mt-2 block group-hover:opacity-100 opacity-0 transition-opacity">
                      {formatRelativeTime(message.timestamp)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <TypingIndicator />
              </div>
            )}
          </div>
        </div>

        {/* Suggested Questions - Show when only welcome message exists */}
        {messages.length === 1 && !isLoading && (
          <div className="px-6 pb-4 space-y-3 animate-fade-in">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Quick questions</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => streamChat(question)}
                  disabled={isLoading}
                  className="glass px-4 py-2 text-sm text-foreground rounded-full hover:bg-background transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
