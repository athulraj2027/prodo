Productivity & Focus Tracker

A personal productivity and focus-tracking application built for me and my friends to work with structured sessions, tasks, timers, and analytics.

This project is designed to solve a simple problem:

Working longer is not the same as working effectively.

Instead of generic to-do lists, the app is built around time-bound sessions, real usage data, and clear analytics, so productivity is measured by what actually happened, not what was planned.

Core Features
1. Task Management

Create and manage tasks

Tasks are independent of sessions

Tasks can have multiple sessions over time

Automatic status updates based on session activity

2. Session Tracking

Start and stop focused work sessions

Each session is linked to a task

Session duration is calculated and stored accurately

Handles long-running sessions reliably

Backend-enforced rules to avoid invalid session states

3. Timer System

Single active timer at a time

Prevents overlapping sessions

Designed to reflect real work patterns

Safe against tab inactivity and browser suspension

4. Analytics

Daily, weekly, and overall productivity insights

Analytics derived only from actual session data

No fake metrics or manual inputs

Clear breakdown of time spent per task

5. Authentication & Security

Authentication handled using Clerk

Secure session-based access

Protected APIs with proper authorization

Cron and internal routes separated from user-authenticated routes

Tech Stack
Frontend

Next.js

TypeScript

Tailwind CSS

Zustand (state management)

Backend

Node.js

Express

MongoDB

Clerk authentication

Cron jobs for background task updates

Deployment

Deployed backend with environment-based configuration

Secure CORS setup for frontend communication

Design Philosophy

Task is not equal to session

Analytics should come from raw data, not assumptions

Backend enforces business rules

No shortcuts that compromise data correctness

Built for real usage, not demo behavior

This project is intentionally opinionated and structured to match how focused work actually happens.

Current Status
Implemented

Tasks

Sessions

Timer logic

Analytics

Secure authentication

Cron-based background updates

Planned Features
DSA Practice Module

Structured daily and weekly problem-solving

Progress tracking and revision support

Team Productivity

Create teams

Shared productivity goals

Session-based collaboration insights

These features are planned and will be added incrementally.

Purpose

This project is not meant to be a generic productivity app.

It is built:

For personal use

For a small group of friends

To enforce discipline through data

To improve focus, not just planning
