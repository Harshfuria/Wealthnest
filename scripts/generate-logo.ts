import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
const assetsDir = path.resolve(process.cwd(), 'src', 'assets', 'images');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// 1. Primary Emerald & Gold Master Logo (1200x1200)
const darkLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#184336" />
      <stop offset="55%" stop-color="#0E2921" />
      <stop offset="100%" stop-color="#071712" />
    </radialGradient>

    <!-- Metallic Gold Gradients -->
    <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C8" />
      <stop offset="25%" stop-color="#ECC662" />
      <stop offset="50%" stop-color="#FFE382" />
      <stop offset="75%" stop-color="#CDA02E" />
      <stop offset="100%" stop-color="#9E7919" />
    </linearGradient>

    <linearGradient id="goldAccent" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFEAA3" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#A57917" />
    </linearGradient>

    <linearGradient id="goldDark" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B2871A" />
      <stop offset="50%" stop-color="#DFC066" />
      <stop offset="100%" stop-color="#7D5908" />
    </linearGradient>

    <!-- Drop Shadow Filter -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="1200" fill="url(#bgGrad)" />

  <!-- Outer Luxury Border Framing -->
  <rect x="44" y="44" width="1112" height="1112" rx="20" fill="none" stroke="url(#goldLight)" stroke-width="2" stroke-opacity="0.4" />
  <rect x="58" y="58" width="1084" height="1084" rx="14" fill="none" stroke="url(#goldLight)" stroke-width="0.8" stroke-opacity="0.25" />

  <!-- Corner Geometric Ornaments -->
  <g stroke="url(#goldLight)" stroke-width="2" stroke-opacity="0.75" fill="none">
    <path d="M 44,80 L 80,80 L 80,44" />
    <path d="M 1156,80 L 1120,80 L 1120,44" />
    <path d="M 44,1120 L 80,1120 L 80,1156" />
    <path d="M 1156,1120 L 1120,1120 L 1120,1156" />
  </g>

  <!-- CENTER EMBLEM GROUP -->
  <g transform="translate(600, 430)" filter="url(#shadow)">
    <!-- Golden Geometric Crest Halo -->
    <circle r="225" fill="none" stroke="url(#goldDark)" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="6,6" />
    <circle r="185" fill="none" stroke="url(#goldLight)" stroke-width="1" stroke-opacity="0.2" />

    <!-- Nest Tier 1: Foundation Cradle Arch -->
    <path d="M -190,-10 C -160,150 0,225 0,225 C 0,225 160,150 190,-10 C 140,40 40,145 0,145 C -40,145 -140,40 -190,-10 Z" 
          fill="url(#goldAccent)" />

    <!-- Nest Tier 2: Mid-Level Interlocking Wings -->
    <path d="M -150,-40 C -120,70 0,140 0,140 C 0,140 120,70 150,-40 C 105,10 30,85 0,85 C -30,85 -105,10 -150,-40 Z" 
          fill="url(#goldLight)" />

    <!-- Nest Tier 3: Inner Vault Arch -->
    <path d="M -110,-70 C -80,20 0,75 0,75 C 0,70 80,20 110,-70 C 70,-20 20,35 0,35 C -20,35 -70,-20 -110,-70 Z" 
          fill="url(#goldDark)" />

    <!-- Central Rising Core: Compounding Growth Arrow & Diamond -->
    <!-- Upward Growth Facet Left -->
    <path d="M 0,-185 L -50,-35 L 0,-65 Z" fill="url(#goldLight)" />
    <!-- Upward Growth Facet Right -->
    <path d="M 0,-185 L 50,-35 L 0,-65 Z" fill="url(#goldDark)" />
    <!-- Center Diamond Core Left -->
    <path d="M 0,-65 L -50,-35 L 0,25 Z" fill="url(#goldAccent)" />
    <!-- Center Diamond Core Right -->
    <path d="M 0,-65 L 50,-35 L 0,25 Z" fill="url(#goldLight)" />

    <!-- Inner Golden Seed / Star of Precision (Wealth Preservation) -->
    <polygon points="0,-48 10,-32 30,-32 15,-17 21,5 0,-6 -21,5 -15,-17 -30,-32 -10,-32" fill="#FFFBE6" opacity="0.95" />

    <!-- Sweeping Architectural Filigree -->
    <path d="M -80,-105 C -115,-75 -135,-25 -135,15 C -100,-15 -60,-45 0,-45" fill="none" stroke="url(#goldLight)" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 80,-105 C 115,-75 135,-25 135,15 C 100,-15 60,-45 0,-45" fill="none" stroke="url(#goldLight)" stroke-width="4.5" stroke-linecap="round" />
  </g>

  <!-- TYPOGRAPHY / WORDMARK -->
  <g text-anchor="middle">
    <!-- Brand Title: WEALTHNEST -->
    <text x="600" y="780" 
          font-family="'Playfair Display', 'Cinzel', 'Georgia', serif" 
          font-size="64" 
          font-weight="700" 
          letter-spacing="10" 
          fill="url(#goldLight)" 
          filter="url(#shadow)">
      WEALTHNEST
    </text>

    <!-- Subtitle: ADVISORY LLC -->
    <text x="600" y="840" 
          font-family="'Inter', 'Montserrat', 'Arial', sans-serif" 
          font-size="25" 
          font-weight="600" 
          letter-spacing="16" 
          fill="#ECC662">
      ADVISORY LLC
    </text>

    <!-- Divider Line with Diamond Center -->
    <g transform="translate(600, 878)">
      <line x1="-240" y1="0" x2="-30" y2="0" stroke="url(#goldDark)" stroke-width="1.8" stroke-opacity="0.8" />
      <polygon points="0,-7 7,0 0,7 -7,0" fill="url(#goldLight)" />
      <line x1="30" y1="0" x2="240" y2="0" stroke="url(#goldDark)" stroke-width="1.8" stroke-opacity="0.8" />
    </g>

    <!-- Pillar Services -->
    <text x="600" y="922" 
          font-family="'Inter', 'Montserrat', 'Arial', sans-serif" 
          font-size="14" 
          font-weight="500" 
          letter-spacing="7" 
          fill="#A4C7B8">
      VIRTUAL CFO  •  CORPORATE TAX  •  ACCOUNTING
    </text>

    <!-- Tagline -->
    <text x="600" y="964" 
          font-family="'Georgia', serif" 
          font-style="italic" 
          font-size="15" 
          letter-spacing="2"
          fill="url(#goldLight)" 
          opacity="0.85">
      Safeguarding Assets. Structuring Growth.
    </text>
  </g>
</svg>
`;

// 2. Light / Stationery Edition (Crisp White Background with Emerald & Gold)
const lightLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
  <defs>
    <linearGradient id="lightBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F4F8F6" />
    </linearGradient>

    <linearGradient id="goldLightL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#C59B27" />
      <stop offset="100%" stop-color="#936F15" />
    </linearGradient>

    <linearGradient id="emeraldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3F35" />
      <stop offset="100%" stop-color="#0E231D" />
    </linearGradient>
  </defs>

  <rect width="1200" height="1200" fill="url(#lightBg)" />
  <rect x="44" y="44" width="1112" height="1112" rx="20" fill="none" stroke="#1E3F35" stroke-width="2" stroke-opacity="0.25" />
  <rect x="58" y="58" width="1084" height="1084" rx="14" fill="none" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.4" />

  <g transform="translate(600, 430)">
    <circle r="225" fill="none" stroke="#1E3F35" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="6,6" />
    
    <!-- Nest Arches -->
    <path d="M -190,-10 C -160,150 0,225 0,225 C 0,225 160,150 190,-10 C 140,40 40,145 0,145 C -40,145 -140,40 -190,-10 Z" 
          fill="#1E3F35" />
    <path d="M -150,-40 C -120,70 0,140 0,140 C 0,140 120,70 150,-40 C 105,10 30,85 0,85 C -30,85 -105,10 -150,-40 Z" 
          fill="#D4AF37" />
    <path d="M -110,-70 C -80,20 0,75 0,75 C 0,70 80,20 110,-70 C 70,-20 20,35 0,35 C -20,35 -70,-20 -110,-70 Z" 
          fill="#0F241E" />

    <!-- Core Diamond / Arrow -->
    <path d="M 0,-185 L -50,-35 L 0,-65 Z" fill="#D4AF37" />
    <path d="M 0,-185 L 50,-35 L 0,-65 Z" fill="#936F15" />
    <path d="M 0,-65 L -50,-35 L 0,25 Z" fill="#1E3F35" />
    <path d="M 0,-65 L 50,-35 L 0,25 Z" fill="#2C594C" />
    <polygon points="0,-48 10,-32 30,-32 15,-17 21,5 0,-6 -21,5 -15,-17 -30,-32 -10,-32" fill="#D4AF37" />
  </g>

  <g text-anchor="middle">
    <text x="600" y="780" 
          font-family="'Playfair Display', 'Cinzel', 'Georgia', serif" 
          font-size="64" 
          font-weight="700" 
          letter-spacing="10" 
          fill="#0F241E">
      WEALTHNEST
    </text>
    <text x="600" y="840" 
          font-family="'Inter', 'Montserrat', 'Arial', sans-serif" 
          font-size="25" 
          font-weight="600" 
          letter-spacing="16" 
          fill="#B58B1B">
      ADVISORY LLC
    </text>
    <g transform="translate(600, 878)">
      <line x1="-240" y1="0" x2="-30" y2="0" stroke="#1E3F35" stroke-width="1.8" stroke-opacity="0.5" />
      <polygon points="0,-7 7,0 0,7 -7,0" fill="#D4AF37" />
      <line x1="30" y1="0" x2="240" y2="0" stroke="#1E3F35" stroke-width="1.8" stroke-opacity="0.5" />
    </g>
    <text x="600" y="922" 
          font-family="'Inter', 'Montserrat', 'Arial', sans-serif" 
          font-size="14" 
          font-weight="600" 
          letter-spacing="7" 
          fill="#1E3F35">
      VIRTUAL CFO  •  CORPORATE TAX  •  ACCOUNTING
    </text>
    <text x="600" y="964" 
          font-family="'Georgia', serif" 
          font-style="italic" 
          font-size="15" 
          letter-spacing="2"
          fill="#526E65">
      Safeguarding Assets. Structuring Growth.
    </text>
  </g>
</svg>
`;

async function run() {
  console.log('Generating high-resolution logo assets...');

  // 1. Save SVG files
  fs.writeFileSync(path.join(publicDir, 'wealthnest-logo.svg'), darkLogoSvg, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'wealthnest-logo-light.svg'), lightLogoSvg, 'utf-8');

  // 2. Generate JPEG files using sharp
  // Primary Dark Edition 1200x1200 (Highest fidelity JPEG)
  await sharp(Buffer.from(darkLogoSvg))
    .resize(1200, 1200)
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(publicDir, 'wealthnest-logo.jpg'));
  
  // Copy to src/assets/images as well
  fs.copyFileSync(
    path.join(publicDir, 'wealthnest-logo.jpg'),
    path.join(assetsDir, 'wealthnest-logo.jpg')
  );

  // Light Edition 1200x1200
  await sharp(Buffer.from(lightLogoSvg))
    .resize(1200, 1200)
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(publicDir, 'wealthnest-logo-light.jpg'));

  // Standard Web Optimized 600x600 JPEG
  await sharp(Buffer.from(darkLogoSvg))
    .resize(600, 600)
    .jpeg({ quality: 92 })
    .toFile(path.join(publicDir, 'wealthnest-logo-600.jpg'));

  console.log('✅ Successfully generated Wealthnest Advisory logos:');
  console.log('  - public/wealthnest-logo.jpg (1200x1200px High-Res JPEG)');
  console.log('  - public/wealthnest-logo-light.jpg (1200x1200px White Stationery JPEG)');
  console.log('  - public/wealthnest-logo-600.jpg (600x600px Web JPEG)');
  console.log('  - public/wealthnest-logo.svg (Master Vector SVG)');
}

run().catch((err) => {
  console.error('Failed to generate logo:', err);
  process.exit(1);
});
