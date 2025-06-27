
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const createProduct = useMutation({
    mutationFn: async (productData: { name: string; price: number; category_id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produto criado com sucesso!",
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !price || !categoryId) {
      toast({
        title: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    createProduct.mutate({
      name: name.trim(),
      price: parseFloat(price),
      category_id: categoryId,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-poppins">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-[#363636] hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-semibold text-[#363636]">Adicionar Produto</h1>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#363636]">Nome do Produto</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome do produto"
                  className="border-gray-300 focus:border-[#363636]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#363636]">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0,00"
                  className="border-gray-300 focus:border-[#363636]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#363636]">Categoria</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="border-gray-300 focus:border-[#363636]">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1 border-gray-300 text-[#363636] hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createProduct.isPending}
                  className="flex-1 bg-[#363636] hover:bg-black text-white"
                >
                  {createProduct.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
