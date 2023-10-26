import type { Service } from './Service';

export type Industry = {
	id: number;
	aboutUsImages: SVGAnimatedString;
	headlines: string;
	heroImages: string;
	icon: string;
	image: string;
	isPopular: string;
	jsonData: unknown;
	mostCommonServices: number[];
	name: string;
	services: Service[];
	subHeadline: string;
	synonyms: string[];
	type: string;
	wpId: number;
};
