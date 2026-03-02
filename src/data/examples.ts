export interface FlowEntry {
  title: string
  category: string
  tags: string[]
  order: number
  description: string
  mermaid: string
}

export const examples: FlowEntry[] = [
  // ── Authentication ──
  {
    title: 'User Login',
    category: 'Authentication',
    tags: ['auth', 'login', 'jwt', 'session'],
    order: 1,
    description: 'POST /api/auth/login — validates credentials, issues JWT tokens, and manages session',
    mermaid: `flowchart TD
    A([POST /api/auth/login]) --> B[/Parse Request Body/]
    B --> C{{"Validate Email & Password"}}
    C -->|Invalid| D[\\400 Bad Request/]
    C -->|Valid| E[(Find User by Email)]
    E -->|Not Found| F[\\401 Unauthorized/]
    E -->|Found| G{{Compare Password Hash}}
    G -->|Mismatch| F
    G -->|Match| H[Generate JWT Access Token]
    H --> I[Generate Refresh Token]
    I --> J[(Save Refresh Token)]
    J --> K[\\200 OK + Tokens/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff

    class A entry
    class B,C,G validation
    class H,I,K success
    class D,F error
    class E,J data`,
  },
  {
    title: 'OAuth2 Login',
    category: 'Authentication',
    tags: ['auth', 'oauth', 'google', 'social-login'],
    order: 2,
    description: 'OAuth2 authorization code flow with Google — redirect, callback, token exchange, and account linking',
    mermaid: `flowchart TD
    A[/Click Google Login/] --> B[Redirect to Google]
    B --> C[/User Grants Consent/]
    C --> D([GET /auth/callback])

    subgraph Token Exchange
        D --> E[[Exchange Code for Tokens]]
        E --> F{Token Valid?}
        F -->|No| G[\\401 Auth Failed/]
        F -->|Yes| H[[Fetch Google Profile]]
    end

    H --> I[(Find User by Email)]
    I -->|Exists| J[Link Google Account]
    I -->|New User| K[Create Account]
    J --> L[Generate Session]
    K --> L
    L --> M[\\Redirect to Dashboard/]

    classDef ui fill:#06b6d4,stroke:#22d3ee,color:#fff
    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff

    class A,C ui
    class D entry
    class B,E,H external
    class F validation
    class G error
    class I,K data
    class J,L,M success`,
  },
  {
    title: 'Password Reset',
    category: 'Authentication',
    tags: ['auth', 'password', 'email', 'reset'],
    order: 3,
    description: 'Forgot password flow — email verification, token validation, and password update',
    mermaid: `flowchart TD
    A([POST /auth/forgot-password]) --> B[/Email Input/]
    B --> C[(Find User by Email)]
    C -->|Not Found| D[\\200 OK]
    C -->|Found| E[Generate Reset Token]
    E --> F[(Store Token with Expiry)]
    F --> G[[Send Reset Email]]
    G --> H[/User Clicks Link/]
    H --> I([POST /auth/reset-password])
    I --> J{{"Validate Token & Expiry"}}
    J -->|Expired| K[\\400 Token Expired/]
    J -->|Valid| L{{Check Password Strength}}
    L -->|Weak| M[\\400 Weak Password/]
    L -->|Strong| N[(Update Password Hash)]
    N --> O[Invalidate All Sessions]
    O --> P[\\200 Password Updated/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef ui fill:#06b6d4,stroke:#22d3ee,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff

    class A,I entry
    class B,H ui
    class C,F,N data
    class G external
    class J,L validation
    class K,M error
    class D,E,O,P success`,
  },

  // ── API Routes ──
  {
    title: 'API Request Lifecycle',
    category: 'API Routes',
    tags: ['api', 'rest', 'middleware', 'error-handling'],
    order: 1,
    description: 'Incoming HTTP request through middleware chain, handler, and response',
    mermaid: `flowchart TD
    A([Incoming Request]) --> B

    subgraph Middleware
        B[Auth Check] --> C[Rate Limiter]
        C --> D[Parse Body]
    end

    D --> E{{"Validate Input"}}
    E -->|Invalid| F[\\400 Bad Request/]
    E -->|Valid| G[[Service Layer]]
    G --> H{Success?}
    H -->|Yes| I[(Persist Data)]
    I --> J[\\200 OK/]
    H -->|No| K[Log Error]
    K --> L[\\500 Internal Error/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff

    class A entry
    class B,C,D processing
    class E,H validation
    class G,I data
    class J success
    class F,K,L error`,
  },
  {
    title: 'File Upload',
    category: 'API Routes',
    tags: ['api', 'upload', 'file', 's3', 'validation'],
    order: 2,
    description: 'POST /api/upload — multipart file upload with validation, virus scan, and S3 storage',
    mermaid: `flowchart TD
    A([POST /api/upload]) --> B[Parse Multipart Body]

    subgraph Validation
        B --> C{{"Check File Size"}}
        C -->|Over Limit| D[\\413 Payload Too Large/]
        C -->|OK| E{{"Check MIME Type"}}
        E -->|Disallowed| F[\\415 Unsupported Type/]
        E -->|Allowed| G[[Virus Scan]]
    end

    G --> H{Clean?}
    H -->|Infected| I[\\400 Malicious File/]
    H -->|Clean| J[Generate Unique Key]
    J --> K[[Upload to S3]]
    K --> L[(Save File Metadata)]
    L --> M[\\201 Created + URL/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff

    class A entry
    class B,J processing
    class C,E,H validation
    class G,K external
    class D,F,I error
    class L data
    class M success`,
  },
  {
    title: 'User CRUD',
    category: 'API Routes',
    tags: ['api', 'crud', 'user', 'rest'],
    order: 3,
    description: 'User resource CRUD operations — create, read, update, delete with authorization checks',
    mermaid: `flowchart TD
    A([API Request]) --> B{HTTP Method?}

    B -->|GET| C[(Fetch User)]
    C -->|Found| D[\\200 User Data/]
    C -->|Not Found| E[\\404 Not Found/]

    B -->|POST| F{{"Validate Body"}}
    F -->|Invalid| G[\\400 Validation Error/]
    F -->|Valid| H[(Insert User)]
    H --> I[\\201 Created/]

    B -->|PUT| J{{Is Owner or Admin?}}
    J -->|No| K[\\403 Forbidden/]
    J -->|Yes| L{{"Validate Body"}}
    L -->|Invalid| G
    L -->|Valid| M[(Update User)]
    M --> N[\\200 Updated/]

    B -->|DELETE| O{{Is Admin?}}
    O -->|No| K
    O -->|Yes| P[(Soft Delete User)]
    P --> Q[\\204 No Content/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff

    class A,B entry
    class F,J,L,O validation
    class C,H,M,P data
    class D,I,N,Q success
    class E,G,K error`,
  },

  // ── Data Pipeline ──
  {
    title: 'ETL Pipeline',
    category: 'Data Pipeline',
    tags: ['data', 'etl', 'pipeline', 'batch'],
    order: 1,
    description: 'Extract-Transform-Load pipeline with validation, error queue, and retry',
    mermaid: `flowchart TD
    A>Cron Trigger] --> B[(Source DB)]
    B --> C[Extract Records]

    subgraph Transform
        C --> D[Clean Data]
        D --> E[Apply Business Rules]
        E --> F{{"Validate Schema"}}
    end

    F -->|Valid| G[Batch Insert]
    G --> H[(Data Warehouse)]
    H --> I([Pipeline Complete])
    F -->|Invalid| J[Error Queue]
    J --> K{Retry Count?}
    K -->|Under Limit| C
    K -->|Exceeded| L[\\Alert & Skip/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff

    class A entry
    class B,H data
    class C,D,E,G processing
    class F,K validation
    class I success
    class J,L error`,
  },
  {
    title: 'Cache Strategy',
    category: 'Data Pipeline',
    tags: ['data', 'cache', 'redis', 'read-through', 'invalidation'],
    order: 2,
    description: 'Read-through cache with TTL expiry, cache invalidation on writes, and fallback to database',
    mermaid: `flowchart TD
    A([Data Request]) --> B[(Check Redis Cache)]
    B --> C{Cache Hit?}
    C -->|Hit| D[\\Return Cached Data/]
    C -->|Miss| E[(Query Database)]
    E --> F{DB Result?}
    F -->|Not Found| G[\\404 Not Found/]
    F -->|Found| H[Set Cache with TTL]
    H --> I[(Write to Redis)]
    I --> J[\\Return Fresh Data/]

    K>Write Event] --> L[(Update Database)]
    L --> M[[Invalidate Cache Keys]]
    M --> N[\\Confirm Invalidation/]

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff

    class A,K entry
    class B,E,I,L data
    class C,F validation
    class D,H,J,N success
    class G error
    class M processing`,
  },
  {
    title: 'Event Stream Processing',
    category: 'Data Pipeline',
    tags: ['data', 'kafka', 'stream', 'event-driven', 'dead-letter'],
    order: 3,
    description: 'Kafka event stream — consume, process, enrich, and route with dead-letter queue for failures',
    mermaid: `flowchart TD
    A>Kafka Event] --> B[Deserialize Message]

    subgraph Processing
        B --> C{{"Validate Schema"}}
        C -->|Invalid| D[Dead Letter Queue]
        C -->|Valid| E[[Enrich with Context]]
        E --> F[Apply Business Rules]
    end

    F --> G{Route Event}
    G -->|Order| H[[Order Service]]
    G -->|Notification| I[[Notification Service]]
    G -->|Analytics| J[(Write to Data Lake)]

    H --> K[Commit Offset]
    I --> K
    J --> K
    D --> L[Log for Review]
    L --> K
    K --> M([Await Next Event])

    classDef entry fill:#6366f1,stroke:#818cf8,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff

    class A entry
    class B,F processing
    class C,G validation
    class E,H,I external
    class J data
    class D,L error
    class K,M success`,
  },

  // ── State Management ──
  {
    title: 'State Management Cycle',
    category: 'State Management',
    tags: ['state', 'redux', 'store', 'side-effects'],
    order: 1,
    description: 'Action dispatch through middleware, reducer, side effects, and UI re-render',
    mermaid: `flowchart TD
    A[/User Interaction/] --> B[Dispatch Action]
    B --> C[[Logger Middleware]]
    C --> D[[Async Middleware]]
    D --> E{Side Effect?}
    E -->|Yes| F[[API Call]]
    F --> G{Response OK?}
    G -->|Yes| H[Dispatch Success]
    G -->|No| I[Dispatch Failure]
    E -->|No| J[Reducer]
    H --> J
    I --> J
    J --> K[(Update Store)]
    K --> L[Re-render Components]
    L --> A

    classDef ui fill:#06b6d4,stroke:#22d3ee,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff
    classDef data fill:#3b82f6,stroke:#60a5fa,color:#fff

    class A,L ui
    class B,C,D processing
    class E,G validation
    class F external
    class H,J success
    class I error
    class K data`,
  },
  {
    title: 'Optimistic Update',
    category: 'State Management',
    tags: ['state', 'optimistic', 'rollback', 'undo'],
    order: 2,
    description: 'Optimistic UI update with snapshot, API sync, and automatic rollback on failure',
    mermaid: `flowchart TD
    A[/User Action/] --> B[Snapshot Current State]
    B --> C[Apply Optimistic Update]
    C --> D[Re-render UI Immediately]
    D --> E[[API Call]]
    E --> F{Response?}
    F -->|Success| G[Confirm State]
    G --> H([Done])
    F -->|Failure| I[Restore Snapshot]
    I --> J[Re-render Rollback]
    J --> K[Show Error Toast]
    K --> L([Retry Available])

    classDef ui fill:#06b6d4,stroke:#22d3ee,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff

    class A,D,J ui
    class B,C processing
    class E external
    class F validation
    class G,H success
    class I,K,L error`,
  },
  {
    title: 'Form Submission',
    category: 'State Management',
    tags: ['state', 'form', 'validation', 'submit'],
    order: 3,
    description: 'Multi-step form — field validation, async submission, success/error handling with loading state',
    mermaid: `flowchart TD
    A[/User Types Input/] --> B[Update Field State]
    B --> C{{"Validate Field"}}
    C -->|Error| D[Show Inline Error]
    D --> A
    C -->|Valid| E[Clear Field Error]
    E --> F[/Click Submit/]
    F --> G{{"Validate All Fields"}}
    G -->|Errors Exist| H[Highlight Invalid Fields]
    H --> A
    G -->|All Valid| I[Set Loading State]
    I --> J[[Submit to API]]
    J --> K{Response?}
    K -->|Success| L[Reset Form]
    L --> M[Show Success Message]
    M --> N([Navigate Away])
    K -->|Server Error| O[Set Error State]
    O --> P[Show Error Banner]
    P --> F

    classDef ui fill:#06b6d4,stroke:#22d3ee,color:#fff
    classDef processing fill:#64748b,stroke:#94a3b8,color:#fff
    classDef validation fill:#f59e0b,stroke:#fbbf24,color:#000
    classDef external fill:#8b5cf6,stroke:#a78bfa,color:#fff
    classDef success fill:#10b981,stroke:#34d399,color:#fff
    classDef error fill:#ef4444,stroke:#f87171,color:#fff

    class A,F ui
    class B,E,I,L processing
    class C,G,K validation
    class J external
    class M,N success
    class D,H,O,P error`,
  },
]

export interface CategoryGroup {
  category: string
  entries: FlowEntry[]
}

export function getGroupedExamples(): CategoryGroup[] {
  const map = new Map<string, FlowEntry[]>()
  for (const entry of examples) {
    const list = map.get(entry.category) ?? []
    list.push(entry)
    map.set(entry.category, list)
  }
  return Array.from(map.entries())
    .map(([category, entries]) => ({
      category,
      entries: entries.sort((a, b) => a.order - b.order),
    }))
}
