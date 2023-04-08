const products = [
	{
		_id: "1",
		name: "Airpods Wireless Bluetooth Headphones",
		image: "/images/airpods.jpg",
		description:
			"Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
		brand: "Apple",
		category: "Electronics",
		price: 489.99,
		countInStock: 10,
		rating: 4.5,
		numReviews: 12,
	},
	{
		_id: "2",
		name: "iPhone 11 Pro 256GB Memory",
		image: "/images/phone.jpg",
		description:
			"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
		brand: "Apple",
		category: "Electronics",
		price: 4599.99,
		countInStock: 7,
		rating: 4.0,
		numReviews: 8,
	},
	{
		_id: "3",
		name: "Cannon EOS 80D DSLR Camera",
		image: "/images/camera.jpg",
		description:
			"Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
		brand: "Cannon",
		category: "Electronics",
		price: 2929.99,
		countInStock: 5,
		rating: 3,
		numReviews: 17,
	},
	{
		_id: "4",
		name: "Sony Playstation 4 Pro White Version",
		image: "/images/playstation.jpg",
		description:
			"The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
		brand: "Sony",
		category: "Electronics",
		price: 2399.99,
		countInStock: 11,
		rating: 5,
		numReviews: 12,
	},
	{
		_id: "5",
		name: "Logitech G-Series Gaming Mouse",
		image: "/images/mouse.jpg",
		description:
			"Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
		brand: "Logitech",
		category: "Electronics",
		price: 349.99,
		countInStock: 7,
		rating: 3.5,
		numReviews: 10,
	},
	{
		_id: "6",
		name: "Amazon Echo Dot 3rd Generation",
		image: "/images/alexa.jpg",
		description:
			"Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
		brand: "Amazon",
		category: "Electronics",
		price: 229.99,
		countInStock: 0,
		rating: 4,
		numReviews: 3,
	},
	{
		_id: "7",
		name: "Mouse gaming Logitech G502 Hero 25K DPI, Negru",
		image: "/images/mouse_logitech.jpg",
		description: `11 butoane programabile
Utilizati software-ul Logitech Gaming pentru a programa comenzile si macrocomenzile dvs. preferate fiecaruia dintre cele 11 butoane. Salvati pana la 5 profiluri diferite direct pe mouse pentru a va lua setarile cu dvs. oriunde.`,
		brand: "Logitech",
		category: "Electronics",
		price: 529.99,
		countInStock: 5,
		rating: 4,
		numReviews: 12,
	},

	{
		_id: "8",
		name: "Procesor Intel® Core™ i7-13700K Raptor Lake ",
		image: "/images/i7.webp",
		description: `
    Arhitectura hibrida cu performante avansate
    3.4GHz, 5.4 GHz turbo, 30MB, Socket 1700
    Procesoarele Intel Core din a 13-a generatie avanseaza arhitectura hibrida de performanta cu pana la opt nuclee de performanta (P-core) si pana la 16 nuclee eficiente (E-core), combinate cu sarcini de lucru directionate inteligent de Intel® Thread Director.`,
		brand: "Intel",
		category: "Electronics",
		price: 5849.99,
		countInStock: 0,
		rating: 4,
		numReviews: 32,
	},

	{
		_id: "9",
		name: "Procesor Intel® Core™ i9-13900K Raptor Lake",
		image: "/images/i9.webp",
		description: `3.0GHz, 5.8 GHz turbo, 36MB, Socket 1700
    Conceput pentru jocuri moderne
    Construit pentru gamerii care cauta performanta maxima pentru a juca cele mai noi jocuri, avand in acelasi timp capacitatile necesare pentru a face fata altor sarcini de lucru. Noile PC-uri bazate pe procesoare Intel Core din a 13-a generatie fac toate acestea posibile.`,
		brand: "Intel",
		category: "Electronics",
		price: 11079.99,
		countInStock: 10,
		rating: 5,
		numReviews: 8,
	},

	{
		_id: "10",
		name: "Placa video ASUS Dual GeForce RTX™ 2060 EVO, 12GB GDDR6, 192-bit",
		image: "/images/rtx_2060.webp",
		description: `Placa video ASUS Dual GeForce RTX™ 2060 EVO, 12GB GDDR6, 192-bit
    2x Ventilatoare. 2x Distractie.
    Oferind cea mai recenta experienta de joc NVIDIA Turing™ in forma sa cea mai pura, ASUS Dual GeForce RTX™ 2060 EVO imbina performanta si simplitatea ca nimeni altul. Folosindu-se de tehnologiile avansate de racire derivate din placile grafice emblematice, Dual opteaza pentru substanta in detrimentul stilului, fiind alegerea perfecta pentru o constructie bine echilibrata. Puneti-va centura si implicati-va in probele de gaming de ultima generatie.`,
		brand: "Asus",
		category: "Electronics",
		price: 6529.99,
		countInStock: 60,
		rating: 4,
		numReviews: 12,
	},

	{
		_id: "11",
		name: "Placa video Gigabyte GeForce® RTX™ 3060 EAGLE OC 2.0 LHR, 12GB GDDR6, 192-bit",
		image: "/images/rtx_3060.webp",
		description: `Sistem de racire WINDFORCE 2X
    Sistemul de racire WINDFORCE 2X are ventilatoare de lama unice de 2X100mm, filare alternativa, 4 conducte de caldura din cupru compozite cu atingere directa GPU, ventilator activ 3D si racire screen, care impreuna asigura o disipare a caldurii de inalta eficienta.`,
		brand: "Gygabyte",
		category: "Electronics",
		price: 8549.99,
		countInStock: 10,
		rating: 4,
		numReviews: 6,
	},

	{
		_id: "12",
		name: "Tastatura gaming Logitech G213 RGB, Butoane multimedia",
		image: "/images/tastatura_logitech.webp",
		description: `
Tastele media dedicate permit comenzile play, pause si skip cat si reglarea volumului muzicii cu o simpla atingere a unui buton, fara sa mai fie nevoie iesirea din joc pentru acest lucru.`,
		brand: "Logitech",
		category: "Electronics",
		price: 449.99,
		countInStock: 10,
		rating: 5,
		numReviews: 3,
	},
];

module.exports=products
