
export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'spices' | 'dryfoods' | 'textiles' | 'household';
  origin: string;
  price: number;
  image: string;
  description: string;
  culturalNotes?: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Coffee
  {
    id: '1',
    name: 'Sidama Single Origin Coffee',
    category: 'coffee',
    origin: 'Sidama, Ethiopia',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'Premium single-origin coffee beans from the highlands of Sidama, known for their bright acidity and wine-like characteristics.',
    culturalNotes: 'Sidama coffee is celebrated for its complex flavor profile and is part of Ethiopia\'s ancient coffee heritage.',
    featured: true
  },
  {
    id: '2',
    name: 'Yirgacheffe Coffee Beans',
    category: 'coffee',
    origin: 'Yirgacheffe, Ethiopia',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop',
    description: 'Floral and tea-like coffee with bright citrus notes from the renowned Yirgacheffe region.',
    culturalNotes: 'Yirgacheffe is considered the birthplace of coffee, where the coffee ceremony is a daily ritual.'
  },
  {
    id: '3',
    name: 'Harar Coffee',
    category: 'coffee',
    origin: 'Harar, Ethiopia',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop',
    description: 'Bold and wine-like coffee with a distinctive blueberry undertone, naturally processed in the ancient city of Harar.',
    culturalNotes: 'Harar coffee has been traded for over a thousand years and is known for its unique processing methods.'
  },

  // Spices & Herbs
  {
    id: '4',
    name: 'Berbere Spice Blend',
    category: 'spices',
    origin: 'Ethiopia',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    description: 'Traditional Ethiopian spice blend with chili peppers, garlic, ginger, and sacred basil.',
    culturalNotes: 'Berbere is the soul of Ethiopian cuisine, used in injera and various traditional stews.',
    featured: true
  },
  {
    id: '5',
    name: 'Mitmita Spice',
    category: 'spices',
    origin: 'Ethiopia',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    description: 'Fiery Ethiopian spice blend perfect for seasoning raw beef dishes and adding heat to meals.',
    culturalNotes: 'Mitmita is essential for preparing kitfo, Ethiopia\'s version of steak tartare.'
  },
  {
    id: '6',
    name: 'Ethiopian Black Cardamom',
    category: 'spices',
    origin: 'Ethiopian Highlands',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=400&h=400&fit=crop',
    description: 'Aromatic black cardamom pods with a smoky, complex flavor profile.',
    culturalNotes: 'Used in traditional coffee ceremonies and as a natural breath freshener.'
  },

  // Dry Foods
  {
    id: '7',
    name: 'Teff Grain',
    category: 'dryfoods',
    origin: 'Ethiopian Highlands',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1574763135546-fc2c81169c9c?w=400&h=400&fit=crop',
    description: 'Ancient superfood grain used to make injera, Ethiopia\'s traditional sourdough flatbread.',
    culturalNotes: 'Teff has been cultivated in Ethiopia for over 3,000 years and is naturally gluten-free.',
    featured: true
  },
  {
    id: '8',
    name: 'Split Peas (Kik)',
    category: 'dryfoods',
    origin: 'Ethiopia',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop',
    description: 'High-quality yellow split peas perfect for making traditional Ethiopian kik alicha.',
    culturalNotes: 'A staple protein source in Ethiopian cuisine, often prepared for fasting days.'
  },
  {
    id: '9',
    name: 'Red Lentils (Misir)',
    category: 'dryfoods',
    origin: 'Ethiopian Highlands',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1556909114-4028b9d6fd3c?w=400&h=400&fit=crop',
    description: 'Premium red lentils essential for making misir wot, a spicy Ethiopian lentil stew.',
    culturalNotes: 'Red lentils are a cornerstone of Ethiopian Orthodox fasting cuisine.'
  },

  // Textiles
  {
    id: '10',
    name: 'Traditional White Cotton Shawl',
    category: 'textiles',
    origin: 'Dorze, Ethiopia',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    description: 'Handwoven white cotton shawl with colorful borders, perfect for special occasions.',
    culturalNotes: 'Worn during Ethiopian Orthodox celebrations and coffee ceremonies.',
    featured: true
  },
  {
    id: '11',
    name: 'Habesha Kemis Dress',
    category: 'textiles',
    origin: 'Addis Ababa, Ethiopia',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0c6c783467a?w=400&h=400&fit=crop',
    description: 'Traditional Ethiopian white dress with intricate embroidered borders.',
    culturalNotes: 'The national dress of Ethiopian women, worn during cultural celebrations.'
  },
  {
    id: '12',
    name: 'Ethiopian Cotton Scarf',
    category: 'textiles',
    origin: 'Gonder, Ethiopia',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1601762603339-fd61668529bb?w=400&h=400&fit=crop',
    description: 'Lightweight cotton scarf with traditional Ethiopian patterns and vibrant colors.',
    culturalNotes: 'Versatile accessory reflecting Ethiopia\'s rich textile traditions.'
  },

  // Household Goods
  {
    id: '13',
    name: 'Clay Coffee Pot (Jebena)',
    category: 'household',
    origin: 'Ethiopian Highlands',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop',
    description: 'Traditional handmade clay coffee pot essential for Ethiopian coffee ceremonies.',
    culturalNotes: 'The jebena is central to Ethiopian hospitality and coffee culture.',
    featured: true
  },
  {
    id: '14',
    name: 'Woven Basket (Mesob)',
    category: 'household',
    origin: 'Southern Ethiopia',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    description: 'Traditional woven basket table used for serving injera and Ethiopian meals.',
    culturalNotes: 'The mesob brings families together for communal dining experiences.'
  },
  {
    id: '15',
    name: 'Incense Burner (Mukecha)',
    category: 'household',
    origin: 'Ethiopia',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    description: 'Decorative clay incense burner for traditional Ethiopian incense ceremonies.',
    culturalNotes: 'Used to burn frankincense during coffee ceremonies and religious occasions.'
  }
];

export const categories = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    description: 'Premium Ethiopian coffee beans from renowned regions'
  },
  {
    id: 'spices',
    name: 'Spices & Herbs',
    icon: '🌿',
    description: 'Authentic spice blends and aromatic herbs'
  },
  {
    id: 'dryfoods',
    name: 'Dry Foods',
    icon: '🫘',
    description: 'Traditional grains, legumes, and pantry staples'
  },
  {
    id: 'textiles',
    name: 'Textiles',
    icon: '🧵',
    description: 'Handwoven fabrics and traditional Ethiopian clothing'
  },
  {
    id: 'household',
    name: 'Household Goods',
    icon: '🏺',
    description: 'Traditional pottery, baskets, and home essentials'
  }
];
