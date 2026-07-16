import { notFound, redirect } from "next/navigation";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { getProductStory, legacyProductRedirects, productStories } from "@/lib/productStories";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    ...productStories.map((product) => ({ slug: product.slug })),
    ...Object.keys(legacyProductRedirects).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const target = legacyProductRedirects[slug];

  if (target) {
    return {};
  }

  const product = getProductStory(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | GoAgent AIPC`,
    description: product.subline,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const target = legacyProductRedirects[slug];

  if (target) {
    redirect(target);
  }

  const product = getProductStory(slug);

  if (!product) {
    notFound();
  }

  return <ProductStoryPage product={product} />;
}
