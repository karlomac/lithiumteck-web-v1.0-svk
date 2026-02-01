#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC_DIR = './src';

console.log('🔍 pnpm Syntax Validation for SvelteKit\n');

class PnpmSyntaxValidator {
	constructor() {
		this.errors = [];
		this.filesChecked = 0;
		this.warnings = [];
	}

	validateFile(filePath) {
		try {
			const content = readFileSync(filePath, 'utf8');
			const ext = extname(filePath);
			
			// Quick syntax validation
			this.checkBasicSyntax(content, filePath);
			
			// Svelte-specific validation
			if (ext === '.svelte') {
				this.checkSvelteSyntax(content, filePath);
			}
			
			// JavaScript/TypeScript validation
			if (ext === '.js' || ext === '.ts') {
				this.checkJSSyntax(content, filePath);
			}
			
			this.filesChecked++;
			return true;
		} catch (error) {
			this.errors.push({
				file: filePath,
				message: `File read error: ${error.message}`,
				type: 'file'
			});
			return false;
		}
	}

	checkBasicSyntax(content, filePath) {
		// Check for common syntax errors that would break compilation
		const checks = [
			{ pattern: /<[^>]*$/gm, message: 'Unclosed HTML tag', severity: 'error' },
			{ pattern: /\{[^}]*$/gm, message: 'Unclosed bracket', severity: 'error' },
			{ pattern: /\([^)]*$/gm, message: 'Unclosed parenthesis', severity: 'error' },
			{ pattern: /"[^"]*$/gm, message: 'Unclosed double quote', severity: 'error' },
			{ pattern: /'[^']*$/gm, message: 'Unclosed single quote', severity: 'error' },
			{ pattern: /<[^>]*\s+\w+=\s*[^"'>\s]/gm, message: 'Invalid attribute syntax', severity: 'error' },
			{ pattern: /<[^>]*\s+href\s*=\s*[^"'>\s]/gm, message: 'Missing quotes in href attribute', severity: 'error' }
		];

		for (const check of checks) {
			const matches = content.match(check.pattern);
			if (matches) {
				if (check.severity === 'error') {
					this.errors.push({
						file: filePath,
						message: check.message,
						type: 'syntax'
					});
				} else {
					this.warnings.push({
						file: filePath,
						message: check.message,
						type: 'syntax'
					});
				}
			}
		}
	}

	checkSvelteSyntax(content, filePath) {
		// Svelte-specific checks
		const svelteChecks = [
			{ pattern: /<script[^>]*>(?!.*<\/script>)/gs, message: 'Unclosed <script> tag', severity: 'error' },
			{ pattern: /<style[^>]*>(?!.*<\/style>)/gs, message: 'Unclosed <style> tag', severity: 'error' },
			{ pattern: /\{#each[^}]*\}(?!.*\{\/each\})/gs, message: 'Unclosed #each block', severity: 'error' },
			{ pattern: /\{#if[^}]*\}(?!.*\{\/if\})/gs, message: 'Unclosed #if block', severity: 'error' },
			{ pattern: /import[^;]*$/gm, message: 'Incomplete import statement', severity: 'error' },
			{ pattern: /export[^;]*$/gm, message: 'Incomplete export statement', severity: 'error' },
			{ pattern: /\{[^}]*\s+\w+\s*\}[^}]*$/gm, message: 'Invalid Svelte expression', severity: 'warning' }
		];

		for (const check of svelteChecks) {
			const matches = content.match(check.pattern);
			if (matches) {
				if (check.severity === 'error') {
					this.errors.push({
						file: filePath,
						message: check.message,
						type: 'svelte'
					});
				} else {
					this.warnings.push({
						file: filePath,
						message: check.message,
						type: 'svelte'
					});
				}
			}
		}
	}

	checkJSSyntax(content, filePath) {
		// JavaScript/TypeScript checks
		const jsChecks = [
			{ pattern: /function\s+\w+\s*\([^)]*\s*$/gm, message: 'Invalid function syntax', severity: 'error' },
			{ pattern: /\([^)]*\s*=>\s*[^{,]*$/gm, message: 'Invalid arrow function syntax', severity: 'error' },
			{ pattern: /import\s+.*[^;]$/gm, message: 'Missing semicolon in import statement', severity: 'error' },
			{ pattern: /export\s+.*[^;]$/gm, message: 'Missing semicolon in export statement', severity: 'error' },
			{ pattern: /const\s+\w+\s*=\s*[^;]*$/gm, message: 'Missing semicolon in const declaration', severity: 'warning' },
			{ pattern: /let\s+\w+\s*=\s*[^;]*$/gm, message: 'Missing semicolon in let declaration', severity: 'warning' }
		];

		for (const check of jsChecks) {
			const matches = content.match(check.pattern);
			if (matches) {
				if (check.severity === 'error') {
					this.errors.push({
						file: filePath,
						message: check.message,
						type: 'javascript'
					});
				} else {
					this.warnings.push({
						file: filePath,
						message: check.message,
						type: 'javascript'
					});
				}
			}
		}
	}

	getAllFiles(dir, fileList = []) {
		const files = readdirSync(dir);
		
		for (const file of files) {
			const filePath = join(dir, file);
			const stat = statSync(filePath);
			
			if (stat.isDirectory()) {
				this.getAllFiles(filePath, fileList);
			} else if (file.endsWith('.svelte') || file.endsWith('.js') || file.endsWith('.ts')) {
				fileList.push(filePath);
			}
		}
		
		return fileList;
	}

	run() {
		console.log('📦 Running pnpm syntax validation...\n');
		
		const files = this.getAllFiles(SRC_DIR);
		
		for (const file of files) {
			this.validateFile(file);
		}
		
		console.log(`📊 Checked ${this.filesChecked} files`);
		console.log(`🚨 Errors: ${this.errors.length}`);
		console.log(`⚠️  Warnings: ${this.warnings.length}\n`);
		
		if (this.errors.length > 0) {
			console.log('❌ Syntax errors found:');
			this.errors.forEach((error, index) => {
				console.log(`   ${index + 1}. ${error.file}: ${error.message}`);
			});
			console.log('\n💡 Run `pnpm run lint:fix` to auto-fix some issues');
			console.log('❌ Please fix errors before compiling with pnpm');
			process.exit(1);
		}
		
		if (this.warnings.length > 0) {
			console.log('⚠️  Warnings found:');
			this.warnings.forEach((warning, index) => {
				console.log(`   ${index + 1}. ${warning.file}: ${warning.message}`);
			});
			console.log('\n✅ No blocking errors, but consider fixing warnings');
		}
		
		console.log('✅ All syntax checks passed! Safe to run pnpm dev/build');
	}
}

// Run the validator
const validator = new PnpmSyntaxValidator();
validator.run();
