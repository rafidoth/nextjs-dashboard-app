import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { dbStart } from '../lib/db-utils';

const supabase = await dbStart()

async function seedUsers() {
  const toBeInsertedUsers = await Promise.all(users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: hashedPassword,
    }
  }));
  console.log(toBeInsertedUsers);

  const { data, error } = await supabase.from('users').insert(toBeInsertedUsers)
  if (error) {
    console.error('error inserting users', error);
    return error;
  }
}

async function seedCustomers() {
  const { error } = await supabase.from('customers').insert(customers)
  if (error) {
    console.error('error inserting users', error);
    return error;
  }
}

async function seedInvoices() {
  const { error } = await supabase.from('invoices').insert(invoices)
  if (error) {
    console.error('error inserting users', error);
    return error;
  }
}

async function seedRevenue() {
  const { error } = await supabase.from('revenue').insert(revenue)
  if (error) {
    console.error('error inserting users', error);
    return error;
  }
}

export async function GET() {
  console.log("Seeding database");
  try {
    await seedRevenue();
    return Response.json('revenue seeding successful', { status: 200 });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ status: 500, error: "An unknown error occurred" });
  }
}
