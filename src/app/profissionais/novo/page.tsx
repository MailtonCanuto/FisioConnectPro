'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { ArrowLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NovoProfissionalPage() {
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
    registro: '',
    email: '',
    telefone: '',
    endereco: '',
    foto: null as File | null,
    formacao: [{ curso: '', instituicao: '', anoConclusao: '' }],
    experiencia: [{ cargo: '', empresa: '', periodo: '' }],
    certificacoes: [{ nome: '', instituicao: '', ano: '' }]
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, foto: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormacaoChange = (index: number, field: string, value: string) => {
    const newFormacao = [...formData.formacao]
    newFormacao[index] = { ...newFormacao[index], [field]: value }
    setFormData(prev => ({ ...prev, formacao: newFormacao }))
  }

  const handleExperienciaChange = (index: number, field: string, value: string) => {
    const newExperiencia = [...formData.experiencia]
    newExperiencia[index] = { ...newExperiencia[index], [field]: value }
    setFormData(prev => ({ ...prev, experiencia: newExperiencia }))
  }

  const handleCertificacaoChange = (index: number, field: string, value: string) => {
    const newCertificacoes = [...formData.certificacoes]
    newCertificacoes[index] = { ...newCertificacoes[index], [field]: value }
    setFormData(prev => ({ ...prev, certificacoes: newCertificacoes }))
  }

  const addFormacao = () => {
    setFormData(prev => ({
      ...prev,
      formacao: [...prev.formacao, { curso: '', instituicao: '', anoConclusao: '' }]
    }))
  }

  const addExperiencia = () => {
    setFormData(prev => ({
      ...prev,
      experiencia: [...prev.experiencia, { cargo: '', empresa: '', periodo: '' }]
    }))
  }

  const addCertificacao = () => {
    setFormData(prev => ({
      ...prev,
      certificacoes: [...prev.certificacoes, { nome: '', instituicao: '', ano: '' }]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementará a lógica para salvar os dados
    console.log(formData)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/profissionais" className="text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Novo Profissional</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Foto do Profissional */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Foto do Profissional</h2>
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserPlusIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione uma foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700">
                  Especialidade
                </label>
                <input
                  type="text"
                  id="especialidade"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="registro" className="block text-sm font-medium text-gray-700">
                  Registro Profissional
                </label>
                <input
                  type="text"
                  id="registro"
                  name="registro"
                  value={formData.registro}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Formação Acadêmica</h2>
              <button
                type="button"
                onClick={addFormacao}
                className="text-primary-600 hover:text-primary-900 text-sm font-medium"
              >
                + Adicionar Formação
              </button>
            </div>
            {formData.formacao.map((formacao, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Curso
                  </label>
                  <input
                    type="text"
                    value={formacao.curso}
                    onChange={(e) => handleFormacaoChange(index, 'curso', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instituição
                  </label>
                  <input
                    type="text"
                    value={formacao.instituicao}
                    onChange={(e) => handleFormacaoChange(index, 'instituicao', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ano de Conclusão
                  </label>
                  <input
                    type="text"
                    value={formacao.anoConclusao}
                    onChange={(e) => handleFormacaoChange(index, 'anoConclusao', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experiência Profissional */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Experiência Profissional</h2>
              <button
                type="button"
                onClick={addExperiencia}
                className="text-primary-600 hover:text-primary-900 text-sm font-medium"
              >
                + Adicionar Experiência
              </button>
            </div>
            {formData.experiencia.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={exp.cargo}
                    onChange={(e) => handleExperienciaChange(index, 'cargo', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={exp.empresa}
                    onChange={(e) => handleExperienciaChange(index, 'empresa', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Período
                  </label>
                  <input
                    type="text"
                    value={exp.periodo}
                    onChange={(e) => handleExperienciaChange(index, 'periodo', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Certificações */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Certificações</h2>
              <button
                type="button"
                onClick={addCertificacao}
                className="text-primary-600 hover:text-primary-900 text-sm font-medium"
              >
                + Adicionar Certificação
              </button>
            </div>
            {formData.certificacoes.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome da Certificação
                  </label>
                  <input
                    type="text"
                    value={cert.nome}
                    onChange={(e) => handleCertificacaoChange(index, 'nome', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instituição
                  </label>
                  <input
                    type="text"
                    value={cert.instituicao}
                    onChange={(e) => handleCertificacaoChange(index, 'instituicao', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ano
                  </label>
                  <input
                    type="text"
                    value={cert.ano}
                    onChange={(e) => handleCertificacaoChange(index, 'ano', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/profissionais"
              className="btn-secondary"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn-primary"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
} 