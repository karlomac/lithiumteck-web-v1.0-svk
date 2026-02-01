import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { execSync } from 'child_process';

const SRC_DIR = './src';
const TEST_PATTERNS = {
	svelte: /\.(svelte)$/,
	js: /\.(js)$/,
	ts: /\.(ts)$/
};

class SyntaxValidator {
	constructor() {
		this.errors = [];
		this.warnings = [];
		this.passed = 0;
		this.failed = 0;
	}

	validateFile(filePath) {
		try {
			const content = readFileSync(filePath, 'utf8');
			const ext = extname(filePath);
			
			// Basic syntax validation
			this.validateBasicSyntax(content, filePath, ext);
			
			// Svelte-specific validation
			if (TEST_PATTERNS.svelte.test(filePath)) {
				this.validateSvelteSyntax(content, filePath);
			}
			
			// JavaScript/TypeScript validation
			if (TEST_PATTERNS.js.test(filePath) || TEST_PATTERNS.ts.test(filePath)) {
				this.validateJSSyntax(content, filePath);
			}
			
			this.passed++;
			return true;
		} catch (error) {
			this.errors.push({
				file: filePath,
				message: error.message,
				type: 'syntax'
			});
			this.failed++;
			return false;
		}
	}

	validateBasicSyntax(content, filePath, ext) {
		// Check for common syntax errors
		const commonErrors = [
			// Missing closing tags
			{ pattern: /<[^>]*$/gm, message: 'Unclosed HTML tag detected' },
			// Missing closing brackets
			{ pattern: /\{[^}]*$/gm, message: 'Unclosed bracket detected' },
			// Missing closing parentheses
			{ pattern: /\([^)]*$/gm, message: 'Unclosed parenthesis detected' },
			// Unmatched quotes
			{ pattern: /"[^"]*$/gm, message: 'Unclosed double quote detected' },
			{ pattern: /'[^']*$/gm, message: 'Unclosed single quote detected' },
			// Invalid attribute syntax
			{ pattern: /<[^>]*\s+\w+=\s*[^"'>\s]/gm, message: 'Invalid attribute syntax detected' }
		];

		for (const error of commonErrors) {
			const matches = content.match(error.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: error.message,
					type: 'syntax',
					line: this.getLineNumber(content, matches[0])
				});
			}
		}
	}

	validateSvelteSyntax(content, filePath) {
		// Svelte-specific syntax checks
		const svelteErrors = [
			// Missing script/style/template closing tags
			{ pattern: /<script[^>]*>(?!.*<\/script>)/gs, message: 'Unclosed <script> tag' },
			{ pattern: /<style[^>]*>(?!.*<\/style>)/gs, message: 'Unclosed <style> tag' },
			// Invalid Svelte directives
			{ pattern: /<[^>]*\s+on:[^=]*>/gm, message: 'Invalid event directive syntax' },
			{ pattern: /<[^>]*\s+bind:[^=]*>/gm, message: 'Invalid bind directive syntax' },
			// Missing closing curly braces in template
			{ pattern: /\{[^}]*\{[^}]*$/gm, message: 'Nested unclosed braces in template' },
			// Invalid each block syntax
			{ pattern: /\{#each[^}]*\}(?!.*\{\/each\})/gs, message: 'Unclosed #each block' },
			{ pattern: /\{#if[^}]*\}(?!.*\{\/if\})/gs, message: 'Unclosed #if block' },
			// Invalid import syntax
			{ pattern: /import[^;]*$/gm, message: 'Incomplete import statement' }
		];

		for (const error of svelteErrors) {
			const matches = content.match(error.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: error.message,
					type: 'svelte',
					line: this.getLineNumber(content, matches[0])
				});
			}
		}

		// Check for proper Svelte component structure
		this.validateSvelteStructure(content, filePath);
	}

	validateSvelteStructure(content, filePath) {
		// Ensure proper component structure
		const hasScript = /<script/.test(content);
		const hasStyle = /<style/.test(content);
		const hasTemplate = content.includes('>') && !content.trim().startsWith('<script') && !content.trim().startsWith('<style');

		// Check for proper tag nesting
		const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
		const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);

		if (scriptMatch) {
			this.validateJSSyntax(scriptMatch[1], filePath, 'script');
		}

		if (styleMatch) {
			this.validateCSSSyntax(styleMatch[1], filePath);
		}
	}

	validateJSSyntax(content, filePath, context = 'file') {
		// JavaScript syntax validation
		const jsErrors = [
			// Missing semicolons (where required)
			{ pattern: /^[^/]*\b(?:var|let|const)\s+\w+\s*=\s*[^;]*$/gm, message: 'Missing semicolon in variable declaration' },
			// Invalid function syntax
			{ pattern: /function\s+\w+\s*\([^)]*\s*$/gm, message: 'Invalid function syntax' },
			// Invalid arrow function syntax
			{ pattern: /\([^)]*\s*=>\s*[^{,]*$/gm, message: 'Invalid arrow function syntax' },
			// Missing closing braces
			{ pattern: /\{[^}]*$/gm, message: 'Unclosed brace in JavaScript' },
			// Invalid import/export
			{ pattern: /import\s+.*[^;]$/gm, message: 'Missing semicolon in import statement' },
			{ pattern: /export\s+.*[^;]$/gm, message: 'Missing semicolon in export statement' }
		];

		for (const error of jsErrors) {
			const matches = content.match(error.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: `${error.message} (${context})`,
					type: 'javascript',
					line: this.getLineNumber(content, matches[0])
				});
			}
		}
	}

	validateCSSSyntax(content, filePath) {
		// CSS syntax validation
		const cssErrors = [
			// Missing closing braces
			{ pattern: /\{[^}]*$/gm, message: 'Unclosed brace in CSS' },
			// Invalid property syntax
			{ pattern: /^[^\/]*\w+\s*:\s*[^;]*$/gm, message: 'Missing semicolon in CSS property' },
			// Invalid selector syntax
			{ pattern: /[{}]/gm, message: 'Invalid CSS selector syntax' }
		];

		for (const error of cssErrors) {
			const matches = content.match(error.pattern);
			if (matches) {
				this.errors.push({
					file: filePath,
					message: `${error.message} (style)`,
					type: 'css',
					line: this.getLineNumber(content, matches[0])
				});
			}
		}
	}

	getLineNumber(content, match) {
		const lines = content.split('\n');
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].includes(match)) {
				return i + 1;
			}
		}
		return 0;
	}

	validateDirectory(dir) {
		const files = this.getAllFiles(dir);
		
		for (const file of files) {
			this.validateFile(file);
		}

		return this.generateReport();
	}

	getAllFiles(dir, fileList = []) {
		const files = readdirSync(dir);
		
		for (const file of files) {
			const filePath = join(dir, file);
			const stat = statSync(filePath);
			
			if (stat.isDirectory()) {
				this.getAllFiles(filePath, fileList);
			} else if (this.shouldTestFile(filePath)) {
				fileList.push(filePath);
			}
		}
		
		return fileList;
	}

	shouldTestFile(filePath) {
		return Object.values(TEST_PATTERNS).some(pattern => pattern.test(filePath));
	}

	generateReport() {
		const report = {
			summary: {
				total: this.passed + this.failed,
				passed: this.passed,
				failed: this.failed,
				errors: this.errors.length,
				warnings: this.warnings.length
			},
			errors: this.errors,
			warnings: this.warnings
		};

		return report;
	}
}

