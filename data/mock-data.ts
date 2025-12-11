import { User, AIAgent, NavItem } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@intimetec.com',
    role: 'admin',
    department: 'Administration',
    avatar: '/avatars/admin.png'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'hr@intimetec.com',
    role: 'hr_staff',
    department: 'Human Resources',
    avatar: '/avatars/hr.png'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'finance@intimetec.com',
    role: 'finance_staff',
    department: 'Finance',
    avatar: '/avatars/finance.png'
  },
  {
    id: '4',
    name: 'Alex Developer',
    email: 'dev@intimetec.com',
    role: 'engineer',
    department: 'Engineering',
    avatar: '/avatars/dev.png'
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    email: 'marketing@intimetec.com',
    role: 'marketing_staff',
    department: 'Marketing',
    avatar: '/avatars/marketing.png'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'sales@intimetec.com',
    role: 'sales_staff',
    department: 'Sales',
    avatar: '/avatars/sales.png'
  },
];

// HR Department Agents
export const hrAgents: AIAgent[] = [
  {
    id: 'hr-onboarding',
    name: 'Onboarding Assistant',
    description: 'Automate new hire onboarding process, generate welcome packets, and track onboarding progress',
    endpoint: '/api/hr/onboarding',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
    icon: 'UserPlus',
    category: 'Recruitment',
    capabilities: [
      'Initiate onboarding for new employees',
      'Track onboarding progress and checklist',
      'Generate welcome packages and documents',
      'Schedule orientation sessions',
      'Set up IT equipment requests'
    ],
    suggestedPrompts: [
      'Start onboarding for a new software engineer joining next Monday',
      'What is the onboarding status for john@intimetec.com?',
      'Generate a welcome packet for the marketing team',
      'Schedule orientation for all new hires this month'
    ],
    greeting: "Hi! I'm your Onboarding Assistant. I can help you set up new employees, track their onboarding progress, and ensure they have everything they need to succeed. What would you like to do today?"
  },
  {
    id: 'hr-leave',
    name: 'Leave Manager',
    description: 'Process leave requests, check leave balances, and manage time-off policies',
    endpoint: '/api/hr/leave',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
    icon: 'Calendar',
    category: 'Employee Management',
    capabilities: [
      'Check employee leave balances',
      'Process leave requests',
      'View pending approvals',
      'Generate leave reports',
      'Explain leave policies'
    ],
    suggestedPrompts: [
      'How many vacation days does sarah@intimetec.com have left?',
      'Submit a sick leave request for 3 days starting tomorrow',
      'Show me all pending leave requests',
      'What is our maternity leave policy?'
    ],
    greeting: "Hello! I'm your Leave Manager. I can help you check leave balances, process time-off requests, and answer questions about leave policies. How can I assist you?"
  },
  {
    id: 'hr-performance',
    name: 'Performance Coach',
    description: 'Generate performance review templates, track goals, and compile feedback reports',
    endpoint: '/api/hr/performance',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
    icon: 'TrendingUp',
    category: 'Performance',
    capabilities: [
      'Create performance review templates',
      'Track employee goals and OKRs',
      'Compile 360-degree feedback',
      'Generate performance reports',
      'Suggest improvement areas'
    ],
    suggestedPrompts: [
      'Create a performance review template for Q4',
      'What are the goals for the engineering team?',
      'Generate a feedback summary for Mike Chen',
      'Show me employees due for review this month'
    ],
    greeting: "Hi there! I'm your Performance Coach. I help manage performance reviews, track goals, and gather feedback. Let me know what you'd like to work on!"
  },
  {
    id: 'hr-recruitment',
    name: 'Recruitment Agent',
    description: 'Screen resumes, schedule interviews, and generate job descriptions',
    endpoint: '/api/hr/recruitment',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
    icon: 'Search',
    category: 'Recruitment',
    capabilities: [
      'Screen and rank resumes',
      'Generate job descriptions',
      'Schedule interviews',
      'Track candidate pipeline',
      'Send offer letters'
    ],
    suggestedPrompts: [
      'Create a job description for a Senior React Developer',
      'How many applicants do we have for the UX Designer role?',
      'Schedule an interview with candidate ID 12345',
      'Show me the top 5 candidates for the PM position'
    ],
    greeting: "Welcome! I'm your Recruitment Agent. I can help you find the best candidates, create job postings, and manage the hiring process. What position are you hiring for?"
  },
  {
    id: 'hr-policy',
    name: 'Policy Assistant',
    description: 'Answer employee policy questions, generate policy documents, and track compliance',
    endpoint: '/api/hr/policy',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
    icon: 'FileText',
    category: 'Compliance',
    capabilities: [
      'Answer policy questions',
      'Generate policy documents',
      'Track compliance status',
      'Update policy handbook',
      'Send policy acknowledgments'
    ],
    suggestedPrompts: [
      'What is our remote work policy?',
      'Generate an updated expense reimbursement policy',
      'Who hasn\'t acknowledged the new code of conduct?',
      'What are the rules for using company equipment?'
    ],
    greeting: "Hello! I'm your Policy Assistant. I know all about company policies and can help you understand, create, or update them. What would you like to know?"
  },
];

