"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { solutionSchema, type SolutionInput } from "@/lib/validations/solution";
import { createSolution, updateSolution } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { Status } from "@prisma/client";
import {
  Sparkles,
  Layers,
  BarChart3,
  CheckCircle2,
  Users,
  FileText,
  Plus,
  Trash2,
  Info,
  RefreshCw,
} from "lucide-react";

export type SolutionInitialData = SolutionInput & { id: string };

type SolutionFormProps = {
  initialData?: SolutionInitialData | null;
};

type TabType = "geral" | "hero" | "desafio" | "diferenciais" | "beneficios" | "publico" | "conteudo";

export function SolutionForm({ initialData }: SolutionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("geral");

  // Local state for structured lists for high responsiveness and easy editing
  const [highlights, setHighlights] = useState<Array<{ value: string; label: string }>>(
    initialData?.highlights || []
  );
  const [features, setFeatures] = useState<Array<{ title: string; items: string[] }>>(
    initialData?.features || []
  );
  const [benefits, setBenefits] = useState<Array<{ title: string; description: string }>>(
    initialData?.benefits || []
  );
  const [audienceText, setAudienceText] = useState<string>(
    initialData?.audience?.join("\n") || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SolutionInput>({
    resolver: zodResolver(solutionSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          summary: initialData.summary,
          content: initialData.content || "",
          status: initialData.status,
          imageUrl: initialData.imageUrl || null,
          imageKey: initialData.imageKey || null,
          seoTitle: initialData.seoTitle || "",
          seoDescription: initialData.seoDescription || "",
          badge: initialData.badge || "",
          subtitle: initialData.subtitle || "",
          heroCta: initialData.heroCta || "",
          stage: initialData.stage || "",
          targetAudience: initialData.targetAudience || "",
          problemTitle: initialData.problemTitle || "",
          problemDescription: initialData.problemDescription || "",
          audienceDescription: initialData.audienceDescription || "",
          ctaTitle: initialData.ctaTitle || "",
          ctaDescription: initialData.ctaDescription || "",
          highlights: initialData.highlights || [],
          features: initialData.features || [],
          benefits: initialData.benefits || [],
          audience: initialData.audience || [],
        }
      : {
          name: "",
          slug: "",
          summary: "",
          content: "",
          status: Status.DRAFT,
          imageUrl: null,
          imageKey: null,
          seoTitle: "",
          seoDescription: "",
          badge: "",
          subtitle: "",
          heroCta: "Fale com nossos especialistas",
          stage: "",
          targetAudience: "",
          problemTitle: "",
          problemDescription: "",
          audienceDescription: "",
          ctaTitle: "Pronto para inovar com a BioSpin?",
          ctaDescription: "Entre em contato com nossa equipe técnica para discutir parcerias, fornecimento e projetos de validação.",
          highlights: [],
          features: [],
          benefits: [],
          audience: [],
        },
  });

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("name", value, { shouldValidate: true });
    // Atualiza o slug automaticamente conforme o nome da solução
    setValue("slug", generateSlug(value), { shouldValidate: true });
  };

  // Highlights handlers
  const addHighlight = () => {
    setHighlights((prev) => [...prev, { value: "", label: "" }]);
  };
  const updateHighlight = (index: number, field: "value" | "label", val: string) => {
    setHighlights((prev) => {
      const copy = [...prev];
      copy[index][field] = val;
      return copy;
    });
  };
  const removeHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // Features handlers
  const addFeature = () => {
    setFeatures((prev) => [...prev, { title: "", items: [""] }]);
  };
  const updateFeatureTitle = (index: number, title: string) => {
    setFeatures((prev) => {
      const copy = [...prev];
      copy[index].title = title;
      return copy;
    });
  };
  const updateFeatureItems = (index: number, text: string) => {
    const items = text.split("\n").filter((line) => line.trim().length > 0);
    setFeatures((prev) => {
      const copy = [...prev];
      copy[index].items = items.length > 0 ? items : [""];
      return copy;
    });
  };
  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Benefits handlers
  const addBenefit = () => {
    setBenefits((prev) => [...prev, { title: "", description: "" }]);
  };
  const updateBenefit = (index: number, field: "title" | "description", val: string) => {
    setBenefits((prev) => {
      const copy = [...prev];
      copy[index][field] = val;
      return copy;
    });
  };
  const removeBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData: SolutionInput) => {
    setIsLoading(true);

    // Prepare structured lists
    const cleanHighlights = highlights.filter(
      (h) => h.value.trim() !== "" || h.label.trim() !== ""
    );
    const cleanFeatures = features.filter(
      (f) => f.title.trim() !== "" && f.items.length > 0
    );
    const cleanBenefits = benefits.filter(
      (b) => b.title.trim() !== "" || b.description.trim() !== ""
    );
    const cleanAudience = audienceText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload: SolutionInput = {
      ...formData,
      highlights: cleanHighlights.length > 0 ? cleanHighlights : null,
      features: cleanFeatures.length > 0 ? cleanFeatures : null,
      benefits: cleanBenefits.length > 0 ? cleanBenefits : null,
      audience: cleanAudience.length > 0 ? cleanAudience : null,
    };

    try {
      if (initialData) {
        const res = await updateSolution(initialData.id, payload);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Solução atualizada com sucesso!");
          router.push("/admin/solucoes");
        }
      } else {
        const res = await createSolution(payload);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Solução criada com sucesso!");
          router.push("/admin/solucoes");
        }
      }
    } catch {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs: Array<{ id: TabType; label: string; icon: any }> = [
    { id: "geral", label: "Geral & Vitrine", icon: Layers },
    { id: "hero", label: "Hero & Banner", icon: Sparkles },
    { id: "desafio", label: "O Desafio & Números", icon: BarChart3 },
    { id: "diferenciais", label: "Diferenciais Técnicos", icon: CheckCircle2 },
    { id: "beneficios", label: "Benefícios Clínicos/Uso", icon: Info },
    { id: "publico", label: "Público & Indicações", icon: Users },
    { id: "conteudo", label: "Conteúdo Livre & CTA", icon: FileText },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GERAL & VITRINE */}
      {activeTab === "geral" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Solução *</Label>
              <Input
                id="name"
                placeholder="Ex: Nanofiberdressing"
                {...register("name")}
                onChange={handleNameChange}
                disabled={isLoading}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug (URL amigável) *</Label>
                <button
                  type="button"
                  onClick={() => {
                    const nameVal = watch("name");
                    if (nameVal) {
                      setValue("slug", generateSlug(nameVal), { shouldValidate: true });
                      toast.info("Slug atualizado com base no nome!");
                    }
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sincronizar com nome</span>
                </button>
              </div>
              <Input
                id="slug"
                placeholder="ex: nanofiberdressing"
                {...register("slug")}
                disabled={isLoading}
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Resumo Curto (Exibido nos Cards do Hub) *</Label>
            <Textarea
              id="summary"
              placeholder="Curativo bioativo de nanofibras de celulose bacteriana com bioativos da Amazônia..."
              {...register("summary")}
              disabled={isLoading}
              rows={3}
            />
            {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Status de Publicação</Label>
              <Select
                disabled={isLoading}
                value={watch("status")}
                onValueChange={(value) => {
                  if (value) setValue("status", value as Status, { shouldValidate: true });
                }}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Selecione o status">
                    {(val) => {
                      if (val === Status.PUBLISHED || val === "PUBLISHED") return "Publicado";
                      if (val === Status.DRAFT || val === "DRAFT") return "Rascunho";
                      return "Selecione o status";
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Status.DRAFT}>Rascunho</SelectItem>
                  <SelectItem value={Status.PUBLISHED}>Publicado</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Estágio de Maturidade (Vitrine)</Label>
              <Input
                id="stage"
                placeholder="Ex: TRL 5 • Validação Clínica ou P&D"
                {...register("stage")}
                disabled={isLoading}
              />
              <p className="text-xs text-neutral-500">Exibido em destaque no card do Hub de Soluções.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Público do Card (Vitrine)</Label>
              <Input
                id="targetAudience"
                placeholder="Ex: Hospitais, Clínicas de Queimados"
                {...register("targetAudience")}
                disabled={isLoading}
              />
              <p className="text-xs text-neutral-500">Exibido no rodapé do card da vitrine.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imagem Principal (Capa / Ilustração da Solução)</Label>
            <ImageUpload
              value={watch("imageUrl")}
              onChange={(url, key) => {
                setValue("imageUrl", url, { shouldValidate: true });
                setValue("imageKey", key);
              }}
              onRemove={() => {
                setValue("imageUrl", null);
                setValue("imageKey", null);
              }}
            />
            {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
          </div>
        </div>
      )}

      {/* TAB 2: HERO & APRESENTAÇÃO */}
      {activeTab === "hero" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm">
            Configure a primeira impressão da página: o selo superior, subtítulo de impacto e botão principal de ação.
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge">Selo / Badge Superior do Hero</Label>
            <Input
              id="badge"
              placeholder="Ex: TRL 5 • Validação Clínica em Andamento ou Inovação Biotecnológica"
              {...register("badge")}
              disabled={isLoading}
            />
            <p className="text-xs text-neutral-500">Aparece acima do título como uma pílula verde brilhante.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo / Declaração Principal de Impacto</Label>
            <Textarea
              id="subtitle"
              placeholder="Ex: Curativo bioativo de nanofibras de celulose bacteriana funcionalizado com bioativos amazônicos, desenvolvido para promover cicatrização acelerada..."
              {...register("subtitle")}
              disabled={isLoading}
              rows={3}
            />
            <p className="text-xs text-neutral-500">Exibido em fonte destacada e elegante logo abaixo do nome do produto.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroCta">Texto do Botão Hero (Chamada para Ação)</Label>
            <Input
              id="heroCta"
              placeholder="Ex: Solicitar Informações Técnicas"
              {...register("heroCta")}
              disabled={isLoading}
            />
            <p className="text-xs text-neutral-500">Leva o visitante diretamente para a seção de contato ou formulário.</p>
          </div>
        </div>
      )}

      {/* TAB 3: O DESAFIO & NÚMEROS */}
      {activeTab === "desafio" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-neutral-50 border rounded-lg text-neutral-700 text-sm">
            Esta seção apresenta o problema de saúde ou clínico que sua tecnologia resolve, acompanhada de estatísticas impactantes (estilo Nanofiberdressing).
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemTitle">Título da Seção de Contexto / Desafio</Label>
            <Input
              id="problemTitle"
              placeholder="Ex: O Desafio das Feridas Crônicas e Complexas"
              {...register("problemTitle")}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemDescription">Descrição do Problema</Label>
            <Textarea
              id="problemDescription"
              placeholder="Descreva o contexto do mercado, o sofrimento dos pacientes ou o gap terapêutico atual..."
              {...register("problemDescription")}
              disabled={isLoading}
              rows={4}
            />
          </div>

          {/* Highlights / Estatísticas */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">Cards de Estatísticas / Destaques</h4>
                <p className="text-xs text-neutral-500">Exibidos em cards com números em destaque (ex: 28 amputações/dia, 3x mais rápido).</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addHighlight} className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Adicionar Destaque
              </Button>
            </div>

            {highlights.length === 0 ? (
              <div className="text-center py-6 border border-dashed rounded-lg text-sm text-neutral-400">
                Nenhum destaque adicionado ainda. Clique no botão acima para adicionar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="p-3 border rounded-lg bg-neutral-50 space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="absolute top-2 right-2 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <Label className="text-xs">Número / Valor em Destaque</Label>
                      <Input
                        placeholder="Ex: 28 ou 3x ou R$ 1,2 bi"
                        value={item.value}
                        onChange={(e) => updateHighlight(idx, "value", e.target.value)}
                        className="bg-white text-base font-bold text-primary"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Rótulo / Descrição do Número</Label>
                      <Input
                        placeholder="Ex: amputações por dia por complicações"
                        value={item.label}
                        onChange={(e) => updateHighlight(idx, "label", e.target.value)}
                        className="bg-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: DIFERENCIAIS TÉCNICOS */}
      {activeTab === "diferenciais" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-neutral-50 border rounded-lg text-neutral-700 text-sm">
            Adicione blocos com os pilares tecnológicos da solução. Cada bloco tem um título e uma lista de características com ícones de verificação.
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Blocos de Diferenciais Tecnológicos</h4>
              <p className="text-xs text-neutral-500">Ex: Nanocelulose Bacteriana, Bioativos da Amazônia, etc.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Adicionar Bloco de Diferencial
            </Button>
          </div>

          {features.length === 0 ? (
            <div className="text-center py-6 border border-dashed rounded-lg text-sm text-neutral-400">
              Nenhum bloco de diferencial cadastrado. Clique no botão acima para adicionar.
            </div>
          ) : (
            <div className="space-y-4">
              {features.map((feat, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-neutral-50 space-y-3 relative">
                  <div className="flex items-center justify-between pr-8">
                    <Label className="text-sm font-semibold text-neutral-800">
                      Bloco {idx + 1}: Título do Diferencial
                    </Label>
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Input
                    placeholder="Ex: Estrutura em Nanofibras Tridimensionais"
                    value={feat.title}
                    onChange={(e) => updateFeatureTitle(idx, e.target.value)}
                    className="bg-white font-medium"
                  />
                  <div>
                    <Label className="text-xs text-neutral-600">
                      Itens com Checkmark (digite um item por linha)
                    </Label>
                    <Textarea
                      placeholder="Mimetiza a matriz extracelular humana&#10;Permite troca gasosa ideal&#10;Retém a umidade biológica essencial"
                      value={feat.items.join("\n")}
                      onChange={(e) => updateFeatureItems(idx, e.target.value)}
                      className="bg-white text-xs font-mono"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: BENEFÍCIOS */}
      {activeTab === "beneficios" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-emerald-950 text-emerald-100 rounded-lg text-sm">
            Esta seção é renderizada com um fundo escuro elegante (estilo BioSpin escuro), destacando os benefícios clínicos e operacionais diretos da tecnologia.
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Benefícios Clínicos e de Aplicação</h4>
              <p className="text-xs text-neutral-500">Cards com título e descrição curta de cada ganho.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addBenefit} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Adicionar Benefício
            </Button>
          </div>

          {benefits.length === 0 ? (
            <div className="text-center py-6 border border-dashed rounded-lg text-sm text-neutral-400">
              Nenhum benefício cadastrado. Clique no botão acima para adicionar.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-neutral-50 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeBenefit(idx)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div>
                    <Label className="text-xs">Título do Benefício</Label>
                    <Input
                      placeholder="Ex: Barreira Antimicrobiana Ativa"
                      value={b.title}
                      onChange={(e) => updateBenefit(idx, "title", e.target.value)}
                      className="bg-white font-medium text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Descrição do Benefício</Label>
                    <Textarea
                      placeholder="Ex: Protege o leito da lesão contra contaminações externas enquanto estimula o tecido de granulação..."
                      value={b.description}
                      onChange={(e) => updateBenefit(idx, "description", e.target.value)}
                      className="bg-white text-xs"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: PÚBLICO & INDICAÇÕES */}
      {activeTab === "publico" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-neutral-50 border rounded-lg text-neutral-700 text-sm">
            Especifique quem se beneficia desta solução e quais são as indicações clínicas ou casos de uso recomendados.
          </div>

          <div className="space-y-2">
            <Label htmlFor="audienceDescription">Contexto do Público / Aplicações</Label>
            <Textarea
              id="audienceDescription"
              placeholder="Ex: Desenvolvido para equipes médicas especializadas em feridas, centros de queimados e operadoras de saúde que buscam reduzir tempo de internação."
              {...register("audienceDescription")}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audienceList">Lista de Indicações / Casos de Uso (1 por linha)</Label>
            <Textarea
              id="audienceList"
              placeholder="Úlceras de pé diabético&#10;Lesões por pressão (escaras)&#10;Queimaduras de segundo grau&#10;Feridas cirúrgicas deiscências&#10;Centros de referência em dermatologia"
              value={audienceText}
              onChange={(e) => setAudienceText(e.target.value)}
              disabled={isLoading}
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-neutral-500">Cada linha se transformará em um card ou pill elegante na seção pública.</p>
          </div>
        </div>
      )}

      {/* TAB 7: CONTEÚDO LIVRE, CTA & SEO */}
      {activeTab === "conteudo" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-2">
            <Label>Conteúdo Detalhado Complementar (Rich Text / Artigo Técnico)</Label>
            <p className="text-xs text-neutral-500">
              Opcional se você preencheu as seções acima, ou principal caso deseje um texto corrido com imagens e tabelas.
            </p>
            <RichTextEditor
              value={watch("content")}
              onChange={(val) => setValue("content", val, { shouldValidate: true })}
              disabled={isLoading}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

          <div className="p-4 border rounded-lg bg-neutral-50 space-y-4">
            <h4 className="text-sm font-semibold text-neutral-900">Seção Final de Chamada para Ação (CTA)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaTitle">Título do CTA</Label>
                <Input
                  id="ctaTitle"
                  placeholder="Ex: Pronto para acelerar a cicatrização?"
                  {...register("ctaTitle")}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaDescription">Descrição do CTA</Label>
                <Input
                  id="ctaDescription"
                  placeholder="Ex: Entre em contato para saber mais sobre estudos clínicos e parcerias."
                  {...register("ctaDescription")}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-neutral-50 space-y-4">
            <h4 className="text-sm font-semibold text-neutral-900">Otimização para Mecanismos de Busca (SEO)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">Título SEO (meta title)</Label>
                <Input
                  id="seoTitle"
                  placeholder="Ex: Nanofiberdressing | Curativo Bioativo BioSpin"
                  {...register("seoTitle")}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription">Descrição SEO (meta description)</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="Ex: Conheça a tecnologia de nanofibras de celulose bacteriana para regeneração tecidual acelerada."
                  {...register("seoDescription")}
                  disabled={isLoading}
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/solucoes")}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : initialData ? "Atualizar Solução" : "Criar Solução"}
          </Button>
        </div>
      </div>
    </form>
  );
}
