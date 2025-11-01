# React Component Architecture & Patterns

This document describes component organization, asset management, and component patterns used in this project.

## Component Organization Strategy

### 1. Colocation Pattern: Keep Components Close to Where They're Used

Components should be organized by feature/page, not by type. Each page and layout has its own `components/` directory.

```
app/
├── pages/
│   ├── login/
│   │   ├── page.tsx                    # Page entry point
│   │   ├── components/
│   │   │   ├── LoginForm-container.tsx # Container component
│   │   │   ├── LoginForm-view.tsx      # Presenter component
│   │   │   └── components/
│   │   │       ├── EmailInput-container.tsx
│   │   │       └── EmailInput-view.tsx
│   │   └── assets/
│   │       └── lock-icon.svg
│   │
│   └── unity-sports-resort/
│       ├── page.tsx
│       ├── components/
│       │   ├── PlayerList-container.tsx
│       │   ├── PlayerList-view.tsx
│       │   └── components/
│       │       ├── PlayerCard-container.tsx
│       │       ├── PlayerCard-view.tsx
│       │       └── components/
│       │           ├── PlayerStats-view.tsx
│       │           └── PlayerStats-container.tsx
│       └── assets/
│           └── trophy-icon.svg
│
├── layouts/
│   ├── sidebar-layout/
│   │   ├── layout.tsx                  # Layout entry point
│   │   ├── components/
│   │   │   ├── Sidebar-container.tsx
│   │   │   ├── Sidebar-view.tsx
│   │   │   └── components/
│   │   │       ├── NavMenu-view.tsx
│   │   │       └── NavMenu-container.tsx
│   │   └── assets/
│   │       └── menu-icon.svg
│   │
│   └── authenticated-layout/
│       ├── layout.tsx
│       ├── components/
│       │   ├── AuthGuard-container.tsx
│       │   └── AuthGuard-view.tsx
│       └── assets/
│           └── shield-icon.svg
│
└── components/                         # Shared across multiple pages/layouts ONLY
    ├── Button/
    │   ├── Button-view.tsx
    │   ├── Button-container.tsx
    │   └── components/
    │       └── ButtonIcon-view.tsx
    ├── Card/
    │   ├── Card-view.tsx
    │   ├── Card-container.tsx
    │   └── assets/
    │       └── shadow.svg
    └── Modal/
        ├── Modal-view.tsx
        └── Modal-container.tsx
```

### 2. When to Use `app/components/`

Only shared components used by **multiple pages/layouts** should be in `app/components/`.

✅ **Good**: Common UI components

- Button, Card, Modal, Badge, Alert
- Form controls: Input, Select, Checkbox
- Layout components: Container, Grid, Flex
- Navigation: Breadcrumb, Pagination

❌ **Bad**: Page-specific components

- LoginForm (only used in /login)
- PlayerCard (only used in /unity-sports-resort)
- SidebarContent (only used in sidebar-layout)

**Decision Flow**:

```
Is this component used by 2+ pages/layouts?
  ├─ YES → Place in app/components/
  └─ NO  → Place in <page|layout>/components/
```

---

## Asset Management

### 1. Colocation: Assets Live Near Components

SVG icons and other assets should be placed in `assets/` directory next to the component that uses them.

```
pages/login/
├── components/
│   ├── LoginForm-container.tsx
│   ├── LoginForm-view.tsx
│   └── assets/                         # Assets for LoginForm
│       ├── lock-icon.svg
│       ├── email-icon.svg
│       └── password-icon.svg
└── page.tsx
```

### 2. Importing Assets as React Components

Use Vite's SVG import as React components:

```typescript
// LoginForm-view.tsx
import { LockIcon } from './assets/lock-icon.svg?react';
import { EmailIcon } from './assets/email-icon.svg?react';

export const LoginFormView = () => {
  return (
    <form>
      <label>
        <EmailIcon className="w-5 h-5" />
        Email
      </label>
    </form>
  );
};
```

### 3. Shared Assets: `app/assets/`

When **multiple components** across different pages/features use the same asset, place it in `app/assets/`.

```
app/
├── assets/                              # Shared assets ONLY
│   ├── tsar-logo.svg
│   ├── error-icon.svg
│   ├── success-icon.svg
│   ├── spinner.svg
│   └── loading-animation.svg
│
├── components/                          # These share assets from app/assets/
│   ├── Button/
│   ├── LoadingSpinner/
│   └── Alert/
│
└── pages/
    └── login/
        ├── components/
        │   └── LoginForm-container.tsx  # Can import from app/assets/
        └── assets/
            └── login-specific-icon.svg  # Login-only asset
```

