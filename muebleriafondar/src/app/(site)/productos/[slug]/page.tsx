// /productos/[slug] — Detalle de producto con galería, info completa,
// lógica DISPONIBLE/VENDIDO, relacionados y schema Product.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducto, getProductos } from "@/lib/cms";
import { formatPrecio } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductoDetalleAcciones } from "@/components/product/ProductoDetalleAcciones";
import { ProductosRelacionados } from "@/components/product/ProductosRelacionados";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const productos = await getProductos();
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/productos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const producto = await getProducto(slug);
  if (!producto) return { title: "Pieza no encontrada" };

  return {
    title: {
      absolute: `${producto.nombre} | Mueblería Fondar — Madera Maciza Uruguay`,
    },
    description: `${producto.descripcion.slice(0, 120)}... Pieza única en ${producto.tipoDeMadera.toLowerCase()}. ${formatPrecio(producto.precio)}.`,
    alternates: { canonical: `/productos/${producto.slug}` },
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion.slice(0, 160),
      images: [{ url: producto.imagenes[0], width: 1200, height: 900 }],
    },
  };
}

export default async function ProductoPage(
  props: PageProps<"/productos/[slug]">,
) {
  const { slug } = await props.params;
  const producto = await getProducto(slug);
  if (!producto) notFound();

  // Schema Product (SEO.md): offers con disponibilidad según estado.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    image: producto.imagenes,
    brand: { "@type": "Brand", name: "Mueblería Fondar" },
    material: producto.tipoDeMadera,
    offers: {
      "@type": "Offer",
      price: String(producto.precio),
      priceCurrency: "UYU",
      availability:
        producto.estado === "DISPONIBLE"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      seller: { "@type": "Organization", name: "Mueblería Fondar" },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery producto={producto} />

        <div>
          <p className="text-sm font-medium tracking-wide text-musgo uppercase">
            {producto.categoria} · {producto.tipoDeMadera}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{producto.nombre}</h1>
          <p className="mt-4 text-2xl font-semibold text-madera">
            {formatPrecio(producto.precio)}
          </p>

          <p className="mt-5 leading-relaxed text-foreground/90">
            {producto.descripcion}
          </p>

          <Separator className="my-6" />

          <dl className="grid gap-3 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold">Madera:</dt>
              <dd>{producto.tipoDeMadera}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">Dimensiones:</dt>
              <dd>{producto.dimensiones}</dd>
            </div>
            {producto.notas && (
              <div className="flex gap-2">
                <dt className="font-semibold">Detalles:</dt>
                <dd>{producto.notas}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-semibold">Origen:</dt>
              <dd>Hecho a mano en Trinidad, Flores — envíos a todo Uruguay</dd>
            </div>
          </dl>

          <div className="mt-8">
            <ProductoDetalleAcciones producto={producto} />
          </div>
        </div>
      </div>

      <ProductosRelacionados producto={producto} />
    </div>
  );
}
