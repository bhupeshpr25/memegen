# MemeGen Web Extension

This is a web extension that allows users to generate memes using various templates.

## Requirements

- Node.js (v14 or later)
- pnpm (v6 or later)
- Firefox browser
- Git
- [imgflip](https://imgflip.com/) account

## Supported Operating Systems

This project should work on the following operating systems:

- Linux
- Windows
- macOS

## Build Instructions

#### 1. Clone the repository:

```bash
  git clone https://github.com/bhupeshpr25/memegen.git
```

#### 2. Navigate to the project directory:

```bash
  cd memegen
```

#### 3. Install dependencies

```bash
  pnpm install
```

#### 4. Environment Variables

Create a `.env` file in the root directory of your project and add your [imgflip](https://imgflip.com/) credentials

Example `.env` file:

```plaintext
  VITE_IMGFLIP_USERNAME=your_username
  VITE_IMGFLIP_PASSWORD=your_password
```

#### 5. Run the extension

- Run the development command

```bash
  pnpm dev
```

- This wil open the firefox browser in developer mode

- Click on the extension in the extension menu to run

#### 6. Build the extension

- Run the build command

```bash
  pnpm build
```

- This will update the `dist` folder in the root directory with the necessary changes
