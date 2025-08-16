// hooks/useFeaturedProducts.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/data/products';

export const useFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true); // ✅ filter by featured flag

        if (error) throw error;

        // Map database rows into Product type
        const productsData: Product[] = (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          category: item.category,
          origin: item.origin,
          price: item.price,
          featured: item.featured,
        }));

        setFeaturedProducts(productsData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { featuredProducts, loading, error };
};