// Finance Department Agents
export const financeAgents: AIAgent[] = [
  {
    id: 'finance-invoice',
    name: 'Invoice Agent',
    description: 'Process invoices, validate vendor details, and manage payments through natural conversation',
    endpoint: '/api/finance/invoice',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
    icon: 'Receipt',
    category: 'Accounts Payable',
    capabilities: [
      'Create and process invoices',
      'Check invoice status',
      'Validate vendor information',
      'Schedule payments',
      'Generate invoice reports',
      'Find invoices by vendor or date'
    ],
    suggestedPrompts: [
      'Create an invoice for Acme Corp for $15,000',
      'What is the status of invoice INV-2024-001?',
      'Show me all unpaid invoices from last month',
      'When is the payment due for our AWS invoice?',
      'Find all invoices from Microsoft this year'
    ],
    greeting: "Hi! I'm your Invoice Agent. I can help you create, track, and manage invoices. Just tell me what you need - whether it's processing a new invoice, checking payment status, or finding past invoices."
  },
  {
    id: 'finance-expense',
    name: 'Expense Manager',
    description: 'Review expense reports, categorize spending, and generate expense analytics',
    endpoint: '/api/finance/expense',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
    icon: 'CreditCard',
    category: 'Expenses',
    capabilities: [
      'Review expense reports',
      'Categorize expenses',
      'Approve or flag expenses',
      'Generate spending reports',
      'Track budget vs actuals'
    ],
    suggestedPrompts: [
      'Show me pending expense reports',
      'What did we spend on travel last quarter?',
      'Flag any expenses over $5,000',
      'Compare marketing expenses month over month',
      'Who has the highest expense claims this month?'
    ],
    greeting: "Hello! I'm your Expense Manager. I help you review expenses, track spending, and keep budgets on track. What would you like to look into?"
  },
  {
    id: 'finance-budget',
    name: 'Budget Analyst',
    description: 'Track budget allocations, forecast spending, and generate budget reports',
    endpoint: '/api/finance/budget',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
    icon: 'PieChart',
    category: 'Budgeting',
    capabilities: [
      'Check department budgets',
      'Forecast quarterly spending',
      'Reallocate budget funds',
      'Generate variance reports',
      'Alert on budget overruns'
    ],
    suggestedPrompts: [
      'How much budget does Engineering have left for Q4?',
      'Forecast our Q1 spending based on current trends',
      'Which departments are over budget?',
      'Create a budget proposal for the new project',
      'Compare actual vs planned spending for Marketing'
    ],
    greeting: "Hi! I'm your Budget Analyst. I can help you track budgets, forecast spending, and ensure financial health across departments. What would you like to analyze?"
  },
  {
    id: 'finance-payroll',
    name: 'Payroll Assistant',
    description: 'Process payroll calculations, generate pay stubs, and handle tax withholdings',
    endpoint: '/api/finance/payroll',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
    icon: 'DollarSign',
    category: 'Payroll',
    capabilities: [
      'Process payroll runs',
      'Calculate tax withholdings',
      'Generate pay stubs',
      'Handle bonus calculations',
      'Track payroll history'
    ],
    suggestedPrompts: [
      'When is the next payroll run?',
      'Calculate year-end bonuses for the sales team',
      'Show me payroll summary for December',
      'What are the tax withholdings for a $100k salary?',
      'Generate pay stubs for all employees'
    ],
    greeting: "Hello! I'm your Payroll Assistant. I handle everything related to employee compensation - from regular payroll to bonuses and taxes. How can I help?"
  },
  {
    id: 'finance-report',
    name: 'Financial Reporter',
    description: 'Generate P&L statements, balance sheets, and cash flow reports',
    endpoint: '/api/finance/report',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
    icon: 'BarChart',
    category: 'Reporting',
    capabilities: [
      'Generate financial statements',
      'Create P&L reports',
      'Produce cash flow analysis',
      'Build executive dashboards',
      'Compare period-over-period'
    ],
    suggestedPrompts: [
      'Generate the Q4 P&L statement',
      'Show me our cash flow for the last 6 months',
      'Create an executive summary of our financial health',
      'How does this quarter compare to last year?',
      'What are our top revenue sources?'
    ],
    greeting: "Hi! I'm your Financial Reporter. I can generate any financial report you need - from P&L statements to cash flow analysis. What report would you like?"
  },
];