### 4. Asset Import Patterns

```typescript
// Shared asset (used in multiple components across pages)
import { TsarLogo } from '@/assets/tsar-logo.svg?react';

// Component-specific asset
import { LockIcon } from './assets/lock-icon.svg?react';

// In JSX
<TsarLogo className="w-8 h-8" />
<LockIcon className="w-5 h-5" />
```

**Guidelines**:

- Use descriptive names: `lock-icon.svg`, not `icon.svg`
- Use kebab-case for file names
- Export as React component using `?react` suffix
- Apply styling via `className` prop

---

## Component Patterns: Container & Presenter

All components should follow the **Container/Presenter** pattern (also called "Smart/Dumb" components).

### Container Component (`-container.tsx`)

Handles:

- Data fetching (loaders, API calls)
- State management
- Event handling
- Business logic
- Passes props to Presenter

```typescript
// PlayerList-container.tsx
import { useQuery } from '@tanstack/react-query';
import { PlayerListView } from './PlayerList-view';

interface PlayerListContainerProps {
  guildId: string;
}

export const PlayerListContainer = ({ guildId }: PlayerListContainerProps) => {
  const { data: players, isLoading } = useQuery({
    queryKey: ['players', guildId],
    queryFn: () => fetchPlayers(guildId),
  });

  const handlePlayerSelect = (playerId: string) => {
    // Handle selection
  };

  return (
    <PlayerListView
      players={players ?? []}
      isLoading={isLoading}
      onPlayerSelect={handlePlayerSelect}
    />
  );
};
```

### Presenter Component (`-view.tsx`)

Handles:

- UI rendering only
- Receives all data via props
- No data fetching
- No state management (except UI state like open/close)
- No business logic
- Pure and testable

```typescript
// PlayerList-view.tsx
import { Player } from '@/types/player';
import { PlayerCard } from './components/PlayerCard-container';

interface PlayerListViewProps {
  players: Player[];
  isLoading: boolean;
  onPlayerSelect: (playerId: string) => void;
}

export const PlayerListView = ({
  players,
  isLoading,
  onPlayerSelect,
}: PlayerListViewProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onClick={() => onPlayerSelect(player.id)}
        />
      ))}
    </div>
  );
};
```

### Usage

Always export from Container, not View:

```typescript
// ✅ Good: Export container
export { PlayerListContainer as PlayerList };

// ❌ Bad: Don't export view
// export { PlayerListView as PlayerList };
```

Import in parent component:

```typescript
import { PlayerList } from './components/PlayerList-container';

export const UnityPage = () => {
  return <PlayerList guildId="123" />;
};
```

### When to Break the Pattern

For purely presentational components (no data, no logic):

```typescript
// Badge-view.tsx
// No Container version needed - it's pure presentation
export const Badge = ({ label }: { label: string }) => {
  return <span className="px-2 py-1 bg-blue-100 text-blue-800">{label}</span>;
};
```

Optional: Create a container for reusability if multiple pages use it differently:

```typescript
// Badge-container.tsx (if Badge needs variant selection or dynamic data)
export const BadgeContainer = ({ userId }: { userId: string }) => {
  const { status } = useUserStatus(userId);
  return <Badge label={status} />;
};
```

---

## File Naming Conventions

### Component Files

```typescript
// Container component (data layer)
FileName-container.tsx

// Presenter component (UI layer)
FileName-view.tsx

// Utility/helper functions
fileName.ts
useFileName.ts  // Custom hooks

// Types
fileName.types.ts  // or fileName.d.ts

// Tests
FileName.test.tsx
FileName.test.ts
```

### Examples

```
pages/login/
├── components/
│   ├── LoginForm-container.tsx          # Handles login logic
│   ├── LoginForm-view.tsx               # Renders form UI
│   ├── EmailInput-container.tsx         # Handles email validation
│   ├── EmailInput-view.tsx              # Renders email input
│   ├── EmailInput.test.tsx              # Tests for EmailInput
│   ├── useLoginForm.ts                  # Custom hook
│   └── login.types.ts                   # Type definitions
└── assets/
    └── lock-icon.svg
```

---

## Nesting Strategy

Components can be nested multiple levels deep:

```
page.tsx
└── <PageContainer>
    └── components/
        ├── Section1-container.tsx
        │   └── components/
        │       ├── Card-container.tsx
        │       │   └── components/
        │       │       ├── Header-view.tsx
        │       │       └── Body-view.tsx
        │       └── List-container.tsx
        │           └── components/
        │               └── ListItem-view.tsx
        │
        └── Section2-container.tsx
            └── components/
                └── Form-container.tsx
                    └── components/
                        ├── Input-view.tsx
                        └── Button-view.tsx
```

