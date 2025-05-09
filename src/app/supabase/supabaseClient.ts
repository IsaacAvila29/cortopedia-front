// src/supabaseClient.ts

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/env";
import { createClient } from "@supabase/supabase-js";

// Reemplaza con la URL y la clave de tu proyecto en Supabase
export const supabaseUrl = SUPABASE_URL || "";
export const supabaseKey = SUPABASE_ANON_KEY || "";

// Crea el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