// Marketing Department Agents
export const marketingAgents: AIAgent[] = [
  {
    id: 'marketing-leads',
    name: 'Lead Generator',
    description: 'Create and qualify leads, score prospects, and manage lead pipeline',
    endpoint: '/api/marketing/leads',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
    icon: 'Target',
    category: 'Lead Generation',
    capabilities: [
      'Create new leads',
      'Score and qualify leads',
      'Track lead sources',
      'Manage lead pipeline',
      'Generate lead reports'
    ],
    suggestedPrompts: [
      'Add a new lead from the conference: John Smith from TechCorp',
      'Score all leads from the website this week',
      'Which leads are ready for sales handoff?',
      'Show me our lead conversion rate by source',
      'Find all hot leads in the technology sector'
    ],
    greeting: "Hi! I'm your Lead Generator. I help you capture, qualify, and manage leads. Tell me about a new lead or ask me to analyze your pipeline!"
  },
  {
    id: 'marketing-campaign',
    name: 'Campaign Manager',
    description: 'Plan campaigns, schedule content, and track campaign performance',
    endpoint: '/api/marketing/campaign',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
    icon: 'Megaphone',
    category: 'Campaigns',
    capabilities: [
      'Create campaign plans',
      'Schedule campaign activities',
      'Track campaign metrics',
      'A/B test variations',
      'Optimize campaign spend'
    ],
    suggestedPrompts: [
      'Create a product launch campaign for Q1',
      'How is our holiday campaign performing?',
      'Schedule social posts for next week',
      'Which campaign has the best ROI?',
      'Suggest improvements for our email campaign'
    ],
    greeting: "Hello! I'm your Campaign Manager. From planning to execution to analysis - I've got your campaigns covered. What campaign shall we work on?"
  },
  {
    id: 'marketing-content',
    name: 'Content Creator',
    description: 'Generate blog posts, social media content, and email copy using AI',
    endpoint: '/api/marketing/content',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
    icon: 'Edit',
    category: 'Content',
    capabilities: [
      'Write blog posts',
      'Create social media content',
      'Draft email campaigns',
      'Generate ad copy',
      'Optimize for SEO'
    ],
    suggestedPrompts: [
      'Write a blog post about AI in healthcare',
      'Create 5 LinkedIn posts about our new product',
      'Draft a welcome email for new subscribers',
      'Generate ad copy for our summer sale',
      'Optimize this content for SEO: [paste content]'
    ],
    greeting: "Hi! I'm your Content Creator. I can write blogs, social posts, emails, and more. What content do you need today?"
  },
  {
    id: 'marketing-social',
    name: 'Social Media Agent',
    description: 'Schedule posts, analyze engagement, and manage social presence',
    endpoint: '/api/marketing/social',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
    icon: 'Share2',
    category: 'Social Media',
    capabilities: [
      'Schedule social posts',
      'Analyze engagement metrics',
      'Monitor brand mentions',
      'Suggest posting times',
      'Track competitor activity'
    ],
    suggestedPrompts: [
      'Schedule this post for optimal engagement',
      'What is our engagement rate on LinkedIn?',
      'Show me trending topics in our industry',
      'When should we post for maximum reach?',
      'What are competitors posting about?'
    ],
    greeting: "Hey! I'm your Social Media Agent. I help you manage your social presence, schedule content, and track what's working. What's on your social agenda?"
  },
  {
    id: 'marketing-analytics',
    name: 'Marketing Analyst',
    description: 'Generate marketing reports, track KPIs, and analyze ROI',
    endpoint: '/api/marketing/analytics',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
    icon: 'LineChart',
    category: 'Analytics',
    capabilities: [
      'Track marketing KPIs',
      'Analyze campaign ROI',
      'Generate performance reports',
      'Identify trends',
      'Attribution modeling'
    ],
    suggestedPrompts: [
      'What is our marketing ROI this quarter?',
      'Which channel drives the most conversions?',
      'Show me website traffic trends',
      'Create a monthly marketing report',
      'Compare our performance to industry benchmarks'
    ],
    greeting: "Hello! I'm your Marketing Analyst. I turn data into insights and help you understand what's working. What would you like to analyze?"
  },
];

