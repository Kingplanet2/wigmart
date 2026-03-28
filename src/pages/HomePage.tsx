import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import NewArrivals from "../components/home/NewArrivals";
import Testimonials from "../components/home/Testimonials";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <Testimonials />
    </Layout>
  );
}