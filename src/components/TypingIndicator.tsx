const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 rounded-lg w-fit backdrop-blur-sm">
      <span className="text-sm text-muted-foreground font-light">Epilog AI is thinking</span>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default TypingIndicator;