// Sales Department Agents
export const salesAgents: AIAgent[] = [
  {
    id: 'sales-capabilities',
    name: 'Capabilities Expert',
    description: 'Know everything about our products, services, and capabilities to help answer client questions',
    endpoint: '/api/sales/capabilities',
    allowedRoles: ['admin', 'sales_staff'],
    department: 'Sales',
    icon: 'Lightbulb',
    category: 'Knowledge',
    capabilities: [
      'Explain product features',
      'Compare service offerings',
      'Answer technical questions',
      'Provide case studies',
      'Generate capability summaries'
    ],
    suggestedPrompts: [
      'What are our AI/ML capabilities?',
      'How does our cloud migration service compare to competitors?',
      'Give me 3 case studies for healthcare clients',
      'What technologies do we specialize in?',
      'Summarize our data analytics offerings'
    ],
    greeting: "Hi! I'm your Capabilities Expert. I know everything about our products, services, and what makes us unique. Ask me anything about what we can do for clients!"
  },
  {
    id: 'sales-deck',
    name: 'Deck Builder',
    description: 'Create compelling sales presentations and pitch decks tailored to client needs',
    endpoint: '/api/sales/deck',
    allowedRoles: ['admin', 'sales_staff'],
    department: 'Sales',
    icon: 'Presentation',
    category: 'Presentations',
    capabilities: [
      'Generate pitch decks',
      'Customize presentations',
      'Create one-pagers',
      'Build proposal templates',
      'Add relevant case studies'
    ],
    suggestedPrompts: [
      'Create a pitch deck for a fintech company interested in digital transformation',
      'Build a one-pager for our DevOps services',
      'Customize the standard deck for a healthcare client',
      'Add ROI slides to the enterprise proposal',
      'Generate an executive summary for the ABC Corp deal'
    ],
    greeting: "Hello! I'm your Deck Builder. I create compelling presentations that win deals. Tell me about your client and I'll build the perfect pitch!"
  },
  {
    id: 'sales-rfp',
    name: 'RFP Responder',
    description: 'Analyze RFPs, generate responses, and manage proposal content',
    endpoint: '/api/sales/rfp',
    allowedRoles: ['admin', 'sales_staff'],
    department: 'Sales',
    icon: 'FileSearch',
    category: 'Proposals',
    capabilities: [
      'Analyze RFP requirements',
      'Generate compliant responses',
      'Find relevant past proposals',
      'Check compliance matrices',
      'Suggest win themes'
    ],
    suggestedPrompts: [
      'Analyze this RFP and summarize key requirements',
      'Draft a response for the technical approach section',
      'Find past responses about cloud migration',
      'What are the compliance requirements for this RFP?',
      'Suggest 3 win themes for the state government RFP'
    ],
    greeting: "Hi! I'm your RFP Responder. I help you analyze RFPs, craft winning responses, and manage your proposal content. Upload an RFP or ask me to help with a section!"
  },
  {
    id: 'sales-rfp-search',
    name: 'RFP Hunter',
    description: 'Search for relevant RFPs in the market, track opportunities, and alert on matches',
    endpoint: '/api/sales/rfp-search',
    allowedRoles: ['admin', 'sales_staff'],
    department: 'Sales',
    icon: 'Radar',
    category: 'Prospecting',
    capabilities: [
      'Search for new RFPs',
      'Match opportunities to capabilities',
      'Track RFP deadlines',
      'Alert on new postings',
      'Analyze competition'
    ],
    suggestedPrompts: [
      'Find IT modernization RFPs posted this week',
      'Show me federal government opportunities in healthcare',
      'What RFPs match our cloud capabilities?',
      'Set up alerts for AI/ML opportunities',
      'Which RFPs are due in the next 30 days?'
    ],
    greeting: "Hey! I'm your RFP Hunter. I scan the market for opportunities that match our capabilities. Want me to find some RFPs or set up alerts?"
  },
  {
    id: 'sales-coach',
    name: 'Sales Coach',
    description: 'Provide sales guidance, objection handling, and deal strategy advice',
    endpoint: '/api/sales/coach',
    allowedRoles: ['admin', 'sales_staff'],
    department: 'Sales',
    icon: 'Sparkles',
    category: 'Coaching',
    capabilities: [
      'Handle objections',
      'Develop deal strategies',
      'Practice sales pitches',
      'Analyze win/loss patterns',
      'Improve sales skills'
    ],
    suggestedPrompts: [
      'How do I handle the "too expensive" objection?',
      'Help me develop a strategy for the TechCorp deal',
      'Practice my pitch for the upcoming demo',
      'Why did we lose the XYZ deal?',
      'What questions should I ask in the discovery call?'
    ],
    greeting: "Hi! I'm your Sales Coach. I'm here to help you close more deals with better strategies, objection handling, and practice. What challenge are you facing?"
  },
];

