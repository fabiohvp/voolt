<script>
	import '../layout.css';
</script>

<main>
	<section title="Portfolio image">
		<img
			src="/images/home-left-image.png"
			alt="Multiple phones with open pages"
			height="920"
			width="840"
		/>
	</section>
	<section title="Business type">
		<img src="/images/logo.png" alt="Voolt logo" height="32" width="110" />

		<div id="business-form">
			<h1>What type of business is the website for?</h1>
			<slot />
		</div>
	</section>
</main>

<style>
	main {
		display: grid;
		font-family: 'Basier Circle', sans-serif;
		grid-template-columns: 50% 50%;
		margin: auto auto;
		width: 1680px;
		border: 1px solid gray;
	}

	section:last-child {
		padding: 35px 100px;
	}

	#business-form {
		position: relative;
		top: 163px;
	}

	h1 {
		font-size: 32px;
		line-height: 42px;
		width: 420px;
	}
</style>
