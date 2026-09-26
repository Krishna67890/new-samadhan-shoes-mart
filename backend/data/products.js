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

    products.push({
      name: `${brand} ${model} ${color}`,
      images: [
        `/Shoes.png`,
        `https://images.unsplash.com/photo-${1542291026 + i}-7eec264c27ff?auto=format&fit=crop&w=1000&q=80`
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
