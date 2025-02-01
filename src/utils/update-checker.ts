import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';
import { version } from '../../package.json';

const execAsync = promisify(exec);

interface GithubRelease {
  tag_name: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
}

export async function checkForUpdates() {
  try {
    const response = await axios.get<GithubRelease>(
      'https://api.github.com/repos/happyforce/hf-data-dumper-cli/releases/latest'
    );

    const latestVersion = response.data.tag_name.replace('v', '');
    if (latestVersion > version) {
      console.log(`\nNew version available: ${latestVersion} (current: ${version})`);
      console.log('Run "hf-dumper update" to update to the latest version\n');
    }
  } catch (error: any) {
    // Silently fail on update check errors
  }
}

export async function updateTool() {
  try {
    console.log('Checking for updates...');
    
    const response = await axios.get<GithubRelease>(
      'https://api.github.com/repos/happyforce/hf-data-dumper-cli/releases/latest'
    );

    const latestVersion = response.data.tag_name.replace('v', '');
    if (latestVersion <= version) {
      console.log('You are already running the latest version!');
      return;
    }

    console.log(`Updating to version ${latestVersion}...`);
    
    // Get the correct binary for the current platform
    let assetName = 'hf-data-dumper-';
    switch (process.platform) {
      case 'linux':
        assetName += 'linux';
        break;
      case 'darwin':
        assetName += 'macos';
        break;
      case 'win32':
        assetName += 'win.exe';
        break;
      default:
        throw new Error('Unsupported platform');
    }

    const asset = response.data.assets.find(a => a.name === assetName);
    if (!asset) {
      throw new Error('Binary not found for your platform');
    }

    // Download and replace the current binary
    const binPath = process.argv[0];
    const tempPath = `${binPath}.new`;

    console.log('Downloading update...');
    const { data } = await axios.get(asset.browser_download_url, { responseType: 'arraybuffer' });
    await promisify(require('fs').writeFile)(tempPath, data);
    
    // Make the new file executable
    await execAsync(`chmod +x "${tempPath}"`);

    // Replace the old binary
    await promisify(require('fs').rename)(tempPath, binPath);

    console.log('Update completed! Please restart the tool.');
  } catch (error: any) {
    console.error('Error updating:', error.message);
    process.exit(1);
  }
} 