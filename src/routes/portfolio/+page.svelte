<script>
	let selectedFilter = 'all';

	const filters = [
		{ id: 'all', label: 'All Works' },
		{ id: 'spawn', label: 'Spawn' },
		{ id: 'survival', label: 'Survival Map' },
		{ id: 'lobby', label: 'Lobby' },
		{ id: 'cinematic', label: 'Cinematic' }
	];

	const projects = [
		{
			id: 1,
			title: 'Neo-Tokyo Megacity',
			category: 'cinematic',
			aspect: 'aspect-[4/5]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1-DepecQlA2YWhrKzmPlSkESxMrZ6JBlS82mFcef6IhKwlNRQnsu-Qqzy21cEY0uemCUs0GBJfTSgUCAtUaEcGsLQNLxO3kMTNNFd-IreSBGMOeIKmsGCBIaShdjvEgRiPmoa1pBJt7g3JBrb8MqD1V7Z__qFslMxVC2xYaDAM9LqLZsR2rMTRdy25Wzan5Gj8j2EDi2LEG4gYPIMK25zbIziBG_YP9Qp81qQz2Vml2WZGzfqXUV4NwujP5u7rSD2zTfdEY9E2nw'
		},
		{
			id: 2,
			title: "Dragon's Peak Hub",
			category: 'spawn',
			aspect: 'aspect-[1/1]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi79FJV5r2pW2D0Zi9JVnkSdhvF07zovnVBR1BQW-SatyfbS8hg6hVgnJW9PagBAZSDjHc-kcje123LEWcTIlyP7QEkhOiMqTsgxy_7qS41Y8Cc7ChrtR7rp3OjYsEdYRottfAuR0HBz7HWALV71sXW9GrW6znBaNtoejVlX8w_R3JqurdwjskeVrj8JO5RIbFs-tqzEFXa1CJIMu0s7d9o8qqoq8V2OBu8teIs730IGiPd-6SwrhZCKoynBLAxw9gA5KKO6fwP18'
		},
		{
			id: 3,
			title: 'Eden Isles Survival',
			category: 'survival',
			aspect: 'aspect-[4/3]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyest3d8c1JAlC6LCRBg9kxd2sMyZrCZbyEmCSYNeclKuqwqV6kPb_J-m5YX5-vB_pajCCJ9ZpHtr-KEJoxNEPNwwd79IaBqYFZTXHSdPXFzbkh_J_zyGExtM1Rl5KxOFgxBLG03ptixjwW8fpAAOGY53JZwNS78Wb73_y30sdDzf8lM3sxOsOJBt-HMBybaso615iC7NNM2GLIODN9ne_S1D7NU59-q0dyNTCjgi25mBAQZ0_nDZSYKq-gCKuD5roSajsHkeHeWo'
		},
		{
			id: 4,
			title: 'Interstellar Station',
			category: 'lobby',
			aspect: 'aspect-[16/9]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-DVHP2qrFmptjD-15wD6EJhpPKprcPaKSRd0sBtWhlwQBgHTsZHswpYPAJtFK1mTnuvKC5S77G38BbTpZkHolWeXIv5ysiKGMRxVyWOCCiZ22U4wIB3Vie8BdGk4ewDUT1JOmKpOLyX0RiJwjEmEoX0II0nL82OUH2hWNnuBCk51nYgW2gqsw6Wpog_TpmVf1wRAL3RZ0J-1-xRvbtEwl7z6aOwdCEp87AxDo3vIZCf1a3YvUZxotwBaBSSCRoQiJX4N8QfJZ7HY'
		},
		{
			id: 5,
			title: 'The Forgotten Temple',
			category: 'cinematic',
			aspect: 'aspect-[4/5]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSSCWGE-ubuUmGtMXsqkHfmXzd2T_atAd6WJ-Hmqh2crhlMLrsM_Ds9ftwMHJxUd4F2mjg78nXDrFubBMQAGGnr470D4UW9tY95XwT5Tee_H5LB5Y_oKXKF7g1uIk3uEjoPzN6mVZtZGUZ0J2DrxFQB6EHzXkOljFIgEL7SewTgQaxe5pslr26RH1M0vBKfvkjVDZA0pKGFvPhFT9UJ_OswwOYv-dn_b5hvORvvqrRqGU33iCagAExN5Yg7CXOYbWTbfYrv8AO0zo'
		},
		{
			id: 6,
			title: 'Cloudhaven Steampunk',
			category: 'spawn',
			aspect: 'aspect-[1/1]',
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTKvVWyokuw7gZq9iJi-JAYTRytFeiq94g1V2LdHvNu2hmNGVEHEXUk8r-T2u6e9ZwWCjsimaHREb5FORBbApe7yX_KDVtV9MysEVUrFUZgCQW_ZG1yRxTGSeqoTxOcNoJ7RxJLdFrWxYVbVSY-ZRchASnDgdbNn1t9U35pAk-uFuYdP7Rz284isqXpPIA3HutrGy1w9I1Tv6Th9uX8zgQfr0NFp_3oAJtMa1SLz44VKpJLzO-jdfgkfLtFuKu1vbSRo3EshJ2d4M'
		}
	];

	$: filteredProjects = selectedFilter === 'all'
		? projects
		: projects.filter(project => project.category === selectedFilter);

	function selectFilter(filterId) {
		selectedFilter = filterId;
	}
</script>