**Rules**:

- No component nesting beyond 3-4 levels (keep it flat if possible)
- Extract deeply nested components to separate files
- Consider moving common nested components to parent's sibling directory

---

## Import Aliases

Use path aliases for cleaner imports:

```typescript
// In tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"]
    }
  }
}

// Usage
import { Button } from '@/components/Button-container';
import { TsarLogo } from '@/assets/tsar-logo.svg?react';
import { Player } from '@/types/player';
```

❌ **Avoid relative imports**:

```typescript
// Bad
import { Button } from '../../../components/Button-container';
import { Player } from '../../../types/player';
```

✅ **Use alias imports**:

```typescript
// Good
import { Button } from '@/components/Button-container';
import { Player } from '@/types/player';
```

---

## Best Practices

### 1. One Component Per File

```
❌ Bad: Multiple components in one file
// LoginForm-view.tsx
export const LoginFormView = () => { ... }
export const EmailInputView = () => { ... }

✅ Good: One component per file
// LoginForm-view.tsx
export const LoginFormView = () => { ... }

// components/EmailInput-view.tsx
export const EmailInputView = () => { ... }
```

### 2. Keep Components Focused

Each component should have a single responsibility:

```typescript
// ❌ Bad: Too much responsibility
export const UserDashboard = () => {
  const user = useQuery(...);
  const posts = useQuery(...);
  const comments = useQuery(...);

  return (
    <div>
      {/* Everything here */}
    </div>
  );
};

// ✅ Good: Split into focused components
export const UserDashboardContainer = ({ userId }) => {
  const user = useQuery(...);
  return <UserDashboardView user={user} />;
};

export const UserPostsContainer = ({ userId }) => {
  const posts = useQuery(...);
  return <UserPostsView posts={posts} />;
};
```

### 3. Container Components Should Be Thin

Move complex logic to custom hooks:

```typescript
// ✅ Good: Use custom hooks
const usePlayerData = (guildId: string) => {
  const { data } = useQuery(...);
  const handleSelect = () => { ... };
  return { data, handleSelect };
};

export const PlayerListContainer = ({ guildId }) => {
  const { data, handleSelect } = usePlayerData(guildId);
  return <PlayerListView players={data} onSelect={handleSelect} />;
};
```

### 4. Assets Should Be Immutable

Don't modify SVG files after export:

```typescript
// ✅ Good: Use as-is
import { LockIcon } from './assets/lock-icon.svg?react';
<LockIcon className="w-5 h-5" />

// ❌ Bad: Avoid modifying inside component
import lockSvg from './assets/lock-icon.svg?raw';
const svg = lockSvg.replace('color="red"', 'color="blue"');
```

---

## Testing Patterns

### Test Containers and Views Separately

```typescript
// PlayerList-view.test.tsx
describe('PlayerListView', () => {
  it('renders players', () => {
    const { getByText } = render(
      <PlayerListView
        players={[{ id: '1', name: 'Alice' }]}
        isLoading={false}
        onPlayerSelect={vi.fn()}
      />
    );
    expect(getByText('Alice')).toBeInTheDocument();
  });
});

// PlayerList-container.test.tsx
describe('PlayerListContainer', () => {
  it('fetches and displays players', async () => {
    // Mock useQuery
    vi.mock('@tanstack/react-query', () => ({
      useQuery: vi.fn(() => ({
        data: [{ id: '1', name: 'Alice' }],
        isLoading: false,
      })),
    }));

    const { getByText } = render(<PlayerListContainer guildId="123" />);
    await waitFor(() => {
      expect(getByText('Alice')).toBeInTheDocument();
    });
  });
});
```

---

## Directory Structure Checklist

When creating a new page/layout, follow this template:

```
new-feature/
├── page.tsx                           # or layout.tsx
├── components/
│   ├── FeatureContainer-container.tsx
│   ├── FeatureContainer-view.tsx
│   ├── components/
│   │   ├── Section-container.tsx
│   │   ├── Section-view.tsx
│   │   └── components/
│   │       ├── Card-view.tsx
│   │       └── Card-container.tsx
│   ├── hooks/
│   │   └── useFeatureLogic.ts
│   ├── types/
│   │   └── feature.types.ts
│   └── assets/
│       └── icon.svg
└── <page|layout>.test.tsx
```

---

## Related Documentation

- `.context/roppoh/directory-structure.md` - Overall project structure
- React Router v7 docs - Layout and route patterns
- React Query docs - Data fetching in containers
