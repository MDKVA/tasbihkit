const cache = new Map();

/**
 * @typedef {Object} TasbihItem
 * @property {string} id - Unique identifier for the Tasbih item.
 * @property {string} [label] - The Tasbih text or label in the original language.
 * @property {string} [translation] - The translation of the Tasbih text.
 * // Add other properties here as they exist in your JSON files (e.g., 'count', 'reference')
 */

export const TasbihKit = {
  /**
   * Load the full Tasbih dataset for a given category.
   * Implements concurrent fetch protection.
   *
   * @param {string} category - Category file name (e.g., 'post-prayer').
   * @returns {Promise<TasbihItem[]>}
   */
  async loadAll(category) {
    if (!category) {
      throw new Error("Category is required.");
    }

    const safeCategory = category.trim().toLowerCase();

    // 1. Check if an active Promise or the final data already exists in the cache
    if (cache.has(safeCategory)) {
      return cache.get(safeCategory);
    }

    // --- Start of Concurrent Fetch Protection Logic ---

    // Create the Promise that performs the async operations
    const fetchAndCachePromise = (async () => {
      try {
        const url = `https://cdn.jsdelivr.net/npm/@mdkva/tasbihkit/data/${safeCategory}.json`;

        const res = await fetch(url);

        if (!res.ok) {
          // Improved Error Handling: include status code
          throw new Error(
            `Category file '${safeCategory}.json' not found (Status: ${res.status}).`
          );
        }

        const data = await res.json();

        // 3. SUCCESS: Replace the active Promise in the cache with the actual data
        cache.set(safeCategory, data);
        return data;

      } catch (error) {
        // 4. FAILURE: Remove the failed Promise from the cache to allow retries
        cache.delete(safeCategory);
        throw error;
      }
    })();

    // 2. Store the Promise in the cache immediately to prevent duplicate fetches
    cache.set(safeCategory, fetchAndCachePromise);

    return fetchAndCachePromise;
    // --- End of Concurrent Fetch Protection Logic ---
  },

  /**
   * Searches for a single Tasbih item by its ID.
   *
   * @param {string} category - The category to search within.
   * @param {(string|number)} id - The ID of the Tasbih item.
   * @returns {Promise<TasbihItem>}
   */
  async searchById(category, id) {
    if (!id) throw new Error("Tasbih ID is required.");

    const list = await this.loadAll(category);
    const tasbihId = String(id).trim();

    /** @type {TasbihItem | undefined} */
    const item = list.find(t => t.id === tasbihId);

    if (!item) {
      throw new Error(
        `Tasbih with ID '${id}' not found in category '${category}'.`
      );
    }

    return item;
  },

  /**
   * Searches for multiple Tasbih items by their IDs.
   *
   * @param {string} category - The category to search within.
   * @param {Array<(string|number)>} ids - An array of IDs to find.
   * @returns {Promise<TasbihItem[]>}
   */
  async searchByIds(category, ids) {
    if (!ids || ids.length === 0) return [];

    const list = await this.loadAll(category);

    // Convert IDs to a Set for O(1) average lookup time
    const idSet = new Set(ids.map(id => String(id).trim()));

    // Filter the list for items whose IDs are in the set
    return list.filter(t => idSet.has(t.id));
  },

  /**
   * Searches for Tasbih items where the label includes the keyword (case-insensitive).
   *
   * @param {string} category - The category to search within.
   * @param {string} keyword - The search term.
   * @returns {Promise<TasbihItem[]>}
   */
  async searchByLabel(category, keyword) {
    if (!keyword) return [];

    const list = await this.loadAll(category);
    const term = keyword.toLowerCase();

    return list.filter(t => t.label?.toLowerCase().includes(term));
  },

  /**
   * Searches for Tasbih items where the translation includes the keyword (case-insensitive).
   *
   * @param {string} category - The category to search within.
   * @param {string} translation - The search term.
   * @returns {Promise<TasbihItem[]>}
   */
  async searchByTranslation(category, translation) {
    if (!translation) return [];

    const list = await this.loadAll(category);
    const term = translation.toLowerCase();

    return list.filter(t => t.translation?.toLowerCase().includes(term));
  },

  /**
   * Clears the in-memory cache of all loaded datasets.
   * @returns {void}
   */
  clearCache() {
    cache.clear();
  }
};

// camelCase alias for standard JavaScript convention
export const tasbihKit = TasbihKit;