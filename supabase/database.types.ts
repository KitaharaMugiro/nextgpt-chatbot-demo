export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cache_hits: {
        Row: {
          created_at: string;
          request_id: string;
        };
        Insert: {
          created_at?: string;
          request_id: string;
        };
        Update: {
          created_at?: string;
          request_id?: string;
        };
      };
      helicone_api_keys: {
        Row: {
          api_key_hash: string;
          api_key_name: string;
          created_at: string;
          id: number;
          soft_delete: boolean;
          user_id: string;
        };
        Insert: {
          api_key_hash: string;
          api_key_name: string;
          created_at?: string;
          id?: number;
          soft_delete?: boolean;
          user_id: string;
        };
        Update: {
          api_key_hash?: string;
          api_key_name?: string;
          created_at?: string;
          id?: number;
          soft_delete?: boolean;
          user_id?: string;
        };
      };
      layout: {
        Row: {
          columns: Json | null;
          created_at: string | null;
          filters: Json | null;
          id: number;
          name: string;
          user_id: string;
        };
        Insert: {
          columns?: Json | null;
          created_at?: string | null;
          filters?: Json | null;
          id?: number;
          name: string;
          user_id: string;
        };
        Update: {
          columns?: Json | null;
          created_at?: string | null;
          filters?: Json | null;
          id?: number;
          name?: string;
          user_id?: string;
        };
      };
      prompt: {
        Row: {
          auth_hash: string;
          created_at: string | null;
          id: string;
          name: string;
          prompt: string;
        };
        Insert: {
          auth_hash: string;
          created_at?: string | null;
          id: string;
          name: string;
          prompt: string;
        };
        Update: {
          auth_hash?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          prompt?: string;
        };
      };
      properties: {
        Row: {
          auth_hash: string | null;
          created_at: string | null;
          id: number;
          key: string | null;
          request_id: string | null;
          user_id: string | null;
          value: string | null;
        };
        Insert: {
          auth_hash?: string | null;
          created_at?: string | null;
          id?: number;
          key?: string | null;
          request_id?: string | null;
          user_id?: string | null;
          value?: string | null;
        };
        Update: {
          auth_hash?: string | null;
          created_at?: string | null;
          id?: number;
          key?: string | null;
          request_id?: string | null;
          user_id?: string | null;
          value?: string | null;
        };
      };
      request: {
        Row: {
          auth_hash: string;
          body: Json;
          created_at: string;
          formatted_prompt_id: string | null;
          helicone_api_key_id: number | null;
          helicone_user: string | null;
          id: string;
          path: string;
          prompt_id: string | null;
          prompt_values: Json | null;
          properties: Json | null;
          user_id: string | null;
        };
        Insert: {
          auth_hash: string;
          body: Json;
          created_at?: string;
          formatted_prompt_id?: string | null;
          helicone_api_key_id?: number | null;
          helicone_user?: string | null;
          id?: string;
          path: string;
          prompt_id?: string | null;
          prompt_values?: Json | null;
          properties?: Json | null;
          user_id?: string | null;
        };
        Update: {
          auth_hash?: string;
          body?: Json;
          created_at?: string;
          formatted_prompt_id?: string | null;
          helicone_api_key_id?: number | null;
          helicone_user?: string | null;
          id?: string;
          path?: string;
          prompt_id?: string | null;
          prompt_values?: Json | null;
          properties?: Json | null;
          user_id?: string | null;
        };
      };
      request_settings: {
        Row: {
          auth_hash: string | null;
          created_at: string | null;
          id: number;
          key: string | null;
          user_id: string | null;
          value: string | null;
        };
        Insert: {
          auth_hash?: string | null;
          created_at?: string | null;
          id?: number;
          key?: string | null;
          user_id?: string | null;
          value?: string | null;
        };
        Update: {
          auth_hash?: string | null;
          created_at?: string | null;
          id?: number;
          key?: string | null;
          user_id?: string | null;
          value?: string | null;
        };
      };
      response: {
        Row: {
          body: Json;
          completion_tokens: number | null;
          created_at: string;
          delay_ms: number | null;
          id: string;
          prompt_tokens: number | null;
          request: string;
          status: number | null;
        };
        Insert: {
          body: Json;
          completion_tokens?: number | null;
          created_at?: string;
          delay_ms?: number | null;
          id?: string;
          prompt_tokens?: number | null;
          request: string;
          status?: number | null;
        };
        Update: {
          body?: Json;
          completion_tokens?: number | null;
          created_at?: string;
          delay_ms?: number | null;
          id?: string;
          prompt_tokens?: number | null;
          request?: string;
          status?: number | null;
        };
      };
      user_api_keys: {
        Row: {
          api_key_hash: string;
          api_key_preview: string;
          created_at: string;
          key_name: string | null;
          user_id: string;
        };
        Insert: {
          api_key_hash: string;
          api_key_preview: string;
          created_at?: string;
          key_name?: string | null;
          user_id: string;
        };
        Update: {
          api_key_hash?: string;
          api_key_preview?: string;
          created_at?: string;
          key_name?: string | null;
          user_id?: string;
        };
      };
      user_settings: {
        Row: {
          created_at: string | null;
          request_limit: number;
          tier: string;
          user: string;
        };
        Insert: {
          created_at?: string | null;
          request_limit?: number;
          tier?: string;
          user: string;
        };
        Update: {
          created_at?: string | null;
          request_limit?: number;
          tier?: string;
          user?: string;
        };
      };
    };
    Views: {
      materialized_response_and_request: {
        Row: {
          is_cached: boolean | null;
          prompt_name: string | null;
          prompt_regex: string | null;
          request_body: Json | null;
          request_created_at: string | null;
          request_formatted_prompt_id: string | null;
          request_id: string | null;
          request_path: string | null;
          request_prompt_values: Json | null;
          request_properties: Json | null;
          request_user_id: string | null;
          response_body: Json | null;
          response_created_at: string | null;
          response_id: string | null;
          user_api_key_hash: string | null;
          user_api_key_preview: string | null;
          user_api_key_user_id: string | null;
        };
      };
      metrics_rbac: {
        Row: {
          average_response_time: number | null;
          average_tokens_per_response: number | null;
        };
      };
      model_metrics: {
        Row: {
          model: string | null;
          request_count: number | null;
          sum_completion_tokens: number | null;
          sum_prompt_tokens: number | null;
          sum_tokens: number | null;
        };
      };
      request_cache_rbac: {
        Row: {
          auth_hash: string | null;
          body: Json | null;
          cached_created_at: string | null;
          created_at: string | null;
          formatted_prompt_id: string | null;
          id: string | null;
          path: string | null;
          prompt_id: string | null;
          prompt_values: Json | null;
          properties: Json | null;
          user_id: string | null;
        };
      };
      request_rbac: {
        Row: {
          auth_hash: string | null;
          body: Json | null;
          created_at: string | null;
          id: string | null;
          path: string | null;
          properties: Json | null;
          user_id: string | null;
        };
      };
      response_and_request_rbac: {
        Row: {
          api_key_preview: string | null;
          formatted_prompt_id: string | null;
          is_cached: boolean | null;
          prompt_name: string | null;
          prompt_regex: string | null;
          prompt_values: Json | null;
          request_body: Json | null;
          request_created_at: string | null;
          request_id: string | null;
          request_path: string | null;
          request_properties: Json | null;
          request_user_id: string | null;
          response_body: Json | null;
          response_created_at: string | null;
          response_id: string | null;
          user_id: string | null;
        };
      };
      response_rbac: {
        Row: {
          body: Json | null;
          created_at: string | null;
          id: string | null;
          request: string | null;
        };
      };
      user_metrics_rbac: {
        Row: {
          average_requests_per_day_active: number | null;
          average_tokens_per_request: number | null;
          first_active: string | null;
          last_active: string | null;
          total_requests: number | null;
          user_id: string | null;
        };
      };
    };
    Functions: {
      check_request_access: {
        Args: {
          this_auth_hash: string;
          this_user_id: string;
        };
        Returns: boolean;
      };
      check_response_access:
        | {
            Args: {
              this_associated_request_id: string;
              this_user_id: string;
            };
            Returns: boolean;
          }
        | {
            Args: {
              this_associated_request_id: string;
            };
            Returns: boolean;
          };
      date_count:
        | {
            Args: {
              time_increment: string;
            };
            Returns: Record<string, unknown>[];
          }
        | {
            Args: {
              time_increment: string;
              prev_period: string;
            };
            Returns: Record<string, unknown>[];
          };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