// Test runner
function runSyntaxTests() {
	console.log('🔍 Running syntax validation tests...\n');
	
	const validator = new SyntaxValidator();
	const report = validator.validateDirectory(SRC_DIR);
	
	// Output results
	console.log(`📊 Test Results:`);
	console.log(`   Total files: ${report.summary.total}`);
	console.log(`   ✅ Passed: ${report.summary.passed}`);
	console.log(`   ❌ Failed: ${report.summary.failed}`);
	console.log(`   🚨 Errors: ${report.summary.errors}`);
	console.log(`   ⚠️  Warnings: ${report.summary.warnings}\n`);
	
	if (report.errors.length > 0) {
		console.log('🚨 Syntax Errors Found:');
		report.errors.forEach((error, index) => {
			console.log(`   ${index + 1}. ${error.file}:${error.line || '?'} - ${error.message}`);
		});
		console.log('');
	}
	
	if (report.warnings.length > 0) {
		console.log('⚠️  Warnings:');
		report.warnings.forEach((warning, index) => {
			console.log(`   ${index + 1}. ${warning.file}:${warning.line || '?'} - ${warning.message}`);
		});
		console.log('');
	}
	
	// Exit with error code if syntax errors found
	if (report.summary.errors > 0) {
		console.log('❌ Syntax validation failed! Please fix errors before compiling.');
		process.exit(1);
	} else {
		console.log('✅ All syntax validation tests passed!');
	}
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	runSyntaxTests();
}

export { SyntaxValidator, runSyntaxTests };