// Engineering/Tech Department Agents
export const engineeringAgents: AIAgent[] = [
  {
    id: 'eng-training',
    name: 'Training Assistant',
    description: 'Access learning resources, track certifications, and get personalized learning paths',
    endpoint: '/api/engineering/training',
    allowedRoles: ['admin', 'engineer'],
    department: 'Engineering',
    icon: 'GraduationCap',
    category: 'Learning',
    capabilities: [
      'Recommend courses',
      'Track certifications',
      'Create learning paths',
      'Find tutorials',
      'Schedule training sessions'
    ],
    suggestedPrompts: [
      'What certifications should I pursue for cloud architecture?',
      'Find me resources to learn Kubernetes',
      'Create a learning path for becoming a tech lead',
      'What trainings are available this month?',
      'Show my certification progress'
    ],
    greeting: "Hello! I'm your Training Assistant. I help you grow your skills with personalized learning paths and resources. What would you like to learn?"
  },
  {
    id: 'eng-knowledge',
    name: 'Knowledge Base',
    description: 'Search internal documentation, code examples, and best practices using RAG',
    endpoint: '/api/engineering/knowledge',
    allowedRoles: ['admin', 'engineer'],
    department: 'Engineering',
    icon: 'BookOpen',
    category: 'Documentation',
    capabilities: [
      'Search documentation',
      'Find code examples',
      'Explain architectures',
      'Access best practices',
      'Answer technical questions'
    ],
    suggestedPrompts: [
      'How do we handle authentication in our microservices?',
      'Show me examples of our API error handling',
      'What is our standard CI/CD pipeline setup?',
      'Find documentation on the payment gateway integration',
      'What are our coding standards for React?'
    ],
    greeting: "Hi! I'm your Knowledge Base assistant. I have access to all our internal docs, code examples, and best practices. What do you need to find?"
  },
  {
    id: 'eng-code-review',
    name: 'Code Reviewer',
    description: 'Analyze code for issues, suggest improvements, and enforce coding standards',
    endpoint: '/api/engineering/code-review',
    allowedRoles: ['admin', 'engineer'],
    department: 'Engineering',
    icon: 'Code',
    category: 'Quality',
    capabilities: [
      'Review code snippets',
      'Suggest improvements',
      'Check for security issues',
      'Enforce style guides',
      'Explain complex code'
    ],
    suggestedPrompts: [
      'Review this function for potential issues',
      'How can I optimize this database query?',
      'Check this code for security vulnerabilities',
      'Does this follow our React best practices?',
      'Explain what this regex does'
    ],
    greeting: "Hey! I'm your Code Reviewer. Paste any code and I'll help you improve it, find bugs, or explain how it works. What code should we look at?"
  },
  {
    id: 'eng-architecture',
    name: 'Architecture Advisor',
    description: 'Get guidance on system design, technology choices, and architectural patterns',
    endpoint: '/api/engineering/architecture',
    allowedRoles: ['admin', 'engineer'],
    department: 'Engineering',
    icon: 'Boxes',
    category: 'Design',
    capabilities: [
      'Design system architectures',
      'Recommend technologies',
      'Review design decisions',
      'Explain patterns',
      'Estimate capacity needs'
    ],
    suggestedPrompts: [
      'How should I design a real-time notification system?',
      'Should we use Kafka or RabbitMQ for this use case?',
      'Review this microservices architecture diagram',
      'What pattern should I use for this data sync problem?',
      'How do we scale this to handle 10x traffic?'
    ],
    greeting: "Hello! I'm your Architecture Advisor. I help with system design, technology decisions, and architectural patterns. What are you designing?"
  },
  {
    id: 'eng-devops',
    name: 'DevOps Helper',
    description: 'Troubleshoot deployments, manage infrastructure, and automate pipelines',
    endpoint: '/api/engineering/devops',
    allowedRoles: ['admin', 'engineer'],
    department: 'Engineering',
    icon: 'Server',
    category: 'Infrastructure',
    capabilities: [
      'Troubleshoot deployments',
      'Write CI/CD configs',
      'Debug infrastructure issues',
      'Optimize performance',
      'Manage cloud resources'
    ],
    suggestedPrompts: [
      'Help me debug this deployment failure',
      'Write a GitHub Actions workflow for our Node.js app',
      'Why is our Kubernetes pod crashing?',
      'How do I set up auto-scaling for this service?',
      'Optimize our Docker build time'
    ],
    greeting: "Hi! I'm your DevOps Helper. I can help with deployments, pipelines, infrastructure, and all things CI/CD. What's the issue?"
  },
];

