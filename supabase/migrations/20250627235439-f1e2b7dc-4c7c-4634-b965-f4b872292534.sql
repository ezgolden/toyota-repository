
-- Criar tabela de categorias
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Como não há autenticação, vamos deixar as tabelas públicas para leitura e escrita
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acesso público (sem autenticação)
CREATE POLICY "Allow public access to categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow public access to products" ON public.products FOR ALL USING (true);
