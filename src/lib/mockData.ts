import type { User, Project, Task } from '@/types';

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Chen',    email: 'alice@projecthub.com',  role: 'admin'  },
  { id: 'u2', name: 'Bob Martinez',  email: 'bob@projecthub.com',    role: 'member' },
  { id: 'u3', name: 'Sara Kim',      email: 'sara@projecthub.com',   role: 'member' },
  { id: 'u4', name: 'Dev User',      email: 'test@test.com',         role: 'admin'  },
];

// ─── Mock Projects ────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'E-Commerce Redesign',
    description: 'Full redesign of the storefront including checkout flow, product pages, and mobile responsiveness.',
    status: 'active',
    createdAt: '2024-11-01T08:00:00Z',
    ownerId: 'u1',
  },
  {
    id: 'p2',
    name: 'Mobile App v2',
    description: 'Next-gen React Native app with offline support, push notifications, and real-time chat.',
    status: 'active',
    createdAt: '2024-11-15T09:30:00Z',
    ownerId: 'u4',
  },
  {
    id: 'p3',
    name: 'Analytics Dashboard',
    description: 'Internal BI dashboard with drill-down charts, CSV exports, and role-based data access.',
    status: 'completed',
    createdAt: '2024-09-20T10:00:00Z',
    ownerId: 'u2',
  },
  {
    id: 'p4',
    name: 'API Gateway Migration',
    description: 'Migrate legacy REST services to GraphQL federation with rate limiting and observability.',
    status: 'on-hold',
    createdAt: '2024-10-05T11:00:00Z',
    ownerId: 'u1',
  },
  {
    id: 'p5',
    name: 'DevOps Automation',
    description: 'CI/CD pipeline hardening, Kubernetes autoscaling, and infrastructure-as-code with Terraform.',
    status: 'active',
    createdAt: '2024-12-01T07:00:00Z',
    ownerId: 'u3',
  },
];

// ─── Mock Tasks ───────────────────────────────────────────────────────────────

