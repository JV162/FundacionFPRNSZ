import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'donor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'donor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'donor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          goal_amount: number
          raised_amount: number
          status: 'active' | 'completed' | 'paused'
          image_url?: string
          beneficiaries: number
          created_at: string
          updated_at: string
        }
      }
      donations: {
        Row: {
          id: string
          user_id?: string
          project_id?: string
          amount: number
          payment_method: 'card' | 'transfer' | 'cash'
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          stripe_payment_id?: string
          donor_name: string
          donor_email: string
          message?: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
}