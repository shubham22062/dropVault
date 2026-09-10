# DropVault

DropVault is a sleek file upload dashboard built with React, TypeScript, and Vite. It lets you drag and drop files, monitor progress, retry failed uploads, and cancel active transfers in a polished interface.

## Features

- Drag-and-drop upload area
- Multi-file queue support
- Progress tracking per file
- Concurrency limit for uploads
- Retry failed transfers
- Cancel active or pending uploads
- Responsive, modern UI

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Project structure

```text
src/
  App.tsx
  components/
    DropZone.tsx
    FileItem.tsx
    FileList.tsx
    ProgressBar.tsx
  hooks/
    useUploadQueue.ts
  services/
    chunkService.ts
    uploadService.ts
  types/
    upload.ts
  utils/
    fileUtils.ts
```

## Notes

This app simulates chunked uploads with a lightweight in-browser queue and animated progress indicators. It is ideal for UI prototyping or learning how upload state management works in React.

## Scripts

- `npm run dev` — run the app locally
- `npm run build` — type-check and produce a production build
- `npm run lint` — lint the codebase
