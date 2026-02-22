# AGENTS.md - Taxi-Mate Development Guide

This document provides essential information for AI coding agents working on the Taxi-Mate project.

## Project Overview

Taxi-Mate is a React + TypeScript taxi carpool service for university students, using Vite, Redux Toolkit, styled-components, Tailwind CSS, and Vitest for testing.

## Build & Development Commands

### Common Commands
```bash
npm run dev          # Start dev server (Vite)
npm run build        # TypeScript compile + Vite build
npm run preview      # Preview production build
npm run lint         # Run ESLint on .ts/.tsx files
npm test             # Run all tests with Vitest
npm run test:ui      # Run tests with Vitest UI
```

### Running Tests
```bash
# Run all tests
npm test

# Run a single test file
npx vitest src/hooks/useNavigate/useNavigate.spec.ts

# Run tests in watch mode
npx vitest --watch

# Run tests matching a pattern
npx vitest --grep "goBack"
```

## Project Structure

```
src/
├── api/              # API layer with RTK Query
├── components/       # Shared/common components
├── constants/        # Constants (paths, etc.)
├── domains/          # Feature-specific components
├── features/         # Redux slices
├── hooks/            # Custom React hooks
├── pages/            # Page-level components
├── shared/           # Shared UI components (Button, etc.)
├── store/            # Redux store configuration
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Code Style Guidelines

### Import Order
1. External libraries (React, Redux, etc.)
2. Internal imports with `@/` alias
3. Relative imports
4. Type imports (use `import type` when possible)

Example:
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '@/constants/path.ts';
import formatPathWithParams from '@/utils/formatPathWithParams.ts';
import type { Post, PostDetail } from '@/types/post.ts';
```

### File Extensions
- Always include `.ts` or `.tsx` extensions in imports
- Example: `import { API_PATH } from '@/constants/path.ts';`

### Path Aliases
- Use `@/` for absolute imports from `src/`
- Example: `@/components/Button` → `src/components/Button`

### TypeScript Guidelines

#### Strict Mode
- TypeScript strict mode is enabled
- Always provide explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/intersections

#### Type Definitions
- Place shared types in `src/types/` directory
- Group related types by feature (post.ts, user.ts, chat.ts)
- Export types from index files when appropriate

Example:
```typescript
export interface Post {
  id: string;
  title: string;
  departureTime: string;
  origin: string;
  maxParticipants: number;
  currentParticipants: number;
}

export type PostDetailStatus = 'NONE' | 'PARTICIPATING' | 'TERMINATED';
```

### Naming Conventions

#### Files
- Components: PascalCase (e.g., `Button.tsx`, `PostListItem.tsx`)
- Styles: `ComponentName.style.ts` (e.g., `Button.style.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useNavigate.ts`)
- Tests: `fileName.spec.ts` (e.g., `useNavigate.spec.ts`)
- Utils: camelCase (e.g., `formatPathWithParams.ts`)
- Constants: camelCase (e.g., `path.ts`)

#### Variables & Functions
- camelCase for variables and functions
- PascalCase for components and classes
- UPPER_SNAKE_CASE for constants

#### Components
- Use named exports for components
- Use `PropsWithChildren` when children are needed
- Extend HTML element props with `ComponentPropsWithRef`

Example:
```typescript
export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isDisabled?: boolean;
}

export const Button = ({ children, variant, size, ...props }: PropsWithChildren<ButtonProps>) => {
  return <StyledButton variant={variant} size={size} {...props}>{children}</StyledButton>;
};
```

### Styling

#### styled-components
- Create separate `.style.ts` files for styled components
- Use CSS variables for theming (e.g., `var(--color-main)`)
- Group related styles with `css` helper
- Use props for dynamic styling

Example:
```typescript
const sizeStyles = {
  sm: css`min-height: 36px; padding: 0 12px;`,
  md: css`min-height: 40px; padding: 0 16px;`,
} as const;

export const StyledButton = styled.button<ButtonProps>`
  ${({ size = 'md' }) => sizeStyles[size]}
`;
```

#### Tailwind CSS
- Tailwind is available for utility classes
- NextUI components are used for date pickers, radio buttons, etc.

### API Layer

#### RTK Query
- Use `baseApi.injectEndpoints()` to add endpoints
- Transform responses to extract `data` property
- Export generated hooks with `use` prefix

Example:
```typescript
const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], QueryArgs>({
      query: (arg) => ({ url: API_PATH.POST.GET.ALL, params: arg }),
      transformResponse: (response: { data: Post[] }) => response.data,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
```

### Error Handling
- Use try-catch for async operations
- Handle 401 errors with token refresh in `baseApi.ts`
- Display user-friendly error messages

### Testing

#### Vitest Configuration
- Global test utilities from `@testing-library/react`
- `vitest/globals` enabled (no need to import `describe`, `it`, `expect`)
- Use `vi.fn()` for mocks, `vi.mock()` for module mocks

#### Test Structure
```typescript
describe('Component/Hook Name', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should do something specific', () => {
    // Arrange, Act, Assert
  });
});
```

#### Testing Hooks
```typescript
import { renderHook } from '@testing-library/react';

const { result } = renderHook(() => useCustomNavigation());
result.current.goBack();
expect(navigateFn).toHaveBeenCalledWith(-1);
```

## Common Patterns

### Custom Hooks
- Place in `src/hooks/` directory
- Export from index file when needed
- Include unit tests in same directory

### Path Constants
- Define all paths in `src/constants/path.ts`
- Use `CLIENT_PATH` for frontend routes
- Use `API_PATH` for backend endpoints
- Use `:id` for dynamic path segments

### Navigation
- Use custom `useCustomNavigation` hook instead of react-router's `useNavigate`
- Provides: `goBack()`, `goHome()`, `goTo({ path, id, options })`

## Environment Variables
- Use `import.meta.env.VITE_*` for Vite environment variables
- Store sensitive data in `.env` (not committed to git)

## Additional Notes
- The app uses STOMP/WebSocket for real-time chat
- Naver Maps integration for location features
- OAuth2 with Kakao for authentication
- MSW (Mock Service Worker) for API mocking in tests
