export type RecipeCategory =
  | 'sniadanie' | 'obiad' | 'kolacja'
  | 'deser' | 'przekaska' | 'napoj' | 'inne'

export interface RecipeIngredient {
  name: string
  amount?: number
  unit?: string
}

export interface RecipeStep {
  step_number: number
  instruction: string
  timer_minutes?: number
}

export interface Recipe {
  id: string
  user_id?: string
  title: string
  category: RecipeCategory | string
  prep_time: number
  cook_time?: number
  servings: number
  is_premium: boolean
  is_favorite: boolean
  is_public: boolean
  description?: string
  image?: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  created_at: string
  updated_at?: string
}

export interface ShoppingListItem {
  id: string
  user_id: string
  name: string
  amount?: number
  unit?: string
  is_checked: boolean
  recipe_id?: string
  created_at: string
}
