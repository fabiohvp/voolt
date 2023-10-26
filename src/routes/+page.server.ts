import type { Industry } from '$lib/models/Industry';

export async function load() {
	const res = fetch('https://dev-api.voolt.com/api/cmsv2/industries');
	return {
		industries: res
			.then((r) => r.json())
			.then((d) => d.data.industries as Industry[])
			.catch(() => []) //I won't show any messages because I would have to implement a notification component but I need to sleep
	};
}
