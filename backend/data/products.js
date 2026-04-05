const brands = ['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance', 'Reebok', 'Converse', 'Yeezy', 'Balenciaga', 'Gucci'];
const models = ['Air Max', 'Ultra Boost', 'Retro High', 'RS-X', '990v5', 'Classic Leather', 'Chuck 70', 'Boost 350', 'Triple S', 'Ace Sneaker', 'Dunk Low', 'Forum Low', 'Club C', 'Sk8-Hi', 'Old Skool', 'Gazelle', 'Samba', 'Air Force 1', 'Zoom Freak', 'LeBron 21'];
const colors = ['Phantom White', 'Midnight Black', 'University Red', 'Royal Blue', 'Wolf Grey', 'Volt Green', 'Desert Sand', 'Triple Black', 'Hyper Violet', 'Solar Orange'];

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const price = Math.floor(Math.random() * (18000 - 3000 + 1) + 3000);
    const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
    const reviews = Math.floor(Math.random() * 500) + 50;

    products.push({
      name: `${brand} ${model} ${color}`,
      images: [
        `https://images.unsplash.com/photo-${1542291026 + i}-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
        `https://images.unsplash.com/photo-${1560769629 + i}-9b91b8696ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`
      ],
      description: `The ${brand} ${model} in ${color} represents the pinnacle of premium footwear engineering. Crafted for those who demand both style and performance, these grails offer unparalleled comfort and a head-turning silhouette.`,
      brand: brand,
      category: 'Sneakers',
      price: price,
      countInStock: Math.floor(Math.random() * 20),
      rating: parseFloat(rating),
      numReviews: reviews,
      sizes: [7, 8, 9, 10, 11]
    });
  }
  return products;
};

const products = generateProducts();

export default products;
