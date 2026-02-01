<script>
	let selectedCategory = 'core';
	let searchTerm = '';

	const categories = [
		{ id: 'core', label: 'Core Mechanics', icon: 'precision_manufacturing' },
		{ id: 'anti-cheat', label: 'Anti-Cheats', icon: 'shield' },
		{ id: 'world-gen', label: 'World Generation', icon: 'public' },
		{ id: 'custom-ui', label: 'Custom UI', icon: 'dashboard_customize' },
		{ id: 'api-tools', label: 'API Tools', icon: 'api' }
	];

	const features = [
		{
			title: 'High Performance',
			description: '0.02ms average hook execution. Heavily optimized for high-player count servers (250+ concurrent).',
			icon: 'speed'
		},
		{
			title: 'Cross-Platform',
			description: 'Compatible with Spigot, Paper, Pufferfish, and Folia. Modular API for multi-version support (1.8 - 1.20+).',
			icon: 'layers'
		},
		{
			title: 'Custom NMS Logic',
			description: 'Advanced packet manipulation and entity tracking for mechanics impossible with standard Bukkit API.',
			icon: 'data_object'
		}
	];

	const deliverables = [
		{
			title: 'Fully Configurable YAML/JSON',
			description: 'Allow server admins to tweak every single variable without a restart.',
			icon: 'terminal'
		},
		{
			title: 'Redis & SQL Integration',
			description: 'Lightning fast data synchronization across proxy networks.',
			icon: 'database'
		},
		{
			title: 'Built-in Telemetry',
			description: 'Monitor plugin health and performance via integrated Prometheus hooks.',
			icon: 'monitoring'
		}
	];

	const stats = [
		{ label: 'Paper Optimization', value: 100 },
		{ label: 'Async Logic', value: 94 }
	];

	function selectCategory(categoryId) {
		selectedCategory = categoryId;
	}
</script>

<svelte:head>
	<title>Custom Coding & Plugins Showcase | MC Portfolio</title>
	<meta name="description" content="High-performance Spigot, Paper, and Velocity development using NMS and custom packet handling for seamless gameplay mechanics." />
</svelte:head>

