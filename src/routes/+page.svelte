<script>
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Minecraft Portfolio Landing Page</title>
	<meta name="description" content="Premium world building, high-performance custom plugins, and immersive asset design for the next generation of Minecraft servers." />
</svelte:head>

<!-- Navigation -->
	<div class="fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#326732]">
		<div class="max-w-[1280px] mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
			<div class="flex items-center gap-3 cursor-pointer" onclick={() => goto('/')}>
				<div class="size-8 bg-primary rounded flex items-center justify-center text-background-dark">
					<span class="material-symbols-outlined font-bold">handyman</span>
				</div>
				<h2 class="text-xl font-bold tracking-tight dark:text-white">LITHIUMTECK</h2>
			</div>
			<div class="hidden md:flex items-center gap-10">
				<button class="text-sm font-medium hover:text-primary transition-colors" onclick={() => goto('/portfolio')}>Portfolio</button>
				<button class="text-sm font-medium hover:text-primary transition-colors" onclick={() => goto('#services')}>Services</button>
				<button class="text-sm font-medium hover:text-primary transition-colors" onclick={() => goto('/plugins')}>Code</button>
				<button class="text-sm font-medium hover:text-primary transition-colors" onclick={() => goto('#contact')}>Contact</button>
				<button class="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105">
					HIRE ME
				</button>
			</div>
		</div>
	</div>

	<!-- Hero Section -->
	<section class="relative pt-20 overflow-hidden">
		<div class="px-6 lg:px-20 py-20 lg:py-32 max-w-[1280px] mx-auto">
			<div class="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
				<div class="flex flex-col gap-8">
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
						<span class="relative flex h-2 w-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
						</span>
						<span class="text-xs font-bold text-primary tracking-widest uppercase">Available for Commissions</span>
					</div>
					<h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tighter dark:text-white">
						Architecting <br /><span class="text-primary italic">Virtual Worlds</span>
					</h1>
					<p class="text-lg text-slate-600 dark:text-[#92c992] max-w-lg">
						Premium world building, high-performance custom plugins, and immersive asset design for the next generation of Minecraft servers.
					</p>
					<div class="flex flex-wrap gap-4">
						<button onclick={() => goto('/portfolio')} class="px-8 py-4 bg-primary text-background-dark font-black rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
							VIEW PORTFOLIO <span class="material-symbols-outlined">trending_flat</span>
						</button>
						<button class="px-8 py-4 border-2 border-primary/30 text-primary font-black rounded-lg hover:bg-primary/5 transition-all">
							CONTACT ME
						</button>
					</div>
				</div>
				<div class="relative">
					<div class="aspect-square rounded-2xl overflow-hidden border-4 border-[#326732] shadow-2xl shadow-primary/20">
						<div class="w-full h-full bg-cover bg-center" style:background-image="linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmoPxMwVQF5cN_FIQU6-gtLt3JKlLzqk_pEPkjpx3T29F29ejQjaosKRkoZQd7GxeQNTJoOxGNIMmi-uGsMzemrfKu1yt5jjv_1M5v5UKQJf-rshOJWv7BKWJU6LXuVraAhkxZ1HZwYQPvNFIM8chXQH4vURkd1Hnlxym8PPV0X3Y0HqFe9lJL7Zwy2QaV6sdkJQIyFKfMwqnRaNTGehDynvKKITSWYedn8lxWBW-u1dSVG7VWsadnjXcvcxROlfjVWcEFCXk3a_4')"></div>
					</div>
					<!-- Level Up Floating Card -->
					<div class="absolute -bottom-6 -left-6 bg-background-dark border-2 border-primary p-4 rounded-xl shadow-xl hidden sm:block">
						<div class="flex items-center gap-4">
							<div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
								<span class="material-symbols-outlined">military_tech</span>
							</div>
							<div>
								<p class="text-xs uppercase tracking-widest text-primary font-bold">Experience</p>
								<p class="text-xl font-bold dark:text-white">Level 99 Creator</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- XP Bar Divider -->
	<div class="w-full h-4 bg-background-dark/50 flex overflow-hidden border-y border-[#326732]">
		<div class="h-full xp-bar-gradient w-[75%] relative">
			<div class="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
		</div>
	</div>

	<!-- Services Section -->
	<section class="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto" id="services">
		<div class="flex flex-col gap-4 mb-16">
			<h2 class="text-3xl lg:text-5xl font-black tracking-tight dark:text-white">Professional Services</h2>
			<div class="w-24 h-2 bg-primary rounded-full"></div>
		</div>
		<div class="grid md:grid-cols-3 gap-8">
			<!-- World Building -->
			<div class="group p-8 rounded-xl bg-background-light dark:bg-[#193319] border border-[#326732] hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
				<div class="size-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
					<span class="material-symbols-outlined text-3xl">foundation</span>
				</div>
				<h3 class="text-xl font-bold mb-3 dark:text-white">World Building</h3>
				<p class="text-slate-600 dark:text-[#92c992] leading-relaxed">
					Massive spawns, themed warps, and organic landscapes. Every block is placed with intent and cinematic precision.
				</p>
			</div>
			<!-- Custom Plugins -->
			<div class="group p-8 rounded-xl bg-background-light dark:bg-[#193319] border border-[#326732] hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
				<div class="size-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
					<span class="material-symbols-outlined text-3xl">terminal</span>
				</div>
				<h3 class="text-xl font-bold mb-3 dark:text-white">Custom Plugins</h3>
				<p class="text-slate-600 dark:text-[#92c992] leading-relaxed">
					Optimized Java solutions for Spigot, Paper, and Velocity. From custom minigames to complex database integrations.
				</p>
			</div>
			<!-- Asset Design -->
			<div class="group p-8 rounded-xl bg-background-light dark:bg-[#193319] border border-[#326732] hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
				<div class="size-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
					<span class="material-symbols-outlined text-3xl">view_in_ar</span>
				</div>
				<h3 class="text-xl font-bold mb-3 dark:text-white">Asset Design</h3>
				<p class="text-slate-600 dark:text-[#92c992] leading-relaxed">
					Custom 3D Blockbench models, textures, and custom GUI menus that redefine the vanilla experience.
				</p>
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section class="py-24 bg-background-light dark:bg-[#0a120a]" id="portfolio">
		<div class="max-w-[1280px] mx-auto px-6 lg:px-20">
			<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
				<div>
					<h2 class="text-3xl lg:text-5xl font-black tracking-tight dark:text-white">Featured Projects</h2>
					<p class="text-primary font-bold mt-2 uppercase tracking-[0.2em] text-sm italic">Showcasing elite builds & code</p>
				</div>
				<div class="flex gap-2">
					<button class="p-3 border border-[#326732] rounded-lg hover:bg-primary/10 transition-colors">
						<span class="material-symbols-outlined">arrow_back</span>
					</button>
					<button class="p-3 bg-primary text-background-dark rounded-lg hover:brightness-110 transition-all">
						<span class="material-symbols-outlined">arrow_forward</span>
					</button>
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Project 1 -->
				<div class="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style:background-image="url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNst5x9Bjw7bd4OOyxINHQl1ZWEvgGM0uqg3_NezsZdlw8vGhDE6t9GHmC9N732a4Bi1ZTxQkf61WCNQ32cbaKz2TBaYJddXftBkqyPVzIl-W3xXJiYXUgqAjW8FRHN3n78U9HUq6F80omekkZ9XQGPmL3DWGU4rbdUmljMOlq2LbA78dmuDNdmCptdk2DEr31EXV4uLFkE6Mx3816_DCqfm5hsLVqU4_HAKP3W3FyMhFaBJt7qaWPP6DWpjGopkKk437aX1AR5cM')"></div>
					<div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
					<div class="absolute bottom-0 p-6 flex flex-col gap-2">
						<span class="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-0.5 rounded w-fit">World Build</span>
						<h4 class="text-xl font-bold text-white">The Crystal Kingdom</h4>
					</div>
				</div>
				<!-- Project 2 -->
				<div class="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style:background-image="url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdsavqW_fJ3R2u8XaVJLB9-hnavWmCZecPLBk4SFGhUPS5je38e5_vtFbmUzqQFTR8LVeRvPoBXiCszC66sBz_t1AYHLVZ5FYUoLQsFVqlvQYXVkX3dImTOUPhuHrB4hnannTgen9ZVmAql0ZtAqChdgFWenWn7jf78Q3pTEuQTgk7D5BVGM-TU7uBwC2gAgsiWuc1D97Br-Lz0e3_UydFxaWHxvvB_FAakp8ktCsZBe_IGO74IErSNd-SyiHKd8NdfvxMA3tD3QI')"></div>
					<div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
					<div class="absolute bottom-0 p-6 flex flex-col gap-2">
						<span class="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-0.5 rounded w-fit">Development</span>
						<h4 class="text-xl font-bold text-white">Dynamic Quest Engine</h4>
					</div>
				</div>
				<!-- Project 3 -->
				<div class="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style:background-image="url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUkz4pOIlE4aa-LnBL0czNfAhHxSTrgf4HZBN-F16PHEfNbxZ0MdYW23Y4l8GIUFtz4LKxBVw2n6l7uyTROwj3wV76sCy2QodMsxNIMlDVmugB16k_63RpywpZZWX08gFhiRL7sy60OgHZ3l_ZJXJNxxF_8tPtRr2FiiHqBrfKhrrdnwm-W_NCRm4b63ACsEOfU6-aU6l_Z2VZi0etn-8dY4BhxlLqeNrN98UNnfq1BtQLGnRAU24_DMp0Vp6JzvFy6jKYjZwHWeY')"></div>
					<div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
					<div class="absolute bottom-0 p-6 flex flex-col gap-2">
						<span class="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-0.5 rounded w-fit">3D Modeling</span>
						<h4 class="text-xl font-bold text-white">Celestial Armory Pack</h4>
					</div>
				</div>
				<!-- Project 4 -->
				<div class="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer">
					<div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style:background-image="url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuW6KC7uK6qzNhr-DgV6hXmBjcdogtthtmxL50IqzI3JBWtpII78bNxiAf2EaVrIgDsGCPIdg90vYLhpd4sl2jBcoVyCwMFDsYJL_4H3laaMnqmXTTq-N22e6tS_iYRVBjazrzwNat6D1rSaq_tLt7j19ZhIiQoGgC2MJRflKSYNDfYm5fD_-iC5MPn3Y4yFgZtQ0X6Rl55jpDUJAenXQ55gL81Sv7KFGnVv2ZsqSkpphSIvBG9KCNZPl7XJbQbKaVS8RsKJXMDI0')"></div>
					<div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
					<div class="absolute bottom-0 p-6 flex flex-col gap-2">
						<span class="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-0.5 rounded w-fit">World Build</span>
						<h4 class="text-xl font-bold text-white">Neo-Tokyo Lobby</h4>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Code Preview Section -->
	<section class="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto" id="code">
		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<div class="order-2 lg:order-1">
				<div class="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#333]">
					<div class="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-[#333]">
						<div class="flex gap-1.5">
							<div class="size-3 rounded-full bg-red-500/80"></div>
							<div class="size-3 rounded-full bg-yellow-500/80"></div>
							<div class="size-3 rounded-full bg-green-500/80"></div>
						</div>
						<span class="text-xs text-slate-400 font-mono">CustomPlugin.java</span>
					</div>
					<div class="p-6 font-mono text-sm overflow-x-auto text-slate-300 leading-relaxed">
						<p><span class="text-purple-400">@EventHandler</span></p>
						<p><span class="text-blue-400">public void</span> <span class="text-yellow-300">onPlayerLevelUp</span>(PlayerLevelUpEvent event) &#123;</p>
						<p class="pl-4">Player player = event.getPlayer();</p>
						<p class="pl-4">Level level = event.getNewLevel();</p>
						<p class="pl-4"><span class="text-slate-500">&#47;&#47; Trigger epic level up effect</span></p>
						<p class="pl-4">EffectManager.play(EffectType.MEGA_LEVEL, player.getLocation());</p>
						<p class="pl-4">Economy.reward(player, <span class="text-orange-300">1000</span>);</p>
						<p class="pl-4">player.sendMessage(<span class="text-green-400">&quot;§a§lLEVEL UP! §7You reached level &quot;</span> + level);</p>
						<p>}</p>
					</div>
				</div>
			</div>
			<div class="order-1 lg:order-2 flex flex-col gap-6">
				<h2 class="text-4xl lg:text-5xl font-black tracking-tight dark:text-white">Clean, Optimized <span class="text-primary italic">Code.</span></h2>
				<p class="text-slate-600 dark:text-[#92c992] text-lg">
					I believe performance is as important as aesthetics. All plugins are built using modern async practices, ensuring zero-lag gameplay even with high player counts.
				</p>
				<ul class="flex flex-col gap-4">
					<li class="flex items-center gap-3 font-bold text-slate-700 dark:text-white">
						<span class="material-symbols-outlined text-primary">check_circle</span>
						Maven & Gradle Build Systems
					</li>
					<li class="flex items-center gap-3 font-bold text-slate-700 dark:text-white">
						<span class="material-symbols-outlined text-primary">check_circle</span>
						SQL, MongoDB & Redis Integration
					</li>
					<li class="flex items-center gap-3 font-bold text-slate-700 dark:text-white">
						<span class="material-symbols-outlined text-primary">check_circle</span>
						NMS & Packet Management
					</li>
				</ul>
				<div class="pt-4">
					<a href="/plugins" class="flex items-center gap-2 text-primary font-bold hover:underline">
						VIEW GITHUB REPOS <span class="material-symbols-outlined">launch</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto bg-primary/5 rounded-3xl mb-24 border-2 border-primary/10" id="contact">
		<div class="max-w-3xl mx-auto text-center flex flex-col gap-8">
			<h2 class="text-4xl lg:text-6xl font-black tracking-tight dark:text-white">Ready to Level Up Your <span class="text-primary">Server?</span></h2>
			<p class="text-slate-600 dark:text-[#92c992] text-xl">
				I am currently open for commissions and full-time server management opportunities. Let's build something legendary together.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a class="px-10 py-5 bg-primary text-background-dark font-black rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 text-lg" href="mailto:hello@example.com">
					<span class="material-symbols-outlined">mail</span> START A PROJECT
				</a>
				<button class="px-10 py-5 bg-[#5865F2] text-white font-black rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 text-lg" onclick={() => goto('#')}>
					<span class="material-symbols-outlined">forum</span> JOIN DISCORD
				</button>
			</div>
			<p class="text-sm text-slate-500 dark:text-slate-400 font-medium italic">Estimated response time: &lt; 24 hours</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-12 border-t border-[#326732] bg-background-light dark:bg-background-dark">
		<div class="max-w-[1280px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<div class="size-6 bg-primary rounded flex items-center justify-center text-background-dark">
						<span class="material-symbols-outlined text-sm font-bold">handyman</span>
					</div>
					<span class="font-bold tracking-tight dark:text-white">LITHIUMTECK</span>
				</div>
				<p class="text-xs text-slate-500">© 2024. All Minecraft rights reserved to Mojang AB.</p>
			</div>
			<div class="flex gap-8">
				<button class="text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">Twitter</button>
				<button class="text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">GitHub</button>
				<button class="text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">Behance</button>
			</div>
			<div class="text-right">
				<p class="text-xs font-bold text-slate-400">DESIGNED BY <span class="text-primary">LITHIUMTECK</span></p>
			</div>
		</div>
	</footer>
