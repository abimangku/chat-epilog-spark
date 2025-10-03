import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  showContactForm?: boolean;
  contactFormReason?: string;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  input: string;
  addMessage: (message: Message) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: (loading: boolean) => void;
  setInput: (input: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm **Epilog AI**, your virtual assistant. I can answer questions about our services, past projects, pricing, and more. If you need something specific, I can connect you with our team!",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        input,
        addMessage,
        setMessages,
        setIsLoading,
        setInput,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatStore = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatStore must be used within a ChatProvider');
  }
  return context;
};
