---
title: 'TypeScript Fundamentals - Part 2: Understanding Types'
date: '2024-11-16'
excerpt: 'Deep dive into TypeScript type system including primitive types, arrays, tuples, and type annotations.'
author: 'Tech Blog'
category: 'TypeScript'
tags: ['typescript', 'tutorial', 'types']
series: 'typescript-fundamentals'
seriesOrder: 2
seriesTitle: 'TypeScript Fundamentals'
seriesDescription: 'A complete guide to mastering TypeScript from basics to advanced concepts'
---

# Understanding TypeScript Types

Welcome to Part 2 of our TypeScript Fundamentals series! Today we'll explore the type system that makes TypeScript so powerful.

## Primitive Types

TypeScript includes all JavaScript primitive types:

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let notDefined: undefined = undefined;
let notPresent: null = null;
```

## Arrays and Tuples

### Arrays

```typescript
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
```

### Tuples

Fixed-length arrays with specific types:

```typescript
let person: [string, number] = ["Alice", 30];
```

## Type Inference

TypeScript can automatically infer types:

```typescript
let message = "Hello"; // TypeScript infers string type
let count = 42; // TypeScript infers number type
```

## Union Types

Variables that can hold multiple types:

```typescript
let id: string | number;
id = "ABC123"; // OK
id = 123; // Also OK
```

## Type Aliases

Create reusable type definitions:

```typescript
type ID = string | number;
type User = {
  name: string;
  age: number;
  email: string;
};
```

## What's Coming Next?

In Part 3, we'll cover:
- Interfaces
- Classes
- Generics
- Advanced type features

Keep learning!
