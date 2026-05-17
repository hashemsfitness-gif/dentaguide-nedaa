import { redirect } from 'next/navigation';
import { oralmedicinScenarier } from '@/lib/data/oralmedicin-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(oralmedicinScenarier)[0];
  redirect(`/oralmedicin/${first.slug}`);
}