<!-- Top Navigation -->
	<header class="sticky top-0 z-50 w-full border-b border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
		<div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
			<div class="flex items-center gap-8">
				<div class="flex items-center gap-2 cursor-pointer" onclick={() => window.location.href = '/'}>
					<span class="material-symbols-outlined text-primary text-3xl">terminal</span>
					<h2 class="text-xl font-bold tracking-tight">Lithiumteck</h2>
				</div>
				<nav class="hidden md:flex items-center gap-6">
					<a class="text-sm font-medium hover:text-primary transition-colors" href="/portfolio">Portfolio</a>
					<a class="text-sm font-medium text-primary" href="/plugins">Services</a>
					<a class="text-sm font-medium hover:text-primary transition-colors" href="/plugins">Plugins</a>
					<a class="text-sm font-medium hover:text-primary transition-colors" href="#contact">Contact</a>
				</nav>
			</div>
			<div class="flex items-center gap-4">
				<div class="relative hidden sm:block">
					<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">search</span>
					<input
						class="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-48 lg:w-64"
						placeholder="Search components..."
						type="text"
						bind:value={searchTerm}
					/>
				</div>
				<button class="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2">
					<span class="material-symbols-outlined text-[18px]">mail</span>
					Hire Me
				</button>
			</div>
		</div>
	</header>

	<main class="max-w-[1400px] mx-auto px-6 py-8">
		<!-- Breadcrumbs -->
		<div class="flex items-center gap-2 mb-6 text-sm">
			<a class="text-primary/70 hover:text-primary transition-colors" href="/portfolio">Portfolio</a>
			<span class="material-symbols-outlined text-xs text-white/20">chevron_right</span>
			<span class="text-white">Custom Coding & Plugins</span>
		</div>

		<div class="flex flex-col lg:flex-row gap-8">
			<!-- Sidebar Navigation -->
			<aside class="w-full lg:w-64 flex flex-col gap-6">
				<div class="bg-white/5 border border-white/10 rounded-xl p-5">
					<h3 class="text-xs font-bold uppercase tracking-widest text-primary/60 mb-4">Plugin Categories</h3>
					<div class="space-y-1">
						{#each categories as category}
							<button
								class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:text-white hover:bg-white/5 {selectedCategory === category.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/60'}"
								onclick={() => selectCategory(category.id)}
							>
								<span class="material-symbols-outlined text-[20px]">{category.icon}</span>
								<span class="text-sm font-medium">{category.label}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="bg-primary/5 border border-primary/20 rounded-xl p-5">
					<p class="text-xs font-semibold text-primary mb-2 italic">Developer Stats</p>
					<div class="space-y-3">
						{#each stats as stat}
							<div class="flex justify-between items-center">
								<span class="text-xs text-white/60">{stat.label}</span>
								<span class="text-xs font-bold text-primary">{stat.value}%</span>
							</div>
							<div class="w-full bg-white/10 h-1 rounded-full overflow-hidden">
								<div class="bg-primary h-full" style:width="{stat.value}%"></div>
							</div>
						{/each}
					</div>
				</div>
			</aside>

			<!-- Main Content Area -->
			<div class="flex-1 space-y-8">
				<!-- Page Heading -->
				<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
					<div class="max-w-2xl">
						<h1 class="text-4xl lg:text-5xl font-black tracking-tight mb-3">Technical Showcase</h1>
						<p class="text-white/60 text-lg">High-performance Spigot, Paper, and Velocity development using NMS and custom packet handling for seamless gameplay mechanics.</p>
					</div>
					<button class="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg transition-all">
						<span class="material-symbols-outlined text-white">code</span>
						<span class="font-bold text-sm">View GitHub</span>
					</button>
				</div>

				<!-- Showcase Split Viewer -->
				<div class="grid grid-cols-1 xl:grid-cols-2 bg-terminal-bg border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
					<!-- Left: Video Demo -->
					<div class="relative group">
						<div class="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
							<span class="size-2 bg-red-500 rounded-full animate-pulse"></span>
							<span class="text-[10px] font-bold uppercase tracking-wider">Live Demo</span>
						</div>
						<div class="aspect-video bg-zinc-900 relative flex items-center justify-center overflow-hidden" style:background-image="url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoK8fjcsB3rzThWWgy6T1jYlJoXAUAXMuTFP0mQlvUatqPgqSlUmKIu416GoBYkwOfYzNYbd_RVos3G7S3kkOzBZD-HBtZxprCeqaK1-aQZbUCfN-2X6lVqTcQTOfhonf21XhulbmCNzuOrDFNbcPGJOaka2DGmcWj7EqNSlg1-M4e1hUBWg2xzIEvCrEA00ZO0IxQ6wiupnmuxz7xRR4u0ITxmOkLBPWmhxBJfxJHy_q8HAbBu03jGCGxLkXV6UCUz3qPxkXYMTk')" style:background-size="cover">
							<div class="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all pointer-events-none"></div>
							<button class="z-20 size-16 bg-primary text-background-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(19,236,19,0.4)]">
								<span class="material-symbols-outlined fill-current text-3xl">play_arrow</span>
							</button>
							<!-- Video Controls -->
							<div class="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
								<div class="flex items-center gap-4">
									<div class="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
										<div class="w-1/3 h-full bg-primary"></div>
									</div>
									<span class="text-[10px] font-mono">01:42 / 04:15</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Code Snippet -->
					<div class="flex flex-col border-l border-white/10 bg-[#0d1117] h-full">
						<div class="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
							<div class="flex items-center gap-4">
								<div class="flex items-center gap-1.5">
									<span class="size-3 rounded-full bg-red-500/50"></span>
									<span class="size-3 rounded-full bg-yellow-500/50"></span>
									<span class="size-3 rounded-full bg-green-500/50"></span>
								</div>
								<span class="text-xs font-mono text-white/40">AbilityListener.java</span>
							</div>
							<button class="text-white/40 hover:text-primary transition-colors">
								<span class="material-symbols-outlined text-[18px]">content_copy</span>
							</button>
						</div>
						<div class="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
							<pre class="whitespace-pre"><span class="code-syntax-keyword">@EventHandler</span>
<span class="code-syntax-keyword">public void</span> <span class="code-syntax-function">onAbilityUse</span>(PlayerInteractEvent e) &#123;
    Player player = e.<span class="code-syntax-function">getPlayer</span>();

    <span class="code-syntax-comment">&#47;&#47; Check for custom NBT tag</span>
    ItemStack item = player.<span class="code-syntax-function">getInventory</span>().<span class="code-syntax-function">getItemInMainHand</span>();
    <span class="code-syntax-keyword">if</span> (!NBT.<span class="code-syntax-function">hasTag</span>(item, <span class="code-syntax-string">&quot;ability_id&quot;</span>)) <span class="code-syntax-keyword">return</span>;

    <span class="code-syntax-comment">&#47;&#47; Execute logic asynchronously to maintain 20 TPS</span>
    Bukkit.<span class="code-syntax-function">getScheduler</span>().<span class="code-syntax-function">runTaskAsynchronously</span>(plugin, () -&gt; &#123;
        AbilityResult result = <span class="code-syntax-class">LogicHandler</span>.<span class="code-syntax-function">compute</span>(player);

        <span class="code-syntax-keyword">if</span> (result.<span class="code-syntax-function">isSuccess</span>()) &#123;
            <span class="code-syntax-class">PacketManager</span>.<span class="code-syntax-function">sendVibration</span>(player, result.<span class="code-syntax-function">getLoc</span>());
            player.<span class="code-syntax-function">sendMessage</span>(<span class="code-syntax-string">&quot;Ability activated!&quot;</span>);
        &#125;
    &#125;);
&#125;</pre>
						</div>
					</div>
				</div>

				<!-- Features and Metrics -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{#each features as feature}
						<div class="bg-white/5 border border-white/10 p-6 rounded-xl group hover:border-primary/50 transition-all">
							<div class="size-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<span class="material-symbols-outlined text-primary">{feature.icon}</span>
							</div>
							<h4 class="font-bold text-lg mb-2">{feature.title}</h4>
							<p class="text-sm text-white/60">{feature.description}</p>
						</div>
					{/each}
				</div>

				<!-- Bottom Section: Detailed List & CTA -->
				<div class="bg-primary/10 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-12">
					<div class="flex-1 space-y-6">
						<h3 class="text-2xl font-bold">Key Project Deliverables</h3>
						<ul class="space-y-4">
							{#each deliverables as deliverable}
								<li class="flex items-start gap-4">
									<div class="bg-white/10 p-1.5 rounded-lg border border-white/10">
										<span class="material-symbols-outlined text-primary text-[24px]">{deliverable.icon}</span>
									</div>
									<div>
										<p class="font-bold">{deliverable.title}</p>
										<p class="text-sm text-white/60">{deliverable.description}</p>
									</div>
								</li>
							{/each}
						</ul>
					</div>
					<div class="w-full md:w-80 flex flex-col gap-4">
						<div class="bg-background-dark/50 p-6 rounded-xl border border-white/10 text-center">
							<p class="text-white/60 text-sm mb-4">Ready to elevate your server with custom logic?</p>
							<button class="w-full bg-primary text-background-dark py-4 rounded-xl font-black text-lg hover:shadow-[0_0_40px_rgba(19,236,19,0.3)] transition-all uppercase tracking-tight">
								Request Custom Build
							</button>
							<p class="mt-4 text-[10px] text-white/30 uppercase tracking-widest font-bold">Starting at $150 / Plugin</p>
						</div>
						<div class="flex items-center justify-center gap-6 opacity-40">
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-sm">verified_user</span>
								<span class="text-[10px] font-bold">SECURE</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-sm">bolt</span>
								<span class="text-[10px] font-bold">FAST</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-sm">published_with_changes</span>
								<span class="text-[10px] font-bold">FLEXIBLE</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<footer class="mt-20 border-t border-white/10 py-12 px-6">
		<div class="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
			<div class="flex items-center gap-2">
				<span class="material-symbols-outlined text-primary">terminal</span>
				<span class="font-bold">Lithiumteck © 2024</span>
			</div>
			<div class="flex gap-8">
				<a class="text-sm text-white/40 hover:text-white transition-colors" href="#">Discord</a>
				<a class="text-sm text-white/40 hover:text-white transition-colors" href="#">GitHub</a>
				<a class="text-sm text-white/40 hover:text-white transition-colors" href="#">SpigotMC</a>
				<a class="text-sm text-white/40 hover:text-white transition-colors" href="#">Terms</a>
			</div>
		</div>
	</footer>
