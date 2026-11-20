import Brokerage from '@/components/products/Brokerage';
import { IntegratedProducts } from '@/components/products/IntegratedProducts';
import SolutionsCampaigns from '@/components/products/SolutionsCampaigns';
import React from 'react';

const ProductPage = () => {
  return (
   <div className="py-28 bg-linear-to-b from-[#fbf2f4] to-[#ecf7fe] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-opensans">
      <IntegratedProducts></IntegratedProducts>
      <SolutionsCampaigns></SolutionsCampaigns>
      <Brokerage></Brokerage>
    </div>
    </div>
  );
};

export default ProductPage;