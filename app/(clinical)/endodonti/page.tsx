import { redirect } from 'next/navigation';
import { endodontiScenarier } from '@/lib/data/endodonti-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(endodontiScenarier)[0];
  redirect(`/endodonti/${first.slug}`);
}
