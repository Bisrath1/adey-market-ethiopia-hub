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
          .from('featured_products')
          .select('*'); // no need to join unless you want full product info

        if (error) throw error;

        const productsData: Product[] = (data || []).map((item: any) => ({
          id: item.product_id || item.id,
          name: item.title,
          description: item.description,
          image: item.image_url,
          category: item.category || 'general', // default value
          origin: item.origin || 'Ethiopia',   // default value
          price: item.price || 0,              // default value
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
