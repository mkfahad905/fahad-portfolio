# Fahad — Full Stack Developer Portfolio

A personal portfolio built to showcase full-stack engineering work, system architecture, interactive interfaces, and selected projects.

## Overview

This repository contains the source code for my developer portfolio. Its structure reflects how I approach full-stack development across backend concepts, APIs, data structures, frontend systems, interaction design, and presentation.

## Featured Systems

- **Enterprise Surveillance Operations Platform**: A backend service and API integration layer for managing enterprise alerts. It features ticket workflows, camera/NVR integrations, and production debugging capabilities built with Django, REST APIs, PostgreSQL, RabbitMQ, and MinIO.
- **InnerLight Counselling Platform**: A counselling website providing an online-first user flow and booking/contact workflow, built with Next.js, TypeScript, and Tailwind CSS.

## Engineering Approach

The application architecture demonstrates:
- **Backend Architecture & APIs**: Structured to interface cleanly with RESTful services.
- **Data and Services**: Content and application data are strongly typed and systematically managed.
- **Frontend State**: UI and interaction state is managed using React hooks and component state.
- **Digital Experience**: The user interface integrates hardware-accelerated animations and interactive elements.
- **Maintainability**: The codebase enforces strict typing, component reusability, and modularity.
- **Responsive Interfaces**: Ensures a consistent experience across devices.
- **Accessibility**: Includes system-level reduced-motion support.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation / Interaction**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

- `src/app/` — Next.js App Router definitions, page components, and routing logic.
- `src/components/` — Reusable UI elements and layout components.
- `src/sections/` — High-level page sections composing multiple components.
- `src/config/` — Environment and application-wide configuration values.
- `src/data/` — Static data structures serving as content for the portfolio.
- `src/lib/` — Shared utilities, helpers, and shared logic.
- `src/types/` — Global TypeScript interfaces and type definitions.

## Getting Started

To run the portfolio locally, execute the following commands:

```bash
npm install
npm run dev
```

The local development server will be available at `http://localhost:3000`.

## Production Build

To verify code quality and build the production bundle, execute:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

The application is deployed on Vercel.

## Engineering Notes

- **Next.js App Router**: Built using React Server Components (RSC).
- **Responsive Behavior**: Implements a responsive layout utilizing a utility-first breakpoint system.
- **Reduced-Motion Support**: Respects system-level accessibility preferences for users who request reduced motion.
- **Interactive Project Showcase**: Features a custom-built horizontal scrolling project showcase.
- **SEO / Metadata**: Configured with the Next.js Metadata API, canonical metadata, Open Graph, Twitter metadata, robots, sitemap, and structured data.
