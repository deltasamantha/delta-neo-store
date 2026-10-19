import Image from "next/image";
import Link from "next/link";
import { formatPrice, getStockStatus, type Product } from "@/lib/catalog";

export function ProductCard({ product, sizes }: { product: Product; sizes: string }) {
  const [image] = product.images;
  const soldOut = getStockStatus(product.stock) === "sold-out";
  const tag = soldOut ? "Sold out" : product.badge;

  return (
    <Link href={`/products/${product.slug}`} className="group flex w-full flex-col bg-paper pb-6">
      <div className="media-cover aspect-[4/5] bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {tag && (
          <span className="absolute top-3 left-3 bg-paper px-2 py-1 type-label text-2xs">
            {tag}
          </span>
        )}
      </div>
      <div className="stack-tight px-3 pt-3">
        <h3 className="type-caption group-hover:underline">{product.name}</h3>
        <p className="type-price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
