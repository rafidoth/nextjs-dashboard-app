import { format } from 'path';
import { dbStart } from './db-utils';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    const supabase = await dbStart();
    const { data, error } = await supabase.from('revenue').select()
    if (error) {
      throw new Error('Failed to fetch revenue.');
    }
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const supabase = await dbStart();
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        amount,
        customers( id, name, email, image_url ),
        id
        `
      )
      .order('date', { ascending: false })
      .limit(5)
    const latestInvoices = data.map((invoice: any) => {
      return {
        ...invoice,
        amount: formatCurrency(invoice.amount),
      };
    });
    if (error) {
      throw new Error('Failed to fetch invoices.');
    }
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}



export async function countInvoice() {
  try {
    const supabase = await dbStart();
    const { data, error } = await supabase
      .from('invoices')
      .select('*', { count: 'exact' })


    if (error) {
      throw new Error('Failed to fetch invoices.');
    }
    return data.length;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function countCustomers() {
  try {
    const supabase = await dbStart();
    const { data, error } = await supabase
      .from('customers')
      .select('*', { count: 'exact' })


    if (error) {
      throw new Error('Failed to fetch invoices.');
    }
    return data.length;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}


export async function fetchPaidInvoices() {
  try {
    const supabase = await dbStart();
    const { data, error } = await supabase
      .rpc("sum_paid_invoices");
    if (error) {
      throw new Error('Failed to fetch invoices.');
    }
    return formatCurrency(data);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchPendingInvoices() {

  console.log('Fake fetching ...');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return formatCurrency(54432);
}

