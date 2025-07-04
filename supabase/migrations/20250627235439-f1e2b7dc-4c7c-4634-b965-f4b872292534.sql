
-- Criação da tabela de categorias
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,-- Identificador único da categoria, gerado automaticamente
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()-- Data e hora de criação, gerada automaticamente
);
-- Criação da tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY, -- Identificador único do produto, gerado automaticamente
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,-- Relacionamento com a tabela de categorias (chave estrangeira)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() -- Data e hora de criação, gerada automaticamente
);

-- Cria uma política permitindo acesso público total à tabela de categorias
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Cria uma política permitindo acesso público total à tabela de produtos
CREATE POLICY "Allow public access to categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow public access to products" ON public.products FOR ALL USING (true);
