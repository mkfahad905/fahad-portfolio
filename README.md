# Fahad MK - Developer Portfolio

A production-grade developer portfolio built with a focus on robust system architecture, seamless animations, and modern React practices. This repository serves as the source code for my personal portfolio.

## Overview

The portfolio is designed to showcase enterprise-level engineering capabilities, prioritizing structured data models, clean API boundaries, and high-performance user interfaces over simple static layouts.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform) & Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Architecture

The application follows a structured **"API → State → Frame"** pipeline:
1. **Data Layer**: Content and case study data are heavily structured in TypeScript, simulating an external API or headless CMS.
2. **State Layer**: React context and hooks manage the presentation state efficiently.
3. **Frame Layer**: The UI is rendered using server and client components, heavily augmented by GSAP and Framer Motion for scroll-linked animations and page transitions.

## Core Features

- **Component-Driven Design**: Highly reusable UI components ensuring design consistency.
- **Scroll Animations**: Advanced GSAP integration for dynamic content reveal.
- **Responsive Layouts**: Fully responsive grid and flexbox architecture powered by Tailwind.
- **Strict Typing**: Comprehensive TypeScript interfaces for all data structures and props to prevent runtime errors.

## Local Development

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/mkfahad905/fahad-portfolio.git
   cd fahad-portfolio
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
