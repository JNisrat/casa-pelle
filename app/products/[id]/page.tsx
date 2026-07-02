import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection";
import { SITE_NAME } from "@/lib/constants";
import { getAllProductIds, getProductById } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: `Product not found | ${SITE_NAME}` };
  }

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Header />
      <ProductDetailSection product={product} />
      <Footer />
    </main>
  );
}
