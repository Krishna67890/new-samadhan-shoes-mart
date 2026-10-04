const localProducts = [
  // MEN CATEGORY
  {
    _id: "m1",
    id: "m1",
    name: "AERO-GLIDE MESH RUNNER",
    brand: "Atelier Samadhan",
    price: 1899,
    images: [
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-2.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-2.jpg"
    ],
    sizes: [7, 8, 9, 10],
    rating: 4.8,
    category: "Men",
    targetGender: "Men",
    description: "Ultra-breathable grey mesh runner engineered for the modern urban athlete. Features adaptive cushioning for high-impact performance."
  },
  {
    _id: "m2",
    id: "m2",
    name: "OBSIDIAN HERITAGE DERBY",
    brand: "Atelier Samadhan",
    price: 1500,
    images: [
      "/New-Samadhan-Shoe-Mart/Shoes-Black-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-Back-men-4.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-Back-men-4.jpg"
    ],
    sizes: [6, 7, 8, 9, 10],
    rating: 4.9,
    category: "Formal",
    targetGender: "Men",
    description: "Classic obsidian black leather derby. Hand-polished to a mirror finish, representing the pinnacle of corporate elegance."
  },
  {
    _id: "m3",
    id: "m3",
    name: "ZENITH COMFORT SLIPPERS",
    brand: "Atelier Samadhan",
    price: 1299,
    images: [
      "/New-Samadhan-Shoe-Mart/Slippers-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Slippers-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Slippers-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Slippers-men-1.jpg"
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.6,
    category: "Men",
    targetGender: "Men",
    description: "Minimalist ergonomic slides designed for post-performance recovery and premium lounge comfort."
  },

  // WOMEN CATEGORY
  {
    _id: "w1",
    id: "w1",
    name: "VALENCIA LUXE SANDALS",
    brand: "Atelier Samadhan",
    price: 1999,
    images: [
      "/New-Samadhan-Shoe-Mart/Sandles-women-front-1.jpg",
      "/New-Samadhan-Shoe-Mart/Sandles-women-front-1.jpg",
      "/New-Samadhan-Shoe-Mart/Sandles-women-front-1.jpg",
      "/New-Samadhan-Shoe-Mart/Sandles-women-front-1.jpg"
    ],
    sizes: [5, 6, 7, 8],
    rating: 4.9,
    category: "Women",
    targetGender: "Women",
    description: "Architectural open-toe sandals featuring a sculpted silhouette and memory-foam footbed for all-day poise."
  },
  {
    _id: "w2",
    id: "w2",
    name: "AURORA ETHNIC CHAPPAL",
    brand: "Atelier Samadhan",
    price: 1499,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg"
    ],
    sizes: [4, 5, 6, 7],
    rating: 4.7,
    category: "Women",
    targetGender: "Women",
    description: "Handcrafted ethnic footwear with intricate gold-thread detailing, perfect for celebratory grand occasions."
  },
  {
    _id: "w3",
    id: "w3",
    name: "MODERNE LADIES FORMAL",
    brand: "Atelier Samadhan",
    price: 1200,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0013.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0013.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0013.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0013.jpg"
    ],
    sizes: [5, 6, 7, 8],
    rating: 4.8,
    category: "Women",
    targetGender: "Women",
    description: "Sleek, streamlined formal silhouette designed for the visionary woman in the professional landscape."
  },

  // KIDS CATEGORY
  {
    _id: "k1",
    id: "k1",
    name: "TITAN JUNIOR SNEAKERS",
    brand: "Samadhan Kids",
    price: 1299,
    images: [
      "/New-Samadhan-Shoe-Mart/Shoes-Front-kids-8.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Front-kids-8.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Front-kids-8.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Front-kids-8.jpg"
    ],
    sizes: [1, 2, 3, 4, 5],
    rating: 4.9,
    category: "Kids",
    targetGender: "Kids",
    description: "Vibrant, high-durability sneakers built for endless playground exploration with easy-lock velcro straps."
  },
  {
    _id: "k2",
    id: "k2",
    name: "SCHOLAR ELITE BLACK",
    brand: "Samadhan Kids",
    price: 1199,
    images: [
      "/New-Samadhan-Shoe-Mart/Shoes-kids-black-left-7.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-kids-black-left-7.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-kids-black-left-7.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-kids-black-left-7.jpg"
    ],
    sizes: [1, 2, 3, 4],
    rating: 4.8,
    category: "Kids",
    targetGender: "Kids",
    description: "Durable polished black uniform shoes, providing ergonomic support for growing feet throughout the school day."
  },
  {
    _id: "k3",
    id: "k3",
    name: "KINETIC PLAY RUNNERS",
    brand: "Samadhan Kids",
    price: 1499,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg"
    ],
    sizes: [2, 3, 4, 5, 6],
    rating: 4.7,
    category: "Kids",
    targetGender: "Kids",
    description: "Dynamic multi-terrain sports shoes for active kids, featuring high-traction soles and impact protection."
  },

  // SNEAKERS CATEGORY
  {
    _id: "s1",
    id: "s1",
    name: "ALPHA LEGACY SNEAKER",
    brand: "Atelier Samadhan",
    price: 1999,
    images: [
      "/New-Samadhan-Shoe-Mart/Main-Shoe.png",
      "/New-Samadhan-Shoe-Mart/Main-Shoe.png",
      "/New-Samadhan-Shoe-Mart/Main-Shoe.png",
      "/New-Samadhan-Shoe-Mart/Main-Shoe.png"
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    rating: 5.0,
    category: "Sneakers",
    targetGender: "Men",
    description: "The definitive flagship icon. A masterclass in street-style engineering, blending heritage aesthetics with future-tech soles."
  },
  {
    _id: "s2",
    id: "s2",
    name: "NOVA STREET LOW-TOP",
    brand: "Atelier Samadhan",
    price: 1799,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0014.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0014.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0014.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0014.jpg"
    ],
    sizes: [7, 8, 9, 10],
    rating: 4.8,
    category: "Sneakers",
    targetGender: "Men",
    description: "Minimalist low-profile sneakers for the discerning minimalist, crafted from premium sustainable materials."
  },
  {
    _id: "s3",
    id: "s3",
    name: "VOLT PERFORMANCE MESH",
    brand: "Atelier Samadhan",
    price: 1100,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg"
    ],
    sizes: [6, 7, 8, 9, 10],
    rating: 4.9,
    category: "Sneakers",
    targetGender: "Men",
    description: "High-octane performance sneaker optimized for maximum airflow and lateral stability during intense movement."
  },

  // FORMAL CATEGORY
  {
    _id: "f1",
    id: "f1",
    name: "IMPERIAL OXFORD ELITE",
    brand: "Atelier Samadhan",
    price: 2000,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg"
    ],
    sizes: [7, 8, 9, 10],
    rating: 5.0,
    category: "Formal",
    targetGender: "Men",
    description: "The pinnacle of formal craft. Hand-welted full-grain leather oxfords for those who lead with distinction."
  },
  {
    _id: "f2",
    id: "f2",
    name: "REGENCY LEATHER LOAFERS",
    brand: "Atelier Samadhan",
    price: 1999,
    images: [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0017.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0017.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0017.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0017.jpg"
    ],
    sizes: [6, 7, 8, 9, 10],
    rating: 4.8,
    category: "Formal",
    targetGender: "Men",
    description: "Versatile regency loafers that effortlessly transition from boardroom strategies to evening celebrations."
  }
];

export default localProducts;