export const mockTasks: Task[] = [
  // E-Commerce Redesign (p1)
  { id: 't1',  title: 'Design system audit',           description: 'Review existing components and identify gaps.',                        priority: 'high',   status: 'done',        dueDate: '2024-11-20T00:00:00Z', assignedUserId: 'u1', projectId: 'p1', createdAt: '2024-11-02T08:00:00Z', updatedAt: '2024-11-19T08:00:00Z' },
  { id: 't2',  title: 'Homepage wireframes',           description: 'Create lo-fi wireframes for homepage hero and feature sections.',      priority: 'high',   status: 'done',        dueDate: '2024-11-25T00:00:00Z', assignedUserId: 'u2', projectId: 'p1', createdAt: '2024-11-03T08:00:00Z', updatedAt: '2024-11-24T08:00:00Z' },
  { id: 't3',  title: 'Checkout flow redesign',        description: 'Redesign 3-step checkout with address autofill and order summary.',    priority: 'high',   status: 'in-progress', dueDate: '2024-12-10T00:00:00Z', assignedUserId: 'u2', projectId: 'p1', createdAt: '2024-11-10T08:00:00Z', updatedAt: '2024-12-01T08:00:00Z' },
  { id: 't4',  title: 'Mobile responsiveness',         description: 'Ensure all pages are responsive from 320px to 4K.',                   priority: 'medium', status: 'in-review',   dueDate: '2024-12-15T00:00:00Z', assignedUserId: 'u3', projectId: 'p1', createdAt: '2024-11-12T08:00:00Z', updatedAt: '2024-12-05T08:00:00Z' },
  { id: 't5',  title: 'Performance audit & fixes',     description: 'Lighthouse score must reach 90+ on mobile.',                          priority: 'medium', status: 'todo',        dueDate: '2024-12-20T00:00:00Z', assignedUserId: null, projectId: 'p1', createdAt: '2024-11-15T08:00:00Z', updatedAt: '2024-11-15T08:00:00Z' },

  // Mobile App v2 (p2)
  { id: 't6',  title: 'Offline sync architecture',     description: 'Design conflict-resolution strategy for offline-first data sync.',     priority: 'high',   status: 'in-progress', dueDate: '2024-12-12T00:00:00Z', assignedUserId: 'u4', projectId: 'p2', createdAt: '2024-11-16T08:00:00Z', updatedAt: '2024-12-01T08:00:00Z' },
  { id: 't7',  title: 'Push notification service',     description: 'Integrate Firebase Cloud Messaging for iOS and Android.',              priority: 'high',   status: 'todo',        dueDate: '2024-12-18T00:00:00Z', assignedUserId: 'u2', projectId: 'p2', createdAt: '2024-11-17T08:00:00Z', updatedAt: '2024-11-17T08:00:00Z' },
  { id: 't8',  title: 'Real-time chat UI',             description: 'WebSocket-based chat component with read receipts.',                   priority: 'medium', status: 'todo',        dueDate: '2024-12-22T00:00:00Z', assignedUserId: 'u3', projectId: 'p2', createdAt: '2024-11-18T08:00:00Z', updatedAt: '2024-11-18T08:00:00Z' },
  { id: 't9',  title: 'App store assets',              description: 'Prepare screenshots, icon sets, and promo text for both stores.',      priority: 'low',    status: 'todo',        dueDate: '2024-12-30T00:00:00Z', assignedUserId: null, projectId: 'p2', createdAt: '2024-11-20T08:00:00Z', updatedAt: '2024-11-20T08:00:00Z' },

  // Analytics Dashboard (p3)
  { id: 't10', title: 'KPI chart components',          description: 'Bar, line, pie charts with drill-down using Recharts.',                priority: 'high',   status: 'done',        dueDate: '2024-10-15T00:00:00Z', assignedUserId: 'u2', projectId: 'p3', createdAt: '2024-09-21T08:00:00Z', updatedAt: '2024-10-14T08:00:00Z' },
  { id: 't11', title: 'CSV export feature',            description: 'Export filtered data to CSV with column selection.',                   priority: 'medium', status: 'done',        dueDate: '2024-10-20T00:00:00Z', assignedUserId: 'u3', projectId: 'p3', createdAt: '2024-09-25T08:00:00Z', updatedAt: '2024-10-19T08:00:00Z' },
  { id: 't12', title: 'Role-based data access',        description: 'Restrict data visibility based on user department roles.',             priority: 'high',   status: 'done',        dueDate: '2024-10-25T00:00:00Z', assignedUserId: 'u1', projectId: 'p3', createdAt: '2024-09-28T08:00:00Z', updatedAt: '2024-10-24T08:00:00Z' },

  // API Gateway Migration (p4)
  { id: 't13', title: 'Schema design — GraphQL',       description: 'Define federated GraphQL schema for all microservices.',               priority: 'high',   status: 'in-progress', dueDate: '2024-11-15T00:00:00Z', assignedUserId: 'u1', projectId: 'p4', createdAt: '2024-10-06T08:00:00Z', updatedAt: '2024-11-01T08:00:00Z' },
  { id: 't14', title: 'Rate limiting middleware',      description: 'Implement token-bucket rate limiting at the gateway level.',           priority: 'medium', status: 'todo',        dueDate: '2024-11-30T00:00:00Z', assignedUserId: null, projectId: 'p4', createdAt: '2024-10-10T08:00:00Z', updatedAt: '2024-10-10T08:00:00Z' },

  // DevOps Automation (p5)
  { id: 't15', title: 'GitHub Actions pipeline',       description: 'Set up lint, test, build, and deploy stages in CI.',                  priority: 'high',   status: 'done',        dueDate: '2024-12-10T00:00:00Z', assignedUserId: 'u3', projectId: 'p5', createdAt: '2024-12-02T08:00:00Z', updatedAt: '2024-12-09T08:00:00Z' },
  { id: 't16', title: 'Kubernetes HPA config',         description: 'Configure Horizontal Pod Autoscaler for all services.',               priority: 'high',   status: 'in-progress', dueDate: '2024-12-20T00:00:00Z', assignedUserId: 'u3', projectId: 'p5', createdAt: '2024-12-03T08:00:00Z', updatedAt: '2024-12-10T08:00:00Z' },
  { id: 't17', title: 'Terraform modules',             description: 'Write reusable Terraform modules for AWS VPC, ECS, RDS.',             priority: 'medium', status: 'todo',        dueDate: '2024-12-28T00:00:00Z', assignedUserId: 'u4', projectId: 'p5', createdAt: '2024-12-04T08:00:00Z', updatedAt: '2024-12-04T08:00:00Z' },
  { id: 't18', title: 'Monitoring & alerting setup',   description: 'Integrate Prometheus + Grafana with PagerDuty alerting.',             priority: 'medium', status: 'todo',        dueDate: '2024-12-31T00:00:00Z', assignedUserId: null, projectId: 'p5', createdAt: '2024-12-05T08:00:00Z', updatedAt: '2024-12-05T08:00:00Z' },
  { id: 't19', title: 'Secrets management',            description: 'Migrate secrets from env files to AWS Secrets Manager.',              priority: 'low',    status: 'todo',        dueDate: '2024-12-31T00:00:00Z', assignedUserId: null, projectId: 'p5', createdAt: '2024-12-06T08:00:00Z', updatedAt: '2024-12-06T08:00:00Z' },
  { id: 't20', title: 'Load testing',                  description: 'Run k6 load tests against staging and set SLA benchmarks.',           priority: 'low',    status: 'todo',        dueDate: '2024-12-31T00:00:00Z', assignedUserId: 'u2', projectId: 'p5', createdAt: '2024-12-07T08:00:00Z', updatedAt: '2024-12-07T08:00:00Z' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Weekly completed tasks count for the last 7 days (for AreaChart) */
export const weeklyCompletedData = [
  { day: 'Mon', completed: 3 },
  { day: 'Tue', completed: 5 },
  { day: 'Wed', completed: 2 },
  { day: 'Thu', completed: 7 },
  { day: 'Fri', completed: 4 },
  { day: 'Sat', completed: 6 },
  { day: 'Sun', completed: 1 },
];
