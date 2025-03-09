# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial Next.js project setup with TypeScript
- Basic project structure with app router
- TailwindCSS configuration
- ESLint setup for code quality
- Basic development scripts (dev, build, start, lint)
- Project structure for voice interface components
- Vercel serverless function configuration
- Detailed project roadmap in README
- Environment variable templates
- Directory structure for:
  - Voice interface components
  - DeepSpeech integration
  - Google Sheets integration
- Claude AI Integration:
  - Claude API client setup with TypeScript
  - API route for Claude interactions
  - Error handling and type safety
  - Response parsing for text content
- Voice Chat Interface:
  - Real-time speech-to-text transcription
  - Chat message history display
  - Voice recording toggle button
  - Text-to-speech response playback
- Version display in footer
- Automatic deployment configuration in vercel.json

### Changed
- Updated dependencies to stable versions:
  - Next.js 14.1.0
  - React 18.2.0
  - TypeScript 5.3.3
  - TailwindCSS 3.4.1
  - ESLint 8.56.0
- Simplified page layout with clean design
- Updated metadata with proper project title and description
- Switched from Geist to Inter font for better compatibility
- Updated Tailwind directives in globals.css
- Enhanced README with comprehensive documentation
- Switched from DeepSeek to Claude AI for simpler integration
- Improved Vercel deployment settings with explicit git configuration

### Fixed
- Replaced next.config.ts with next.config.js for better compatibility
- Removed experimental turbopack flag from dev script
- Added missing Tailwind configuration
- Fixed font configuration issues
- Removed unused image imports and simplified markup
- Fixed PostCSS configuration for Tailwind CSS
- Corrected Tailwind directives in global styles
- Added TypeScript declarations for Web Speech API
- Configured automatic deployments in Vercel

## [0.1.0] - 2024-03-09
### Added
- Initial commit with project bootstrap 