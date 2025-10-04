import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client using service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const testUsers: CreateUserRequest[] = [
      {
        email: 'admin@fundacion.org',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin'
      },
      {
        email: 'donante@test.com',
        password: 'donante123',
        name: 'Donante Test',
        role: 'donor'
      },
      {
        email: 'maria@test.com',
        password: 'maria123',
        name: 'María González',
        role: 'donor'
      }
    ];

    const results = [];

    for (const user of testUsers) {
      try {
        // First, check if user already exists
        const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(user.email);
        
        if (existingUser.user) {
          results.push({
            email: user.email,
            status: 'already_exists',
            message: 'Usuario ya existe'
          });
          continue;
        }

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            name: user.name
          }
        });

        if (authError) {
          console.error(`Error creating auth user ${user.email}:`, authError);
          results.push({
            email: user.email,
            status: 'error',
            message: authError.message
          });
          continue;
        }

        if (!authData.user) {
          results.push({
            email: user.email,
            status: 'error',
            message: 'No se pudo crear el usuario'
          });
          continue;
        }

        // Create or update user profile in users table
        const { error: profileError } = await supabaseAdmin
          .from('users')
          .upsert({
            id: authData.user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError);
          results.push({
            email: user.email,
            status: 'partial_success',
            message: 'Usuario creado en Auth pero error en perfil'
          });
        } else {
          results.push({
            email: user.email,
            status: 'success',
            message: 'Usuario creado exitosamente'
          });
        }

      } catch (userError) {
        console.error(`Error processing user ${user.email}:`, userError);
        results.push({
          email: user.email,
          status: 'error',
          message: userError instanceof Error ? userError.message : 'Error desconocido'
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Proceso completado',
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-test-users function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});