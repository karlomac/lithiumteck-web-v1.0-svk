#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC_DIR = './src';

class QuickSyntaxValidator {
	constructor() {
		this.errors = [];
		this.filesChecked = 0;
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
			{ pattern: /<[^>]*$/gm, message: 'Unclosed HTML tag' },
			{ pattern: /\{[^}]*$/gm, message: 'Unclosed bracket' },
			{ pattern: /\([^)]*$/gm, message: 'Unclosed parenthesis' },
			{ pattern: /"[^"]*$/gm, message: 'Unclosed double quote' },
			{ pattern: /'[^']*$/gm, message: 'Unclosed single quote' },
			{ pattern: /<[^>]*\s+\w+=\s*[^"'>\s]/gm, message: 'Invalid attribute syntax' }
		];

		for (const check of checks) {
			const matches = content.match(check.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: check.message,
					type: 'syntax'
				});
			}
		}
	}

	checkSvelteSyntax(content, filePath) {
		// Svelte-specific checks
		const svelteChecks = [
			{ pattern: /<script[^>]*>(?!.*<\/script>)/gs, message: 'Unclosed <script> tag' },
			{ pattern: /<style[^>]*>(?!.*<\/style>)/gs, message: 'Unclosed <style> tag' },
			{ pattern: /\{#each[^}]*\}(?!.*\{\/each\})/gs, message: 'Unclosed #each block' },
			{ pattern: /\{#if[^}]*\}(?!.*\{\/if\})/gs, message: 'Unclosed #if block' },
			{ pattern: /import[^;]*$/gm, message: 'Incomplete import statement' }
		];

		for (const check of svelteChecks) {
			const matches = content.match(check.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: check.message,
					type: 'svelte'
				});
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
		console.log('🔍 Quick syntax validation...\n');
		
		const files = this.getAllFiles(SRC_DIR);
		
		for (const file of files) {
			this.validateFile(file);
		}
		
		console.log(`📊 Checked ${this.filesChecked} files`);
		
		if (this.errors.length > 0) {
			console.log('\n❌ Syntax errors found:');
			this.errors.forEach((error, index) => {
				console.log(`   ${index + 1}. ${error.file}: ${error.message}`);
			});
			console.log('\nPlease fix these errors before compiling.');
			process.exit(1);
		} else {
			console.log('✅ No syntax errors detected. Safe to compile!');
		}
	}
}

// Run the validator
const validator = new QuickSyntaxValidator();
validator.run();
