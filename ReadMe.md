# MemeGen Web Extension

This is a web extension that allows users to generate memes using various templates.

<a href="https://addons.mozilla.org/en-US/firefox/addon/memegen/">
    <picture>
      <source srcset="https://i.imgur.com/ZluoP7T.png" media="(prefers-color-scheme: dark)">
      <img height="58" src="https://i.imgur.com/4PobQqE.png" alt="Firefox add-ons"></picture></a>

### screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="./public/screenshots/screenshot-1.jpg" alt="Screenshot 1" style="width: 200px;">
  <img src="./public/screenshots/screenshot-2.jpg" alt="Screenshot 2" style="width: 200px;">
  <img src="./public/screenshots/screenshot-3.jpg" alt="Screenshot 3" style="width: 200px;">
  <img src="./public/screenshots/screenshot-4.jpg" alt="Screenshot 4" style="width: 200px;">
</div>

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
