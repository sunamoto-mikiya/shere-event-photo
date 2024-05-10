// Supabaseクライアントライブラリをインポート
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// 環境変数からSupabaseのURLと匿名キーを取得
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントを初期化
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Supabaseクライアントをエクスポート
export default supabase;
