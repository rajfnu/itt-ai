import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1100));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('deployment') || lowerMessage.includes('debug') || lowerMessage.includes('fail')) {
      responseMessage = `Let me help you debug the deployment failure. Here's a checklist:

**Common Causes & Fixes:**

**1. Build Failures**
\`\`\`bash
# Check build logs
kubectl logs -l app=myapp --previous

# Common issues:
- Missing dependencies: npm ci
- TypeScript errors: npm run build
- Memory issues: increase Node heap
\`\`\`

**2. Container Startup Issues**
\`\`\`bash
# Check pod status
kubectl describe pod <pod-name>

# Common issues:
- Image pull errors: check registry auth
- CrashLoopBackOff: check app logs
- OOMKilled: increase memory limits
\`\`\`

**3. Health Check Failures**
\`\`\`bash
# Check readiness/liveness probes
kubectl get pods -o yaml | grep -A5 livenessProbe

# Ensure your app:
- Responds on health endpoint
- Starts within initialDelaySeconds
\`\`\`

**Quick Diagnostic Commands:**
\`\`\`bash
kubectl get events --sort-by=.lastTimestamp
kubectl logs deployment/myapp -f
kubectl rollout status deployment/myapp
\`\`\`

Share your error message and I can help narrow it down!`;
      responseData = {
        diagnosticAreas: ['Build', 'Container', 'Health Checks'],
        commonIssues: ['Dependencies', 'Image Pull', 'Memory', 'Probes']
      };
    } else if (lowerMessage.includes('github action') || lowerMessage.includes('workflow') || lowerMessage.includes('node')) {
      responseMessage = `Here's a GitHub Actions workflow for a Node.js app:

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage

      - uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/myapp \\
            myapp=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
\`\`\`

This workflow includes testing, Docker build, and K8s deployment.`;
      responseData = {
        jobs: ['test', 'build', 'deploy'],
        features: ['Caching', 'Coverage', 'Docker', 'K8s Deploy']
      };
    } else if (lowerMessage.includes('kubernetes') || lowerMessage.includes('pod') || lowerMessage.includes('crash')) {
      responseMessage = `Let's diagnose your Kubernetes pod issue:

**Step 1: Get Pod Status**
\`\`\`bash
kubectl get pods -n <namespace>
kubectl describe pod <pod-name> -n <namespace>
\`\`\`

**Step 2: Check Events**
\`\`\`bash
# Recent events
kubectl get events --sort-by='.lastTimestamp' -n <namespace>
\`\`\`

**Step 3: Check Logs**
\`\`\`bash
# Current logs
kubectl logs <pod-name> -n <namespace>

# Previous crash logs
kubectl logs <pod-name> -n <namespace> --previous
\`\`\`

**Common CrashLoopBackOff Causes:**

| Issue | Solution |
|-------|----------|
| OOMKilled | Increase memory limits |
| Exit code 1 | App error - check logs |
| Exit code 137 | SIGKILL - memory/timeout |
| ImagePullBackOff | Check registry credentials |

**Resource Limits Template:**
\`\`\`yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
\`\`\`

What error are you seeing?`;
      responseData = {
        diagnosticSteps: 3,
        commonCauses: ['OOMKilled', 'App Error', 'Image Pull', 'Probe Failure']
      };
    } else if (lowerMessage.includes('docker') || lowerMessage.includes('build time')) {
      responseMessage = `Here's how to optimize Docker build time:

**1. Multi-stage Builds**
\`\`\`dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
\`\`\`

**2. Optimize Layer Caching**
\`\`\`dockerfile
# Copy package files first (cached if unchanged)
COPY package*.json ./
RUN npm ci

# Then copy source (invalidates less often)
COPY . .
\`\`\`

**3. Use .dockerignore**
\`\`\`
node_modules
.git
*.md
.env*
coverage
\`\`\`

**4. Build Arguments for Caching**
\`\`\`bash
docker build --build-arg BUILDKIT_INLINE_CACHE=1 \\
  --cache-from myapp:latest \\
  -t myapp:new .
\`\`\`

**Results:**
- Before: 5-8 minutes
- After: 1-2 minutes (with cache)

Need help with your specific Dockerfile?`;
      responseData = {
        techniques: ['Multi-stage', 'Layer Caching', 'Dockerignore', 'BuildKit'],
        expectedImprovement: '3-4x faster'
      };
    } else {
      responseMessage = `I'm your DevOps Helper! I assist with deployments, pipelines, and infrastructure.

**What I Can Help With:**

🚀 **Deployments**
"Help me debug this deployment failure"

⚙️ **CI/CD Pipelines**
"Write a GitHub Actions workflow for Node.js"

🐳 **Containers**
"Why is my Kubernetes pod crashing?"
"Optimize our Docker build time"

☁️ **Infrastructure**
"Set up auto-scaling for this service"
"Create a Terraform module"

**Quick Commands:**
\`\`\`bash
# Deployment status
kubectl rollout status deployment/app

# Pod logs
kubectl logs -f deployment/app

# Resource usage
kubectl top pods
\`\`\`

What DevOps challenge are you facing?`;
      responseData = {
        helpAreas: ['Deployments', 'CI/CD', 'Containers', 'Infrastructure'],
        tools: ['Kubernetes', 'Docker', 'GitHub Actions', 'Terraform']
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
    console.error('DevOps API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
