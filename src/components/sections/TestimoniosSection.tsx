import { Quote } from "lucide-react";
import { getTestimonios } from "@/lib/cms";
import { Card, CardContent } from "@/components/ui/card";

export async function TestimoniosSection() {
  const testimonios = await getTestimonios();

  return (
    <section
      aria-labelledby="testimonios-titulo"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <h2 id="testimonios-titulo" className="text-center text-3xl sm:text-4xl">
        Lo que dicen nuestros clientes
      </h2>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonios.slice(0, 3).map((t) => (
          <li key={t.id}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <Quote className="size-6 text-madera/50" aria-hidden="true" />
                <blockquote className="flex-1 text-sm leading-relaxed">
                  {t.texto}
                </blockquote>
                <footer className="text-sm">
                  <p className="font-semibold">{t.nombre}</p>
                  <p className="text-muted-foreground">{t.ciudad}</p>
                </footer>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
