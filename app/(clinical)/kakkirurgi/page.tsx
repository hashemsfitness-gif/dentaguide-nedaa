import { redirect } from 'next/navigation';
import { kakkirurgiScenarier } from '@/lib/data/kakkirurgi-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(kakkirurgiScenarier)[0];
  redirect(`/kakkirurgi/${first.slug}`);
}
