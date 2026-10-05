import localProducts from './localProducts';

/**
 * Merges products from backend, localStorage (demo), and local catalog.
 * Priority: Backend > Demo (localStorage) > Local Catalog
 */
export const getMergedProducts = (backendProducts = []) => {
  const demoProducts = JSON.parse(localStorage.getItem('ssm_demo_products') || '[]');

  // Start with a copy of local products or backend products if they exist
  let allProducts = [...localProducts];

  if (backendProducts && Array.isArray(backendProducts) && backendProducts.length > 0) {
    // If we have backend products, they might override local ones or be new
    backendProducts.forEach(bp => {
      const idx = allProducts.findIndex(p => p._id === bp._id || p.id === bp.id);
      if (idx !== -1) {
        allProducts[idx] = bp;
      } else {
        allProducts.push(bp);
      }
    });
  }

  // Merge Demo Products (Owner's local edits/additions)
  demoProducts.forEach(dp => {
    const idx = allProducts.findIndex(p => p._id === dp._id || p.id === dp.id);
    if (idx !== -1) {
      allProducts[idx] = dp;
    } else {
      // Add new demo products to the beginning
      allProducts.unshift(dp);
    }
  });

  return allProducts;
};

/**
 * Finds a single product by ID across all sources
 */
export const getProductById = async (id, requestFn) => {
  // 1. Try Backend
  if (requestFn) {
    try {
      const data = await requestFn(`/api/products/${id}`);
      if (data && (data._id || data.id)) return data;
    } catch (err) {
      console.warn("Backend fetch failed for product ID:", id);
    }
  }

  // 2. Try Demo Storage
  const demoProducts = JSON.parse(localStorage.getItem('ssm_demo_products') || '[]');
  const demoMatch = demoProducts.find(p => String(p._id) === String(id) || String(p.id) === String(id));
  if (demoMatch) return demoMatch;

  // 3. Try Local Catalog
  const localMatch = localProducts.find(p => String(p._id) === String(id) || String(p.id) === String(id));
  return localMatch;
};
