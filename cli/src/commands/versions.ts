import chalk from 'chalk';
import ora from 'ora';
import { fetchReleases, GitHubRateLimitError } from '../utils/github.js';
import { logger } from '../utils/logger.js';

interface VersionsOptions {
  githubToken?: string;
}

export async function versionsCommand(options: VersionsOptions = {}): Promise<void> {
  const spinner = ora('Fetching available versions...').start();

  try {
    const releases = await fetchReleases({ token: options.githubToken });

    if (releases.length === 0) {
      spinner.warn('No releases found');
      return;
    }

    spinner.succeed(`Found ${releases.length} version(s)\n`);

    console.log(chalk.bold('Available versions:\n'));

    releases.forEach((release, index) => {
      const isLatest = index === 0;
      const tag = release.tag_name;
      const date = new Date(release.published_at).toLocaleDateString();

      if (isLatest) {
        console.log(`  ${chalk.green('*')} ${chalk.bold(tag)} ${chalk.dim(`(${date})`)} ${chalk.green('[latest]')}`);
      } else {
        console.log(`    ${tag} ${chalk.dim(`(${date})`)}`);
      }
    });

    console.log();
    logger.dim('Use: uipro init --version <tag> to install a specific version');
  } catch (error) {
    spinner.fail('Failed to fetch versions');
    if (error instanceof GitHubRateLimitError) {
      logger.error(error.message);
      process.exit(1);
    }
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}
