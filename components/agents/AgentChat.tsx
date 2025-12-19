'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AIAgent, ChatMessage, AgentResponse, UserRole } from '@/types';
import { executivePrompts } from '@/data/mock-data';
import {
  Send,
  Bot,
  User,
  Loader2,
  Search,
  Brain,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { agentApi } from '@/lib/api';

interface AgentChatProps {
  agent: AIAgent;
  onBack: () => void;
  userRole?: UserRole;
}

const statusConfig = {
  thinking: { icon: Brain, text: 'Thinking...', color: 'text-purple-500' },
  searching: { icon: Search, text: 'Searching...', color: 'text-blue-500' },
  processing: { icon: Loader2, text: 'Processing...', color: 'text-amber-500' },
  complete: { icon: Check, text: 'Complete', color: 'text-green-500' },
  error: { icon: RefreshCw, text: 'Error', color: 'text-red-500' },
};

// Map agent categories to executive prompt keys
const getExecutivePromptKey = (agent: AIAgent): string | null => {
  const agentId = agent.id.toLowerCase();
  if (agentId.includes('finance') || agentId.includes('invoice') || agentId.includes('expense') || agentId.includes('budget') || agentId.includes('payroll') || agentId.includes('report')) return 'finance';
  if (agentId.includes('sales') || agentId.includes('rfp') || agentId.includes('deck') || agentId.includes('capabilities') || agentId.includes('coach')) return 'sales';
  if (agentId.includes('hr') || agentId.includes('onboarding') || agentId.includes('leave') || agentId.includes('performance') || agentId.includes('recruitment') || agentId.includes('policy')) return 'hr';
  if (agentId.includes('marketing') || agentId.includes('leads') || agentId.includes('campaign') || agentId.includes('content') || agentId.includes('social') || agentId.includes('analytics')) return 'marketing';
  if (agentId.includes('eng') || agentId.includes('training') || agentId.includes('knowledge') || agentId.includes('code') || agentId.includes('architecture') || agentId.includes('devops')) return 'engineering';
  return null;
};

export function AgentChat({ agent, onBack, userRole }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get suggested prompts - use executive prompts for C-level, otherwise agent defaults
  const getSuggestedPrompts = (): string[] => {
    if (userRole && ['ceo', 'cio', 'coo'].includes(userRole)) {
      const execRole = userRole as 'ceo' | 'cio' | 'coo';
      const promptKey = getExecutivePromptKey(agent);
      if (promptKey && executivePrompts[execRole]) {
        const rolePrompts = executivePrompts[execRole] as Record<string, string[]>;
        if (rolePrompts[promptKey]) {
          return rolePrompts[promptKey];
        }
      }
    }
    return agent.suggestedPrompts;
  };

  const suggestedPrompts = getSuggestedPrompts();

  // Add greeting message on mount
  useEffect(() => {
    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: agent.greeting,
        timestamp: new Date().toISOString(),
        status: 'complete',
      },
    ]);
  }, [agent.greeting]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      status: 'complete',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add placeholder for assistant response
    const assistantId = `assistant-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        status: 'thinking',
      },
    ]);

    try {
      // Simulate status progression
      setCurrentStatus('thinking');
      await new Promise((r) => setTimeout(r, 500));

      setCurrentStatus('searching');
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, status: 'searching' } : m))
      );
      await new Promise((r) => setTimeout(r, 700));

      setCurrentStatus('processing');
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, status: 'processing' } : m))
      );

      // Make actual API call to external backend
      const data = await agentApi.sendMessage(agent.endpoint, userMessage.content);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: data.message,
                status: 'complete',
                data: data.data,
                sources: data.sources,
                actions: data.actions,
              }
            : m
        )
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: 'Sorry, I encountered an error. Please try again.',
                status: 'error',
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      setCurrentStatus(null);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Agent Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronDown className="h-4 w-4 mr-1 rotate-90" />
          Back
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">{agent.category}</p>
          </div>
        </div>
        {currentStatus && (
          <Badge variant="outline" className="gap-1">
            {(() => {
              const config = statusConfig[currentStatus as keyof typeof statusConfig];
              const Icon = config?.icon || Loader2;
              return (
                <>
                  <Icon className={cn('h-3 w-3 animate-pulse', config?.color)} />
                  <span className="text-xs">{config?.text}</span>
                </>
              );
            })()}
          </Badge>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              )}
            >
              {/* Status indicator for assistant messages */}
              {message.role === 'assistant' && message.status !== 'complete' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {(() => {
                    const config = statusConfig[message.status as keyof typeof statusConfig];
                    const Icon = config?.icon || Loader2;
                    return (
                      <>
                        <Icon className={cn('h-4 w-4 animate-spin', config?.color)} />
                        <span>{config?.text}</span>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Message content */}
              {(message.status === 'complete' || message.status === 'error') && (
                <>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {/* Data display */}
                  {message.data && Object.keys(message.data).length > 0 && (
                    <div className="mt-3 p-3 rounded-lg bg-background/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Details
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() =>
                            copyToClipboard(JSON.stringify(message.data, null, 2), message.id)
                          }
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(message.data, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Actions */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action) => (
                        <Button
                          key={action.id}
                          variant={action.type === 'primary' ? 'default' : 'outline'}
                          size="sm"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {message.role === 'user' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="py-3 border-t">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.slice(0, 4).map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-1.5 px-3 font-normal"
                onClick={() => handleSuggestedPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="pt-3 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${agent.name} anything...`}
              className="min-h-[52px] max-h-[120px] resize-none pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
