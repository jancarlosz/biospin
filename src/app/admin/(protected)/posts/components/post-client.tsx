"use client";

import { Post, Category } from "@prisma/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePost } from "../actions";

interface PostClientProps {
  posts: (Post & { category: Category })[];
}

export function PostClient({ posts }: PostClientProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post? Esta ação é irreversível.")) return;
    
    const res = await deletePost(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Post excluído com sucesso.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Posts do Blog</h2>
        <Button render={<Link href="/admin/posts/novo" />}>
          <Plus className="mr-2 h-4 w-4" /> Novo Post
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publicado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Nenhum post encontrado.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{post.title}</TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {post.publishedAt 
                      ? format(new Date(post.publishedAt), "dd 'de' MMM, yyyy", { locale: ptBR })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/posts/${post.id}`} />}
                    >
                        <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
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
