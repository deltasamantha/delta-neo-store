import { getStockStatus } from "@/lib/catalog";

const styles = {
  "in-stock": { dot: "bg-success", label: () => "In stock" },
  "low-stock": { dot: "bg-danger", label: (stock: number) => `Only ${stock} left` },
  "sold-out": { dot: "bg-subtle", label: () => "Sold out" },
};

export function StockStatus({ stock }: { stock: number }) {
  const status = getStockStatus(stock);
  const { dot, label } = styles[status];

  return (
    <p className="flex items-center gap-2 type-caption">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {label(stock)}
    </p>
  );
}
