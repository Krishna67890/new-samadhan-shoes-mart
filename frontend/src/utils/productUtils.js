import localProducts from './localProducts';

/**
 * Global Constants for Samadhan Shoes Elite Engine
 */
export const CATEGORIES = ['All', 'Men', 'Women', 'Sneakers', 'Formal', 'Kids'];
export const COLLECTIONS = ['All', 'New Arrivals', 'Limited Edition', 'Retro', 'Bestsellers'];
export const CONCERNS = ['All', 'Flat Feet', 'Plantar Fasciitis', 'Heel Comfort', 'Orthopedic Support', 'Diabetic Foot Care'];
export const PROFESSIONS = ['All', 'Police & Defense', 'Industrial Safety', 'Medical / Healthcare', 'Corporate', 'Hospitality'];
export const PURPOSES = ['All', 'Daily Wear', 'Office', 'Sports', 'Running', 'Party', 'College', 'Travel', 'School'];

/**
 * Storage Keys for owner updates, deletes and additions
 */
const STORAGE_CUSTOM_PRODUCTS = 'ssm_demo_products';
const STORAGE_DELETED_PRODUCTS = 'ssm_deleted_products';

/**
 * Merges products from backend, localStorage (owner custom/updates), and local catalog.
 * Also filters out deleted products.
 */
export const getMergedProducts = (backendProducts = []) => {
  let customProducts = [];
  let deletedIds = [];

  try {
    customProducts = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_PRODUCTS) || '[]');
    deletedIds = JSON.parse(localStorage.getItem(STORAGE_DELETED_PRODUCTS) || '[]');
  } catch (e) {
    console.error('Error reading local product storage', e);
  }

  // 1. Start with copy of localProducts
  let allProducts = [...localProducts];

  // 2. Merge backend products if provided and valid
  if (backendProducts && Array.isArray(backendProducts) && backendProducts.length > 0) {
    backendProducts.forEach(bp => {
      const bpId = String(bp._id || bp.id);
      const idx = allProducts.findIndex(p => String(p._id || p.id) === bpId);
      if (idx !== -1) {
        allProducts[idx] = { ...allProducts[idx], ...bp };
      } else {
        allProducts.push(bp);
      }
    });
  }

  // 3. Merge owner's custom additions/updates (takes precedence)
  customProducts.forEach(cp => {
    const cpId = String(cp._id || cp.id);
    const idx = allProducts.findIndex(p => String(p._id || p.id) === cpId);
    if (idx !== -1) {
      allProducts[idx] = { ...allProducts[idx], ...cp };
    } else {
      allProducts.unshift(cp);
    }
  });

  // 4. Filter out any products deleted by the owner
  if (deletedIds.length > 0) {
    allProducts = allProducts.filter(p => {
      const pid = String(p._id || p.id);
      return !deletedIds.includes(pid);
    });
  }

  return allProducts;
};

/**
 * Saves or updates a product locally and dispatches update event
 */
export const saveCustomProduct = (productData) => {
  try {
    const customProducts = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_PRODUCTS) || '[]');
    const prodId = String(productData._id || productData.id || `prod_${Date.now()}`);
    const normalizedProd = { ...productData, _id: prodId, id: prodId };

    const idx = customProducts.findIndex(p => String(p._id || p.id) === prodId);
    if (idx !== -1) {
      customProducts[idx] = normalizedProd;
    } else {
      customProducts.unshift(normalizedProd);
    }

    localStorage.setItem(STORAGE_CUSTOM_PRODUCTS, JSON.stringify(customProducts));

    // Remove from deleted list if re-added
    const deletedIds = JSON.parse(localStorage.getItem(STORAGE_DELETED_PRODUCTS) || '[]');
    const updatedDeleted = deletedIds.filter(id => id !== prodId);
    localStorage.setItem(STORAGE_DELETED_PRODUCTS, JSON.stringify(updatedDeleted));

    // Notify other components/tabs
    window.dispatchEvent(new Event('products_updated'));
    return normalizedProd;
  } catch (err) {
    console.error('Error saving custom product', err);
    return productData;
  }
};

/**
 * Deletes a product locally across all devices/sessions
 */
export const deleteCustomProduct = (productId) => {
  try {
    const prodIdStr = String(productId);

    // 1. Add to deleted list
    const deletedIds = JSON.parse(localStorage.getItem(STORAGE_DELETED_PRODUCTS) || '[]');
    if (!deletedIds.includes(prodIdStr)) {
      deletedIds.push(prodIdStr);
      localStorage.setItem(STORAGE_DELETED_PRODUCTS, JSON.stringify(deletedIds));
    }

    // 2. Remove from custom products
    const customProducts = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_PRODUCTS) || '[]');
    const updatedCustom = customProducts.filter(p => String(p._id || p.id) !== prodIdStr);
    localStorage.setItem(STORAGE_CUSTOM_PRODUCTS, JSON.stringify(updatedCustom));

    // Notify other components/tabs
    window.dispatchEvent(new Event('products_updated'));
    return true;
  } catch (err) {
    console.error('Error deleting product', err);
    return false;
  }
};

/**
 * Finds a single product by ID across all sources
 */
export const getProductById = async (id, requestFn) => {
  const merged = getMergedProducts();
  const match = merged.find(p => String(p._id || p.id) === String(id));
  if (match) return match;

  // Try backend if requestFn available
  if (requestFn) {
    try {
      const data = await requestFn(`/api/products/${id}`);
      if (data && (data._id || data.id)) return data;
    } catch (err) {
      // Fail silently
    }
  }

  return null;
};
