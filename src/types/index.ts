export interface PropertyItem {
  id: string;
  title: string;
  titleAr: string;
  category: 'estate' | 'car';
  type: string;
  locationOrSpecs: string;
  locationOrSpecsAr: string;
  price: string;
  imageUrl: string;
  badge: string;
  badgeAr: string;
  specs: {
    bedsOrHp?: string;
    bathsOrSpeed?: string;
    areaOrEngine?: string;
  };
  description: string;
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  imageUrl?: string;
}



export interface NavItem {
  label: string;
  labelAr: string;
  path: string;
  active?: boolean;
}
