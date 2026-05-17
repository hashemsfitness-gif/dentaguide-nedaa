import { redirect } from 'next/navigation';
import { parodontoloiScenarier } from '@/lib/data/parodontologi-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(parodontoloiScenarier)[0];
  redirect(`/parodontologi/${first.slug}`);
}
