

export type Product = {
	dui: string;
	id: string;
	name: string;
	slug: string;
	price: number;
	discount: number;
	description: string;
	quantity:number;
	images: string[];
	category: string;
	productDetails:{
		detailsPriceAndButton :string;
		
	};	
	variations: variant[];
	
	
	
};


export type variant = {
	name: string;
	variant:variantDate;
};


export type variantDate = {
	name: string;
	dui:string;
	
};
