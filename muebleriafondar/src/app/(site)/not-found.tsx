import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl">Esta página no existe</h1>
      <p className="mt-4 text-muted-foreground">
        Puede que la pieza que buscás haya cambiado de lugar. El catálogo
        completo te espera con muebles únicos de madera maciza.
      </p>
      <Button asChild className="mt-8 min-h-12 bg-madera hover:bg-madera/90">
        <Link href="/productos">Ver catálogo de muebles</Link>
      </Button>
    </div>
  );
}
