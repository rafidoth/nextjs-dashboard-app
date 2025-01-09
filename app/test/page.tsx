import { dbStart } from '@/app/lib/db-utils'

export default async function Countries() {
  const supabase = await dbStart();
  const { data: countries } = await supabase.from("countries").select();
  return <pre>{JSON.stringify(countries, null, 2)}</pre>
}
