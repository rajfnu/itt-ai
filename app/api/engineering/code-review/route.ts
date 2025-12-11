import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1300));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('function') || lowerMessage.includes('review')) {
      responseMessage = `I'll review your code! Here's my analysis:

**Issues Found:**

🔴 **Critical: Potential SQL Injection**
\`\`\`javascript
// Bad
const query = \`SELECT * FROM users WHERE id = \${userId}\`;
// Good
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);
\`\`\`

🟡 **Warning: Missing Error Handling**
\`\`\`javascript
// Add try-catch block
try {
  const result = await fetchData();
} catch (error) {
  logger.error('Failed to fetch data', error);
  throw new AppError('DATA_FETCH_FAILED');
}
\`\`\`

🟢 **Suggestion: Use Optional Chaining**
\`\`\`javascript
// Instead of
user && user.profile && user.profile.name
// Use
user?.profile?.name
\`\`\`

**Overall Assessment:** 6/10
- Security: Needs improvement
- Readability: Good
- Performance: Acceptable

Would you like me to explain any of these in more detail?`;
      responseData = {
        issues: { critical: 1, warning: 1, suggestion: 1 },
        score: 6,
        categories: ['Security', 'Error Handling', 'Modern JS']
      };
    } else if (lowerMessage.includes('database') || lowerMessage.includes('query') || lowerMessage.includes('optimize')) {
      responseMessage = `Here's how to optimize your database query:

**Current Issue:**
N+1 query problem - fetching related data in a loop

**Before (Slow - N+1 queries):**
\`\`\`javascript
const users = await User.findAll();
for (const user of users) {
  user.orders = await Order.findByUserId(user.id); // N queries!
}
\`\`\`

**After (Fast - 1 query with JOIN):**
\`\`\`javascript
const users = await User.findAll({
  include: [{
    model: Order,
    as: 'orders'
  }]
});
// Or with raw SQL
const query = \`
  SELECT u.*, json_agg(o.*) as orders
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
  GROUP BY u.id
\`;
\`\`\`

**Performance Impact:**
- Before: ~500ms for 100 users
- After: ~50ms (10x faster!)

**Additional Tips:**
- Add index on \`orders.user_id\`
- Consider pagination for large datasets
- Use EXPLAIN ANALYZE to verify

Need help with a specific query?`;
      responseData = {
        optimization: 'N+1 elimination',
        performanceGain: '10x',
        techniques: ['Eager Loading', 'JOINs', 'Indexing']
      };
    } else if (lowerMessage.includes('security') || lowerMessage.includes('vulnerab')) {
      responseMessage = `Security analysis complete! Here are the findings:

**🔴 Critical Issues:**

1. **Hardcoded Secrets**
   - Found API key in config.js line 15
   - Move to environment variables

2. **XSS Vulnerability**
   - Unsanitized user input rendered in HTML
   - Use DOMPurify or React's built-in escaping

**🟡 Warnings:**

3. **Weak Password Hashing**
   - Using MD5 - switch to bcrypt with cost factor 12

4. **Missing Rate Limiting**
   - Login endpoint vulnerable to brute force

**🟢 Recommendations:**

5. **Add Security Headers**
\`\`\`javascript
app.use(helmet({
  contentSecurityPolicy: true,
  xssFilter: true
}));
\`\`\`

**OWASP Top 10 Coverage:**
- Injection: ⚠️ Needs review
- Auth: 🔴 Weak hashing
- XSS: 🔴 Vulnerable
- Access Control: ✅ Good

Run a full security scan with \`npm run security:audit\``;
      responseData = {
        criticalIssues: 2,
        warnings: 2,
        recommendations: 1,
        owaspScore: '60%'
      };
    } else {
      responseMessage = `I'm your Code Reviewer! Paste any code and I'll help you improve it.

**What I Can Do:**
- Review code for bugs and issues
- Suggest performance optimizations
- Check for security vulnerabilities
- Verify coding standards compliance
- Explain complex code

**Example Requests:**
- "Review this function for potential issues"
- "How can I optimize this database query?"
- "Check this code for security vulnerabilities"
- "Explain what this regex does"

**Supported Languages:**
JavaScript, TypeScript, Python, Java, Go, SQL

Paste your code and I'll analyze it!`;
      responseData = {
        supportedLanguages: 6,
        reviewTypes: ['Bugs', 'Performance', 'Security', 'Standards']
      };
    }

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: responseData,
      status: 'complete',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Code Review API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error reviewing the code.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
