import { redirect } from 'next/navigation';
import { protetikScenarier } from '@/lib/data/protetik-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(protetikScenarier)[0];
  redirect(`/protetik/${first.slug}`);
}