// All agents combined
export const mockAgents: AIAgent[] = [
  ...hrAgents,
  ...financeAgents,
  ...marketingAgents,
  ...salesAgents,
  ...engineeringAgents,
];

// Navigation Items
export const navigationItems: NavItem[] = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
    icon: 'Settings',
    roles: ['admin']
  },
  {
    title: 'HR Portal',
    href: '/hr',
    icon: 'Users',
    roles: ['admin', 'hr_staff'],
    department: 'HR'
  },
  {
    title: 'Finance Portal',
    href: '/finance',
    icon: 'DollarSign',
    roles: ['admin', 'finance_staff'],
    department: 'Finance'
  },
  {
    title: 'Marketing Portal',
    href: '/marketing',
    icon: 'Megaphone',
    roles: ['admin', 'marketing_staff'],
    department: 'Marketing'
  },
  {
    title: 'Sales Portal',
    href: '/sales',
    icon: 'Briefcase',
    roles: ['admin', 'sales_staff'],
    department: 'Sales'
  },
  {
    title: 'Engineering Hub',
    href: '/engineering',
    icon: 'Code',
    roles: ['admin', 'engineer'],
    department: 'Engineering'
  },
  {
    title: 'Employee Directory',
    href: '/employees',
    icon: 'UserCircle',
    roles: ['admin', 'hr_staff', 'engineer', 'finance_staff', 'marketing_staff', 'sales_staff']
  },
];

// Get agents by department
export const getAgentsByDepartment = (department: string): AIAgent[] => {
  return mockAgents.filter(agent => agent.department === department);
};

// Find user by email (for mock authentication)
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};
