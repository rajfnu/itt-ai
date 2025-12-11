# PHASE 5: AI Agent Interface Component

## Objective
Create a reusable AI Agent Interface component that serves as the foundation for all department-specific agent interactions.

---

## Instructions for Claude Code

### Step 1: Create Base AIAgentInterface Component

```
Create components/agents/AIAgentInterface.tsx:

A reusable, configurable AI agent interaction component:

Props:
interface AIAgentInterfaceProps {
  agentName: string;
  agentDescription?: string;
  endpoint: string;
  customFields?: CustomField[];
  mockResponse?: Record<string, unknown>;
  onSubmit?: (data: AgentSubmitData) => Promise<AgentResponse>;
}

interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For select type
}

interface AgentSubmitData {
  query: string;
  customFields: Record<string, string | number>;
}

Component structure (Card layout):
1. Card Header:
   - Agent name as title
   - Agent description as subtitle
   - Status indicator (dot + "Online"/"Offline")

2. Card Content - Input Section:
   - Custom fields rendered dynamically based on customFields prop
   - Main query textarea labeled "Your Query"
   - Character count indicator

3. Card Content - Action Section:
   - Submit button with loading state
   - Clear button to reset form

4. Card Content - Response Section:
   - Labeled "Agent Response"
   - Code block component to display JSON response
   - Timestamp of last response
   - Copy to clipboard button

State management:
- formData: Record<string, string | number>
- query: string
- response: AgentResponse | null
- isLoading: boolean
- error: string | null

Behavior:
- On submit, show loading state
- If onSubmit prop exists, call it with form data
- Otherwise, simulate API call with 1-2 second delay
- Display mockResponse or actual response in code block
- Handle errors gracefully with error message display
```

### Step 2: Create Code Block Component

```
Create components/ui/code-block.tsx (or add to agents folder):

A styled code block for displaying JSON responses:

Props:
interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

Features:
- Monospace font (font-mono)
- Dark background with light text
- Syntax highlighting for JSON (optional - can use simple styling)
- Copy button in top-right corner
- Scrollable if content exceeds maxHeight
- Line numbers (optional)

Styling:
<div className="relative">
  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto font-mono text-sm">
    <code>{formattedCode}</code>
  </pre>
  <Button 
    variant="ghost" 
    size="icon" 
    className="absolute top-2 right-2"
    onClick={copyToClipboard}
  >
    <Copy className="h-4 w-4" />
  </Button>
</div>

JSON formatting:
- Use JSON.stringify(data, null, 2) for pretty printing
- Handle non-JSON content gracefully
```

### Step 3: Create Custom Field Renderer

```
Create a helper function or sub-component to render custom fields dynamically:

function renderCustomField(field: CustomField, value: string | number, onChange: (value: string | number) => void) {
  switch (field.type) {
    case 'text':
      return (
        <Input
          id={field.id}
          placeholder={field.placeholder}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
    
    case 'number':
      return (
        <Input
          id={field.id}
          type="number"
          placeholder={field.placeholder}
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          required={field.required}
        />
      );
    
    case 'select':
      return (
        <Select value={value as string} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    
    case 'textarea':
      return (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
  }
}

Wrap each field in a div with label:
<div className="space-y-2">
  <Label htmlFor={field.id}>{field.label}</Label>
  {renderCustomField(field, ...)}
</div>
```

### Step 4: Add Loading and Error States

```
Enhance AIAgentInterface with proper loading and error handling:

Loading state:
- Disable submit button
- Show spinner icon on button
- Change button text to "Processing..."
- Optional: pulse animation on response area

<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      Processing...
    </>
  ) : (
    <>
      <Send className="h-4 w-4 mr-2" />
      Submit Query
    </>
  )}
</Button>

Error state:
- Display error message in Alert component
- Red styling for error alert
- Dismiss button on alert

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>{error}</AlertDescription>
</Alert>

Empty state (no response yet):
<div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
  <Bot className="h-12 w-12 text-gray-400 mb-4" />
  <p className="text-gray-500">Submit a query to see the agent's response</p>
</div>
```

### Step 5: Add Response History (Optional Enhancement)

```
Add ability to view previous responses in the session:

State:
const [responseHistory, setResponseHistory] = useState<AgentResponse[]>([]);

On each successful response:
setResponseHistory(prev => [response, ...prev].slice(0, 10)); // Keep last 10

Add a collapsible section below main response:
<Collapsible>
  <CollapsibleTrigger className="flex items-center gap-2">
    <History className="h-4 w-4" />
    <span>Response History ({responseHistory.length})</span>
    <ChevronDown className="h-4 w-4" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    {responseHistory.map((resp, index) => (
      <div key={index} className="mt-2 p-2 bg-gray-50 rounded text-sm">
        <span className="text-gray-500">{resp.timestamp}</span>
        <pre className="text-xs">{JSON.stringify(resp.data, null, 2)}</pre>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>
```

### Step 6: Create Agent API Simulator

```
Create lib/agent-simulator.ts:

A utility to simulate AI agent API responses:

export async function simulateAgentCall(
  endpoint: string, 
  data: AgentSubmitData,
  mockResponse?: Record<string, unknown>
): Promise<AgentResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Agent temporarily unavailable. Please try again.');
  }
  
  // Return mock response or generate one based on endpoint
  const response = mockResponse || generateDefaultResponse(endpoint, data);
  
  return {
    success: true,
    data: response,
    timestamp: new Date().toISOString(),
  };
}

function generateDefaultResponse(endpoint: string, data: AgentSubmitData): Record<string, unknown> {
  // Generate contextual mock response based on endpoint
  if (endpoint.includes('hr')) {
    return {
      status: 'completed',
      employee_id: data.customFields.employeeId || 'EMP-001',
      processed_by: 'HR Agent',
      next_step: 'Awaiting manager approval',
    };
  }
  
  if (endpoint.includes('finance')) {
    return {
      approval_status: 'pending',
      amount_requested: data.customFields.amount || 0,
      risk_score: Math.random().toFixed(2),
      reviewer: 'CFO',
    };
  }
  
  // Default response
  return {
    status: 'processed',
    query: data.query,
    timestamp: new Date().toISOString(),
  };
}
```

---

## Complete AIAgentInterface Example

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Send, Loader2, Copy, AlertCircle, Check } from 'lucide-react';
import { simulateAgentCall } from '@/lib/agent-simulator';

// ... implement full component with all features described above
```

---

## Verification

After completing this phase:

1. Create a simple test page to render AIAgentInterface:
```tsx
// Temporary test in any page
<AIAgentInterface 
  agentName="Test Agent"
  agentDescription="Testing the base component"
  endpoint="/api/test"
  customFields={[
    { id: 'testField', label: 'Test Input', type: 'text', placeholder: 'Enter test value' }
  ]}
/>
```

2. Test form submission - should show loading state
3. Verify response displays in code block
4. Test copy to clipboard functionality
5. Test error handling by modifying simulator
6. Verify all field types render correctly

---

## Next Phase

Proceed to `PHASE_6_DEPARTMENTS.md` to create department-specific agent implementations.