<svelte:head>
	<title>World Building Portfolio Gallery | ProBuild Studio</title>
	<meta name="description" content="Explore our collection of high-fidelity Minecraft environments, featuring cinematic lighting, custom terrain, and intricate architecture designed for premium servers and cinematic projects." />
</svelte:head>

<!-- Top Navigation Bar -->
	<header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
		<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
			<div class="flex items-center gap-3 cursor-pointer" onclick={() => window.location.href = '/'}>
				<div class="bg-primary p-1.5 rounded-lg">
					<span class="material-symbols-outlined text-background-dark font-bold block">architecture</span>
				</div>
				<h1 class="text-xl font-bold tracking-tight">Lithiumteck</h1>
			</div>
			<nav class="hidden md:flex items-center gap-10">
				<a class="text-sm font-semibold hover:text-primary transition-colors border-b-2 border-primary" href="/portfolio">World Building</a>
				<a class="text-sm font-semibold hover:text-primary transition-colors border-b-2 border-transparent" href="/plugins">Coding</a>
				<a class="text-sm font-semibold hover:text-primary transition-colors border-b-2 border-transparent" href="/design">Design</a>
				<a class="text-sm font-semibold hover:text-primary transition-colors border-b-2 border-transparent" href="/about">About</a>
			</nav>
			<div class="flex items-center gap-4">
				<button class="hidden sm:flex items-center justify-center bg-primary text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all">
					Get a Quote
				</button>
				<button class="md:hidden text-white">
					<span class="material-symbols-outlined">menu</span>
				</button>
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-6 py-12">
		<!-- Page Heading -->
		<div class="mb-12">
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div class="max-w-2xl">
					<h2 class="text-5xl font-black tracking-tight mb-4">World Building <span class="text-primary">Portfolio</span></h2>
					<p class="text-lg text-slate-400 leading-relaxed">
						Explore our collection of high-fidelity Minecraft environments, featuring cinematic lighting, custom terrain, and intricate architecture designed for premium servers and cinematic projects.
					</p>
				</div>
				<div class="flex gap-2 text-slate-400 text-sm">
					<span class="flex items-center gap-1">
						<span class="material-symbols-outlined text-primary text-base">check_circle</span>
						150+ Projects
					</span>
					<span class="flex items-center gap-1 ml-4">
						<span class="material-symbols-outlined text-primary text-base">check_circle</span>
						4k Render Ready
					</span>
				</div>
			</div>
		</div>

		<!-- Filter Bar -->
		<div class="flex flex-wrap gap-3 mb-10 pb-4 border-b border-white/5">
			{#each filters as filter}
			<button
				class="px-6 py-2 rounded-full font-medium text-sm transition-all border hover:scale-105 {selectedFilter === filter.id ? 'bg-primary text-background-dark' : 'bg-white/5 text-white border-white/10'}"
				onclick={() => selectFilter(filter.id)}
			>
					{filter.label}
				</button>
			{/each}
		</div>

		<!-- Masonry Grid Gallery -->
		<div class="masonry-grid">
			{#each filteredProjects as project (project.id)}
				<div class="masonry-item group relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
					<div class="{project.aspect} w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style:background-image="url('{project.image}')">
					</div>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
						<span class="text-primary text-xs font-bold uppercase tracking-widest mb-2">{project.category}</span>
						<h3 class="text-xl font-bold mb-4">{project.title}</h3>
						<button class="w-full py-3 bg-primary text-background-dark font-bold rounded-lg flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
							View Details <span class="material-symbols-outlined text-sm">arrow_forward</span>
						</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Section -->
		<section class="mt-24 py-16 px-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 relative overflow-hidden">
			<div class="relative z-10 flex flex-col items-center text-center">
				<h3 class="text-4xl font-black mb-4">Have a project in mind?</h3>
				<p class="text-lg text-slate-300 mb-10 max-w-xl">
					Whether it's a small spawn point or a massive 10k x 10k custom world, we have the tools and talent to bring it to life.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<button class="bg-primary text-background-dark px-10 py-4 rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(19,236,19,0.4)] transition-all">
						Start Your Commission
					</button>
					<button class="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-white/20 transition-all">
						Join our Discord
					</button>
				</div>
			</div>
			<!-- Background element -->
			<div class="absolute -right-20 -bottom-20 size-96 bg-primary/10 blur-[100px] rounded-full"></div>
			<div class="absolute -left-20 -top-20 size-96 bg-primary/5 blur-[80px] rounded-full"></div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="bg-black/40 border-t border-white/5 py-12">
		<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
			<div class="flex flex-col items-center md:items-start gap-4">
				<div class="flex items-center gap-3">
					<div class="bg-primary/20 p-1 rounded">
						<span class="material-symbols-outlined text-primary text-sm font-bold block">architecture</span>
					</div>
					<span class="text-lg font-bold">Lithiumteck</span>
				</div>
				<p class="text-slate-500 text-sm">© 2024 Lithiumteck. Not an official Minecraft product.</p>
			</div>
			<div class="flex gap-8">
				<a class="text-slate-400 hover:text-primary transition-colors" href="#">Twitter</a>
				<a class="text-slate-400 hover:text-primary transition-colors" href="#">ArtStation</a>
				<a class="text-slate-400 hover:text-primary transition-colors" href="#">Behance</a>
				<a class="text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
			</div>
		</div>
	</footer>
