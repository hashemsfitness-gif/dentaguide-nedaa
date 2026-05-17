import { redirect } from 'next/navigation';
import { bettfysiologiScenarier } from '@/lib/data/bettfysiologi-scenarios';

/* Omdirigerar till första scenariot — härleds dynamiskt ur datan
 * så att hårdkodade slugs aldrig kan bli inaktuella (404). */
export default function Page() {
  const first = Object.values(bettfysiologiScenarier)[0];
  redirect(`/bettfysiologi/${first.slug}`);
}
