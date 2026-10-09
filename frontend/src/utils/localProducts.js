const localProducts = [
  {
    "_id": "m1",
    "id": "m1",
    "name": "Samadhan Vayu Aero Mesh Runner",
    "brand": "Atelier Samadhan",
    "price": 1499,
    "images": [
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-grey-men-2.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0007.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.8,
    "category": "Men",
    "collection": "New Arrivals",
    "targetGender": "Men",
    "concerns": [
      "Flat Feet",
      "Heel Comfort"
    ],
    "professions": [
      "Hospitality",
      "Medical / Healthcare"
    ],
    "purpose": [
      "Running",
      "Sports",
      "Daily Wear"
    ],
    "isNew": true,
    "description": "Ultra-breathable grey mesh runner crafted for active urban lifestyle with responsive adaptive cushioning and lightweight support."
  },
  {
    "_id": "m2",
    "id": "m2",
    "name": "Samadhan Deccan Obsidian Heritage Derby",
    "brand": "Atelier Samadhan",
    "price": 1899,
    "images": [
      "/New-Samadhan-Shoe-Mart/Shoes-Black-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-Back-men-4.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-left-men-2.jpg",
      "/New-Samadhan-Shoe-Mart/Shoes-Black-men-right-3.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Formal",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "concerns": [
      "Heel Comfort"
    ],
    "professions": [
      "Corporate"
    ],
    "purpose": [
      "Office",
      "Party"
    ],
    "description": "Classic handcrafted black leather derby with a hand-burnished mirror finish. Pure elegance for executive meetings and celebrations."
  },
  {
    "_id": "m3",
    "id": "m3",
    "name": "Samadhan Aram Ergonomic Recovery Slide",
    "brand": "Atelier Samadhan",
    "price": 1149,
    "images": [
      "/New-Samadhan-Shoe-Mart/Slippers-men-1.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0010.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0012.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.6,
    "category": "Men",
    "targetGender": "Men",
    "concerns": [
      "Plantar Fasciitis",
      "Heel Comfort"
    ],
    "professions": [
      "Hospitality"
    ],
    "purpose": [
      "Daily Wear",
      "Travel"
    ],
    "description": "Ergonomically contoured comfort slides engineered for post-work foot relaxation and seamless all-day home wear."
  },
  {
    "_id": "m4",
    "id": "m4",
    "name": "Samadhan Agni Dynamic Sport Runner",
    "brand": "Atelier Samadhan",
    "price": 1799,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0030.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0031.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0032.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0033.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Men",
    "collection": "New Arrivals",
    "targetGender": "Men",
    "isNew": true,
    "purpose": [
      "Running",
      "Sports"
    ],
    "description": "High-performance athletic trainer featuring dual-density shock-absorbing outsole for road workouts and gym sessions."
  },
  {
    "_id": "m5",
    "id": "m5",
    "name": "Samadhan Sahyadri Rugged Trekking Shoe",
    "brand": "Atelier Samadhan",
    "price": 2299,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0080.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0081.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0082.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0083.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.9,
    "category": "Men",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Outdoor",
      "Trekking"
    ],
    "description": "All-terrain adventure footwear equipped with deep lug rubber sole and reinforced toe shield for tough trails."
  },
  {
    "_id": "m6",
    "id": "m6",
    "name": "Samadhan Rajwada Royal Brogue Oxford",
    "brand": "Atelier Samadhan",
    "price": 2799,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0050.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0051.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0052.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0053.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 5,
    "category": "Formal",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Office",
      "Party"
    ],
    "description": "Artisanal hand-perforated full-grain leather brogue with Goodyear-welt aesthetic for prestigious functions."
  },
  {
    "_id": "m7",
    "id": "m7",
    "name": "Samadhan Vajra Steel-Toe Safety Boot",
    "brand": "Atelier Samadhan",
    "price": 2199,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0120.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0121.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0122.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0123.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.8,
    "category": "Men",
    "targetGender": "Men",
    "professions": [
      "Industrial / Factory",
      "Police / Security"
    ],
    "purpose": [
      "Work",
      "Safety"
    ],
    "description": "Certified heavy-duty protective work boot built with oil-resistant non-slip compound and steel impact resistance."
  },
  {
    "_id": "m8",
    "id": "m8",
    "name": "Samadhan Veer Combat Tactical Boot",
    "brand": "Atelier Samadhan",
    "price": 1999,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0140.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0141.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0142.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0143.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Men",
    "targetGender": "Men",
    "professions": [
      "Police / Security"
    ],
    "purpose": [
      "Work",
      "Outdoor"
    ],
    "description": "High-ankle security combat boot designed with quick-lacing hardware and reinforced padded heel stability."
  },
  {
    "_id": "m9",
    "id": "m9",
    "name": "Samadhan Shaurya Desert Explorer Boot",
    "brand": "Atelier Samadhan",
    "price": 2499,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0160.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0161.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0162.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0163.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Men",
    "targetGender": "Men",
    "purpose": [
      "Outdoor",
      "Travel"
    ],
    "description": "Durable nubuck leather explorer boot with rugged side stitching and breathable interior moisture lining."
  },
  {
    "_id": "m10",
    "id": "m10",
    "name": "Samadhan Maharaj Kolhapuri Pure Leather Chappal",
    "brand": "Atelier Samadhan",
    "price": 1299,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0013.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0014.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0015.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Men",
    "collection": "Retro",
    "targetGender": "Men",
    "purpose": [
      "Ethnic",
      "Daily Wear"
    ],
    "description": "Authentic Kolhapuri style handcrafted leather chappal with traditional braided straps and natural vegetable tanning."
  },
  {
    "_id": "m11",
    "id": "m11",
    "name": "Samadhan Naman Tan Moccasin Loafer",
    "brand": "Atelier Samadhan",
    "price": 1649,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0017.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0018.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0019.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0020.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Men",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "Office"
    ],
    "description": "Buttery-soft tan moccasin loafer featuring hand-stitched toe seam and flexible rubber pebble sole for driving."
  },
  {
    "_id": "m12",
    "id": "m12",
    "name": "Samadhan Deccan Leather Strapped Comfort Sandal",
    "brand": "Atelier Samadhan",
    "price": 1499,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0230.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0231.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0232.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0233.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Men",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Daily Wear",
      "Ethnic",
      "Casual"
    ],
    "description": "Handcrafted genuine leather strap sandal with anatomically shaped footbed and non-slip rubber grip for all-day comfort and breathability."
  },
  {
    "_id": "w1",
    "id": "w1",
    "name": "Samadhan Mayura Luxe Ethnic Sandal",
    "brand": "Atelier Samadhan",
    "price": 1599,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0040.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0041.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0042.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0043.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7,
      8
    ],
    "rating": 4.8,
    "category": "Women",
    "collection": "New Arrivals",
    "targetGender": "Women",
    "purpose": [
      "Party",
      "Ethnic"
    ],
    "isNew": true,
    "description": "Artisanal festive women sandals with delicate golden threadwork embellishment and contoured cushioned base."
  },
  {
    "_id": "w2",
    "id": "w2",
    "name": "Samadhan Ananya Traditional Chappal",
    "brand": "Atelier Samadhan",
    "price": 1099,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0044.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0045.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0046.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0047.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7
    ],
    "rating": 4.6,
    "category": "Women",
    "targetGender": "Women",
    "purpose": [
      "Daily Wear",
      "Ethnic"
    ],
    "description": "Handmade ethnic flats designed for daily comfort, featuring smooth lining and anti-slip sole."
  },
  {
    "_id": "w3",
    "id": "w3",
    "name": "Samadhan Priyadarshini Formal Loafer",
    "brand": "Atelier Samadhan",
    "price": 1399,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0048.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0049.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0054.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0055.jpg"
    ],
    "sizes": [
      5,
      6,
      7,
      8
    ],
    "rating": 4.7,
    "category": "Women",
    "targetGender": "Women",
    "professions": [
      "Corporate",
      "Medical / Healthcare"
    ],
    "purpose": [
      "Office",
      "Daily Wear"
    ],
    "description": "Smart executive loafers for women with understated matte finish, cushioned insole, and easy slip-on fit."
  },
  {
    "_id": "w4",
    "id": "w4",
    "name": "Samadhan Chandra Festive Block Heels",
    "brand": "Atelier Samadhan",
    "price": 1899,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0056.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0057.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0058.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0059.jpg"
    ],
    "sizes": [
      5,
      6,
      7,
      8
    ],
    "rating": 4.9,
    "category": "Women",
    "collection": "Bestsellers",
    "targetGender": "Women",
    "purpose": [
      "Party",
      "Wedding"
    ],
    "description": "Chic block heel sandals providing sturdy height without fatigue, accented by subtle gold-toned buckle."
  },
  {
    "_id": "w5",
    "id": "w5",
    "name": "Samadhan Suvidha Daily Comfort Wedge",
    "brand": "Atelier Samadhan",
    "price": 1199,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0060.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0061.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0062.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0063.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7,
      8
    ],
    "rating": 4.5,
    "category": "Women",
    "targetGender": "Women",
    "concerns": [
      "Heel Comfort"
    ],
    "purpose": [
      "Daily Wear"
    ],
    "description": "Orthopedically tuned wedge slip-on with soft footbed engineered for teachers, healthcare workers, and home makers."
  },
  {
    "_id": "w6",
    "id": "w6",
    "name": "Samadhan Raat Rani Velvet Party Pumps",
    "brand": "Atelier Samadhan",
    "price": 2499,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0064.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0065.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0066.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0067.jpg"
    ],
    "sizes": [
      5,
      6,
      7,
      8
    ],
    "rating": 4.9,
    "category": "Women",
    "collection": "Limited Edition",
    "targetGender": "Women",
    "purpose": [
      "Party",
      "Reception"
    ],
    "description": "Lavish deep-toned party pumps with plush velvet texture and cushioned foot support for evening galas."
  },
  {
    "_id": "w7",
    "id": "w7",
    "name": "Samadhan Seva Orthopedic Nursing Clogs",
    "brand": "Atelier Samadhan",
    "price": 1249,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0068.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0069.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0070.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0071.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7
    ],
    "rating": 4.7,
    "category": "Women",
    "targetGender": "Women",
    "professions": [
      "Medical / Healthcare"
    ],
    "concerns": [
      "Flat Feet"
    ],
    "purpose": [
      "Work",
      "Daily Wear"
    ],
    "description": "Feather-light hospital-safe slip-ons with sanitizable upper and anatomical arch support for 12-hour duty."
  },
  {
    "_id": "w8",
    "id": "w8",
    "name": "Samadhan Noor Classic Party Stiletto",
    "brand": "Atelier Samadhan",
    "price": 2199,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0072.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0073.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0074.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0075.jpg"
    ],
    "sizes": [
      5,
      6,
      7,
      8
    ],
    "rating": 4.8,
    "category": "Women",
    "targetGender": "Women",
    "purpose": [
      "Party",
      "Celebration"
    ],
    "description": "Slender elegant stilettos with shock-dampening forefoot gel pad for unmatched runway glamour."
  },
  {
    "_id": "w9",
    "id": "w9",
    "name": "Samadhan Paramparik Rajasthani Handcrafted Jutti",
    "brand": "Atelier Samadhan",
    "price": 1349,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0076.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0077.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0078.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0079.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7
    ],
    "rating": 4.9,
    "category": "Women",
    "collection": "Retro",
    "targetGender": "Women",
    "purpose": [
      "Ethnic",
      "Wedding"
    ],
    "description": "Genuine leather ethnic Punjabi jutti decorated with intricate zardozi embroidery and double-stitched border."
  },
  {
    "_id": "s1",
    "id": "s1",
    "name": "Samadhan Tarun Alpha Legacy Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1999,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0090.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0091.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0092.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0093.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Sneakers",
    "collection": "New Arrivals",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "Sports"
    ],
    "isNew": true,
    "description": "Futuristic chunky street sneaker engineered with high-rebound midsole and breathable knit paneling."
  },
  {
    "_id": "s2",
    "id": "s2",
    "name": "Samadhan Galli Master Street Low-Top",
    "brand": "Atelier Samadhan",
    "price": 1699,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0094.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0095.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0096.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0097.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Sneakers",
    "collection": "Retro",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "Skate"
    ],
    "description": "Retro skate-inspired low-top sneaker featuring durable vulcanized gum sole and abrasion-resistant canvas."
  },
  {
    "_id": "s3",
    "id": "s3",
    "name": "Samadhan Raftaar Urban Pulse Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1599,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0098.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0099.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0100.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0101.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.6,
    "category": "Sneakers",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "Daily Wear"
    ],
    "description": "Sleek monochrome casual runner with memory foam sockliner for campus and weekend adventures."
  },
  {
    "_id": "s4",
    "id": "s4",
    "name": "Samadhan Vidyut Neon Strike Runner",
    "brand": "Atelier Samadhan",
    "price": 2099,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0102.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0103.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0104.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0105.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Sneakers",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Sports",
      "Running"
    ],
    "description": "Dynamic neon-accented athletic sneaker featuring high-impact heel air pocket and dynamic flex grooves."
  },
  {
    "_id": "s5",
    "id": "s5",
    "name": "Samadhan Tejas Velocity Pro Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1849,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0106.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0107.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0108.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0109.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.8,
    "category": "Sneakers",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Running",
      "Gym"
    ],
    "description": "Aerodynamic fitness shoe with seamless woven upper and ultra-grip textured compound."
  },
  {
    "_id": "s6",
    "id": "s6",
    "name": "Samadhan Shwet Classic White Canvas Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1150,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0110.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0111.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0112.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0113.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Sneakers",
    "collection": "Retro",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "College"
    ],
    "description": "Timeless crisp white canvas sneaker with clean lines, silver eyelets, and flexible vulcanized sole."
  },
  {
    "_id": "f1",
    "id": "f1",
    "name": "Samadhan Shahi Handcrafted Oxford Formal",
    "brand": "Atelier Samadhan",
    "price": 2599,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0130.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0131.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0132.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0133.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 5,
    "category": "Formal",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Office",
      "Wedding"
    ],
    "description": "Aristocratic closed-laced Oxford shoe constructed with hand-stained full grain calfskin."
  },
  {
    "_id": "f2",
    "id": "f2",
    "name": "Samadhan Mantri Double Strap Monk Shoe",
    "brand": "Atelier Samadhan",
    "price": 2299,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0134.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0135.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0136.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0137.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Formal",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Office",
      "Party"
    ],
    "description": "Distinctive double monk strap leather dress shoe adorned with antique brass buckles."
  },
  {
    "_id": "f3",
    "id": "f3",
    "name": "Samadhan Darbar Executive Gloss Derby",
    "brand": "Atelier Samadhan",
    "price": 2799,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0138.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0139.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0144.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0145.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Formal",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Wedding",
      "Formal Gala"
    ],
    "description": "High-gloss tuxedo dress shoe handcrafted for grand red-carpet galas and executive banquets."
  },
  {
    "_id": "k1",
    "id": "k1",
    "name": "Samadhan Chhota Ustad Junior Sport Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1099,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0150.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0151.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0152.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0153.jpg"
    ],
    "sizes": [
      1,
      2,
      3,
      4,
      5
    ],
    "rating": 4.7,
    "category": "Kids",
    "collection": "New Arrivals",
    "targetGender": "Kids",
    "purpose": [
      "Sports",
      "Play"
    ],
    "isNew": true,
    "description": "Colourful lightweight sneaker with easy velcro straps and shock-dampening soft sole for growing feet."
  },
  {
    "_id": "k2",
    "id": "k2",
    "name": "Samadhan Vidyarthi Elite School Leather Shoe",
    "brand": "Atelier Samadhan",
    "price": 1049,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0154.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0155.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0156.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0157.jpg"
    ],
    "sizes": [
      1,
      2,
      3,
      4,
      5
    ],
    "rating": 4.9,
    "category": "Kids",
    "collection": "Bestsellers",
    "targetGender": "Kids",
    "purpose": [
      "School",
      "Uniform"
    ],
    "description": "Heavy-duty polishable black school shoe built with scuff-resistant toe bumper and arch support."
  },
  {
    "_id": "k3",
    "id": "k3",
    "name": "Samadhan Bal Gopal Little Champ Runner",
    "brand": "Atelier Samadhan",
    "price": 1149,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0158.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0159.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0164.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0165.jpg"
    ],
    "sizes": [
      1,
      2,
      3,
      4
    ],
    "rating": 4.6,
    "category": "Kids",
    "targetGender": "Kids",
    "purpose": [
      "Running",
      "Daily Wear"
    ],
    "description": "Breathable active running shoe with responsive foam sole for energetic little explorers."
  },
  {
    "_id": "k4",
    "id": "k4",
    "name": "Samadhan Khel Veer Playground Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1199,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0166.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0167.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0168.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0169.jpg"
    ],
    "sizes": [
      2,
      3,
      4,
      5
    ],
    "rating": 4.8,
    "category": "Kids",
    "targetGender": "Kids",
    "purpose": [
      "Sports",
      "Playground"
    ],
    "description": "Durable anti-skid rubber sole shoe engineered for recess football and playground games."
  },
  {
    "_id": "k5",
    "id": "k5",
    "name": "Samadhan Gurukul Junior Formal Oxford",
    "brand": "Atelier Samadhan",
    "price": 1089,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0170.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0171.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0172.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0173.jpg"
    ],
    "sizes": [
      1,
      2,
      3,
      4,
      5
    ],
    "rating": 4.7,
    "category": "Kids",
    "targetGender": "Kids",
    "purpose": [
      "School",
      "Ceremony"
    ],
    "description": "Neat dress shoe for competitions, school assemblies, and traditional Indian family occasions."
  },
  {
    "_id": "k6",
    "id": "k6",
    "name": "Samadhan Nanhe Kadam Baby Walker Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1149,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0174.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0175.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0176.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0177.jpg"
    ],
    "sizes": [
      1,
      2,
      3
    ],
    "rating": 4.9,
    "category": "Kids",
    "targetGender": "Kids",
    "purpose": [
      "First Steps",
      "Toddler"
    ],
    "description": "Soft-soled toddler walker featuring flexible rubber non-slip tread and ultra-soft ankle padding."
  },
  {
    "_id": "mix1",
    "id": "mix1",
    "name": "Samadhan Khaki Rakshak Police Derby",
    "brand": "Atelier Samadhan",
    "price": 1799,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0180.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0181.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0182.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0183.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.9,
    "category": "Formal",
    "targetGender": "Men",
    "professions": [
      "Police / Security"
    ],
    "purpose": [
      "Duty",
      "Parade"
    ],
    "description": "High-shine regulation police uniform derby designed for long parade standing and disciplined comfort."
  },
  {
    "_id": "mix2",
    "id": "mix2",
    "name": "Samadhan Udyog Rakshak Industrial Safety Boot",
    "brand": "Atelier Samadhan",
    "price": 1999,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0184.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0185.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0186.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0187.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.8,
    "category": "Men",
    "targetGender": "Men",
    "professions": [
      "Industrial / Factory"
    ],
    "purpose": [
      "Work",
      "Safety"
    ],
    "description": "Heavy electrical hazard resistant safety boot with puncture-proof Kevlar midsole and steel toe."
  },
  {
    "_id": "mix3",
    "id": "mix3",
    "name": "Samadhan Royal Peshawari Open-Toe Sandal",
    "brand": "Atelier Samadhan",
    "price": 1799,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0234.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0235.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0236.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0237.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Men",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Ethnic",
      "Festival",
      "Wedding"
    ],
    "description": "Traditional Indian Peshawari style open-toe leather sandal crafted with supple hide, buckled heel strap, and soft cushioning."
  },
  {
    "_id": "mix4",
    "id": "mix4",
    "name": "Samadhan Royal Peshawari Open-Heel Leather Sandal",
    "brand": "Atelier Samadhan",
    "price": 1650,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0007.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0009.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Men",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Ethnic",
      "Traditional",
      "Daily Wear"
    ],
    "description": "Authentic handcrafted Indian Peshawari leather sandal with supple hide, padded arch support, and rugged traction sole."
  },
  {
    "_id": "mix5",
    "id": "mix5",
    "name": "Samadhan Karmachari Daily Work Slip-On",
    "brand": "Atelier Samadhan",
    "price": 1299,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0190.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0191.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0192.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0193.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Men",
    "targetGender": "Men",
    "purpose": [
      "Work",
      "Office"
    ],
    "description": "Quick-wear lightweight slip-on shoe with soft lining designed for all-day office comfort."
  },
  {
    "_id": "mix6",
    "id": "mix6",
    "name": "Samadhan Shringar Handcrafted Festive Mojari",
    "brand": "Atelier Samadhan",
    "price": 1199,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0194.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0195.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0196.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0197.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7
    ],
    "rating": 4.8,
    "category": "Women",
    "collection": "Retro",
    "targetGender": "Women",
    "purpose": [
      "Ethnic",
      "Festival"
    ],
    "description": "Festive handcrafted mojari adorned with mirror work and traditional silk embroidery."
  },
  {
    "_id": "mix7",
    "id": "mix7",
    "name": "Samadhan Yuva Street Casual Sneaker",
    "brand": "Atelier Samadhan",
    "price": 1349,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0198.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0199.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0200.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0201.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.7,
    "category": "Sneakers",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "College"
    ],
    "description": "Sporty youth lifestyle sneaker with modern two-tone design and high-traction rubber bottom."
  },
  {
    "_id": "mix8",
    "id": "mix8",
    "name": "Samadhan Shaan-E-Nashik Leather Brogue",
    "brand": "Atelier Samadhan",
    "price": 2450,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0202.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0203.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0204.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0205.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 4.9,
    "category": "Formal",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Office",
      "Celebration"
    ],
    "description": "Signature Nashik workshop brogue featuring rich cognac leather and precision decorative perforations."
  },
  {
    "_id": "mix9",
    "id": "mix9",
    "name": "Samadhan Godavari Heritage Leather Boot",
    "brand": "Atelier Samadhan",
    "price": 2699,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0206.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0207.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0208.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0209.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.9,
    "category": "Men",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Outdoor",
      "Winter"
    ],
    "description": "Ankle-height handcrafted genuine leather boot built with robust storm welt and durable lug sole."
  },
  {
    "_id": "mix10",
    "id": "mix10",
    "name": "Samadhan Shahi Nagra Embroidered Jutti",
    "brand": "Atelier Samadhan",
    "price": 1099,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0210.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0211.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0212.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0213.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Men",
    "collection": "Retro",
    "targetGender": "Men",
    "purpose": [
      "Ethnic",
      "Wedding"
    ],
    "description": "Traditional Indian groom and festival Nagra jutti handcrafted with genuine leather and zari work."
  },
  {
    "_id": "m13",
    "id": "m13",
    "name": "Samadhan Panchavati Classic Loafer",
    "brand": "Atelier Samadhan",
    "price": 1749,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0214.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0215.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0216.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0217.jpg"
    ],
    "sizes": [
      6,
      7,
      8,
      9,
      10
    ],
    "rating": 4.8,
    "category": "Men",
    "collection": "Bestsellers",
    "targetGender": "Men",
    "purpose": [
      "Casual",
      "Office"
    ],
    "description": "Refined penny loafer made with supple full-grain leather, cushioned heel cup, and anti-slip rubber insert."
  },
  {
    "_id": "w10",
    "id": "w10",
    "name": "Samadhan Meera Embellished Wedding Sandal",
    "brand": "Atelier Samadhan",
    "price": 2149,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0218.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0219.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0220.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0221.jpg"
    ],
    "sizes": [
      4,
      5,
      6,
      7,
      8
    ],
    "rating": 4.9,
    "category": "Women",
    "collection": "Limited Edition",
    "targetGender": "Women",
    "purpose": [
      "Wedding",
      "Party"
    ],
    "description": "Bridal and festive designer sandal embellished with stone accents, comfortable 2-inch block heel, and soft footbed."
  },
  {
    "_id": "s7",
    "id": "s7",
    "name": "Samadhan Dhaavak High-Speed Athletic Trainer",
    "brand": "Atelier Samadhan",
    "price": 1899,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0222.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0223.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0224.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0225.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10,
      11
    ],
    "rating": 4.8,
    "category": "Sneakers",
    "collection": "New Arrivals",
    "targetGender": "Men",
    "purpose": [
      "Running",
      "Sports"
    ],
    "isNew": true,
    "description": "Lightweight sprint sneaker with responsive air-channel cushioning and anti-torsion midfoot bridge."
  },
  {
    "_id": "f4",
    "id": "f4",
    "name": "Samadhan Peshwa Grandeur Cap-Toe Oxford",
    "brand": "Atelier Samadhan",
    "price": 2649,
    "images": [
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0226.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0227.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0228.jpg",
      "/New-Samadhan-Shoe-Mart/IMG-20260928-WA0229.jpg"
    ],
    "sizes": [
      7,
      8,
      9,
      10
    ],
    "rating": 5,
    "category": "Formal",
    "collection": "Limited Edition",
    "targetGender": "Men",
    "purpose": [
      "Office",
      "Wedding"
    ],
    "description": "Heritage cap-toe formal Oxford featuring hand-stitched welt, burnished toe box, and full leather lining."
  }
];

export default localProducts;
