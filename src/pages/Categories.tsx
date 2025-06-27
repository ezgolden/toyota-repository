
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Categories = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-[#363636] font-poppins">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-poppins">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-[#363636] hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-semibold text-[#363636]">Categorias</h1>
              </div>
              <Button
                onClick={() => navigate('/add-category')}
                className="bg-[#363636] hover:bg-black text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Categoria
              </Button>
            </div>
          </div>

          <div className="p-6">
            {!categories || categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Nenhuma categoria cadastrada ainda.</p>
                <Button
                  onClick={() => navigate('/add-category')}
                  className="bg-[#363636] hover:bg-black text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeira Categoria
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Categoria</TableHead>
                    <TableHead>Data de Criação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium text-[#363636]">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(category.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
