import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

// Get repository name from git config
const repoName = execSync('basename -s .git `git config --get remote.origin.url`')
  .toString()
  .trim();

// Create a temporary build configuration
const buildConfig = {
  base: `/${repoName}/`,
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
  },
};

// Write the configuration
writeFileSync('vite.build.json', JSON.stringify(buildConfig, null, 2));

// Run the build command with the custom config
execSync('VITE_CONFIG_PATH=vite.build.json npm run build', { stdio: 'inherit' });
