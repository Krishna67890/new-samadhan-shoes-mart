const brands = ['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance', 'Samadhan Atelier', 'Reebok', 'Converse', 'Yeezy'];
const categories = ['Men', 'Women', 'Kids', 'Formal', 'Sneakers'];

const modelsByCategory = {
  Men: ['Air Max Elite', 'Retro High Leather', 'RS-X Runner', 'Tuscan Chelsea', 'Derby Brogue'],
  Women: ['Velvet Stiletto Heel', 'Quilted Ballet Flat', 'Ultraboost Pastel', 'Verona Ankle Boot', 'Suede Platform'],
  Kids: ['Air Force 1 Junior', 'Superstar Strap Kids', 'Nashik Academy School Derby', 'Speed Runner Flex', 'Courier Retro'],
  Formal: ['Monarch Derby', 'Imperial Oxford', 'Bespoke Brogue', 'Double Monk Strap', 'Penny Loafer'],
  Sneakers: ['Boost 350', 'Court Classic', 'Retro Mid 1', 'Volt Street Runner', 'Air Zoom Flight']
};

const colors = ['Phantom White', 'Midnight Black', 'University Red', 'Royal Blue', 'Caramel Tan', 'Burgundy Wine', 'Rose Gold', 'Triple Black'];

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 60; i++) {
    const category = categories[i % categories.length];
    const categoryModels = modelsByCategory[category];
    const model = categoryModels[Math.floor(Math.random() * categoryModels.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const price = category === 'Kids' ? Math.floor(Math.random() * (4500 - 1999 + 1) + 1999) : Math.floor(Math.random() * (18000 - 3499 + 1) + 3499);
    const rating = (Math.random() * (5 - 4.2) + 4.2).toFixed(1);
    const reviews = Math.floor(Math.random() * 400) + 30;

    const sizes = category === 'Kids' ? [1, 2, 3, 4, 5, 6] : (category === 'Women' ? [5, 6, 7, 8, 9] : [7, 8, 9, 10, 11]);

    // List of reliable local image numbers for various footwear options
    const imgNumbers = [
      '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015',
      '0016', '0017', '0018', '0019', '0020', '0021', '0022', '0023', '0024', '0025',
      '0026', '0027', '0028', '0029', '0030', '0040', '0045', '0050', '0060', '0070',
      '0080', '0090', '0100', '0110', '0120', '0130', '0140', '0150', '0160', '0170',
      '0180', '0190', '0200', '0210', '0220', '0230', '0240', '0250', '0260', '0270'
    ];
    const localImgName = `IMG-20260928-WA${imgNumbers[i % imgNumbers.length]}.jpg`;

    products.push({
      name: `${brand} ${model} ${color}`,
      images: [
        `/Shoes.png`,
        `/New-Samadhan-Shoe-Mart/${localImgName}`
      ],
      description: `Premium handcrafted footwear from New Samadhan Shoe Mart atelier. Designed with ergonomic perfection and certified durable soles for unmatched daily comfort.`,
      brand: brand,
      category: category,
      targetGender: category === 'Women' ? 'Women' : (category === 'Kids' ? 'Kids' : 'Men'),
      price: price,
      countInStock: Math.floor(Math.random() * 20) + 5,
      rating: parseFloat(rating),
      numReviews: reviews,
      sizes: sizes
    });
  }
  return products;
};

const products = generateProducts();

export default products;
