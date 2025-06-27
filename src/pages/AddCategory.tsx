
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

const AddCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const createCategory = useMutation({
    mutationFn: async (categoryData: { name: string }) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Categoria criada com sucesso!",
      });
      navigate('/categories');
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar categoria",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Digite o nome da categoria",
        variant: "destructive",
      });
      return;
    }

    createCategory.mutate({
      name: name.trim(),
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
                onClick={() => navigate('/categories')}
                className="text-[#363636] hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-semibold text-[#363636]">Adicionar Categoria</h1>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#363636]">Nome da Categoria</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome da categoria"
                  className="border-gray-300 focus:border-[#363636]"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/categories')}
                  className="flex-1 border-gray-300 text-[#363636] hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createCategory.isPending}
                  className="flex-1 bg-[#363636] hover:bg-black text-white"
                >
                  {createCategory.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
