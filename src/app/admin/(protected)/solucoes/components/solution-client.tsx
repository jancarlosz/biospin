"use client";

import { Solution } from "@prisma/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteSolution } from "../actions";

interface SolutionClientProps {
  solutions: Solution[];
}

export function SolutionClient({ solutions }: SolutionClientProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta solução? Esta ação é irreversível.")) return;
    
    const res = await deleteSolution(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Solução excluída com sucesso.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Soluções</h2>
        <Button render={<Link href="/admin/solucoes/novo" />}>
          <Plus className="mr-2 h-4 w-4" /> Nova Solução
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  Nenhuma solução encontrada.
                </TableCell>
              </TableRow>
            ) : (
              solutions.map((solution) => (
                <TableRow key={solution.id}>
                  <TableCell className="font-medium">{solution.name}</TableCell>
                  <TableCell>{solution.slug}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      solution.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {solution.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/solucoes/${solution.id}`} />}
                    >
                      <Pencil className="h-4 w-4 text-slate-500 hover:text-slate-900" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(solution.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
